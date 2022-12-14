import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import UserEdit from "@/user/presenter/admin/edit/UserEdit";

const DepartmentEditPage: NextPage = () => {
	return <AuthComponent minRole={"director"}>
		<UserEdit/>
	</AuthComponent>
}

export default DepartmentEditPage