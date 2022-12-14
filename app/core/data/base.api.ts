import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {API_SERVER_URL} from "../config/api.config";
import {IAuthResponse} from "@/auth/model/auth.types";
import {authActions} from "@/auth/data/auth.slice";
import {getAccessTokenFromCookie, getRefreshCookie} from "@/auth/data/auth.helper";

export const baseQuery = fetchBaseQuery({
	baseUrl: API_SERVER_URL,
})

const accessQuery = fetchBaseQuery({
	baseUrl: API_SERVER_URL,
	prepareHeaders: (headers) => {
		// const token = (getState() as TypeRootState).auth.accessToken
		const token = getAccessTokenFromCookie()
		if (token) {
			headers.set("authorization", `Bearer ${token}`)
		}
		return headers
	}
})

export const refreshQuery = fetchBaseQuery({
	baseUrl: API_SERVER_URL,
	prepareHeaders: (headers) => {
		const token = getRefreshCookie()
		if (token) {
			headers.set("authorization", `Bearer ${token}`)
		}
		return headers
	}
})

export const queryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
	async (args, api, extraOptions) => {
		let result = await accessQuery(args, api, extraOptions)

		if (result.error && result.error.status === 401) {

			const refreshResult = await refreshQuery(
				{method: 'POST', url: '/auth/refresh', body: {filter: ""}}, api, extraOptions
			)
			if (refreshResult?.data) {
				const refreshResponse = refreshResult.data as IAuthResponse
				api.dispatch(authActions.setState(refreshResponse))
				// retry the original query with new access token
				result = await accessQuery(args, api, extraOptions)
			} else {
				api.dispatch(authActions.logout())
			}
		}

		return result
	}