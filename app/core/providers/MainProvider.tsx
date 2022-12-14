import {FC, PropsWithChildren} from 'react'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux";
import {store} from "@/core/data/store";
import HeadProvider from "./HeadProvider/HeadProvider";
import AuthProvider from "./AuthProvider/AuthProvider";
import Layout from "@/core/presenter/Layout/Layout";
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const MainProvider: FC<PropsWithChildren> = ({children}) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
				<ToastContainer position="bottom-right" newestOnTop/>
				<AuthProvider>
					<Layout>{children}</Layout>
				</AuthProvider>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	)
}

export default MainProvider
