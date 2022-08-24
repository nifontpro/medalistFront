import {FC} from 'react'
import AuthPage from "@/core/providers/AuthProvider/AuthPage";
import AdminDepartmentList from "@/department/presenter/admin/AdminDepartmentList";
import {useCompanyState} from "@/company/data/company.slice";
import AdminMetaNavigation from "@/medal/presenter/admin/AdminMetaNavigation";

const Index: FC = () => {

	const {currentCompany} = useCompanyState()

	return <AuthPage minRole={"admin"}>
		<AdminMetaNavigation title="Отделы">
			{currentCompany ?
				<AdminDepartmentList company={currentCompany}/>
				:
				<div className="text-2xl">
					Выберите компанию, список отделов которой должен быть отображен
				</div>
			}
		</AdminMetaNavigation>
	</AuthPage>
}

export default Index