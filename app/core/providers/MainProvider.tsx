import {FC, PropsWithChildren} from 'react'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux";
import {store} from "@/core/data/store";
import {TypeComponentAuthFields} from "@/auth/model/auth.roles";
import HeadProvider from "./HeadProvider/HeadProvider";
import AuthProvider from "./AuthProvider/AuthProvider";
import Layout from "@/core/presenter/Layout/Layout";

const MainProvider: FC<PropsWithChildren<TypeComponentAuthFields>> =
	({children, Component}) => {
		return (
			<HeadProvider>
				<Provider store={store}>
					<ToastContainer position="bottom-right" newestOnTop/>
					<AuthProvider Component={Component}>
						<Layout>{children}</Layout>
					</AuthProvider>
				</Provider>
			</HeadProvider>
		)
	}

export default MainProvider
