import {queryWithReauth} from "@/core/data/base.api";
import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {getAwardUrl} from "@/core/config/api.config";
import {IAward, IAwardUsers} from "../model/award.types";
import {IAwardCreate, IAwardUpdate, IAwardUserRequest} from "../model/api.types";

export const awardApi = createApi({
	reducerPath: 'awardApi',
	baseQuery: queryWithReauth,
	tagTypes: ['Award'],
	endpoints: (build) => ({

		/**
		 * Создать новое награждение
		 */
		create: build.mutation<IAward, IAwardCreate>({
			query: (request) => ({
				method: 'POST',
				url: getAwardUrl(),
				body: request
			}),
			invalidatesTags: ['Award']
		}),

		/**
		 * Обновить награждение
		 */
		update: build.mutation<void, IAwardUpdate>({
			query: (request) => ({
				method: 'PUT',
				url: getAwardUrl(),
				body: request
			}),
			invalidatesTags: ['Award']
		}),

		/**
		 * Обновить изображение
		 */
		updateImage: build.mutation<void, { awardId: string, formData: FormData }>({
			query: (arg) => ({
				method: 'PUT',
				url: getAwardUrl('/update/image'),
				params: {id: arg.awardId},
				body: arg.formData
			}),
			invalidatesTags: ['Award']
		}),

		/**
		 * Удалить награждение со всеми записями о награждении сотрудников
		 */
		delete: build.mutation<IAward, string>({
			query: (awardId) => ({
				method: 'DELETE',
				url: getAwardUrl(),
				body: {awardId}
			}),
			invalidatesTags: ['Award']
		}),

		/**
		 * Присвоить сотруднику награду
		 *
		 * @param [userId] id сотрудника
		 * @param [awardId] id награды
		 * @param [awardState] тип награждения: NOMINEE/AWARD (Номинация/Утвержденная награда)
		 */
		awardUser: build.mutation<void, IAwardUserRequest>({
			query: (request) => ({
				method: 'POST',
				url: getAwardUrl("/user"),
				body: request
			}),
			invalidatesTags: ['Award']
		}),

		/**
		 * Получить награды в компании с записями о награждениях
		 * @param [filter] фильтрует по фамилии и имени, сортировка по фамилии
		 */
		getAwardsByCompany: build.query<IAward[], { companyId: string, filter?: string }>({
			query: (request) => ({
				method: 'POST',
				url: getAwardUrl("/get_c"),
				body: request
			}),
			providesTags: ['Award']
		}),

		/**
		 * Получить награды в компании с записями о награждениях с сотрудниками
		 * @param [filter] фильтрует по фамилии и имени, сортировка по фамилии
		 * Тяжелый композитный запрос для БД, использовать только при необходимости!!!
		 */
		getAwardsByCompanyWithUser: build.query<IAwardUsers[], { companyId: string, filter?: string }>({
			query: (body) => ({
				method: 'POST',
				url: getAwardUrl("/get_cu"),
				body: body
			}),
			providesTags: ['Award']
		}),

		/**
		 * Получить награду по id с записями о награждениях
		 */
		getAwardById: build.query<IAward, string>({
			query: (awardId) => ({
				method: 'POST',
				url: getAwardUrl("/get_id"),
				body: {awardId}
			}),
			providesTags: ['Award']
		}),

		/**
		 * Получить награду по id с записями о награждениях и сотрудниками
		 */
		getAwardByIdWithUsers: build.query<IAwardUsers, string>({
			query: (awardId) => ({
				method: 'POST',
				url: getAwardUrl("/get_idu"),
				body: {awardId}
			}),
			providesTags: ['Award']
		}),

	})
})