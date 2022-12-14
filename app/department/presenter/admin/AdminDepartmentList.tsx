import {FC} from 'react'
import AdminHeader from "@/core/presenter/ui/admin-table/AdminHeader/AdminHeader";
import AdminTable from "@/core/presenter/ui/admin-table/AdminTable/AdminTable";
import {useDepartmentAdmin} from "@/department/presenter/admin/useDepartmentAdmin";
import {ICompany} from "@/company/model/company.types";

const AdminDepartmentList: FC<{ company: ICompany }> = ({company}) => {

	const {medals, isLoading, handleSearch, searchTerm, createAsync, deleteAsync} =
		useDepartmentAdmin(company.id)

	return <div>
		<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync}/>
		<AdminTable
			tableItems={medals || []}
			headerItems={['Название', 'Описание', 'Id']}
			isLoading={isLoading}
			removeHandler={deleteAsync}
		/>
	</div>
}

export default AdminDepartmentList