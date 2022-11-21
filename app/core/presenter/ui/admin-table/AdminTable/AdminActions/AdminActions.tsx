import { useRouter } from 'next/router'
import { FC } from 'react'

import styles from './AdminActions.module.scss'
import MaterialIcon from "@/core/presenter/ui/icons/MaterialIcon";

interface IAdminActions {
	editUrl: string
	removeHandler: () => void
}

const AdminActions: FC<IAdminActions> = ({ editUrl, removeHandler }) => {
	const { push } = useRouter()
	// console.log(editUrl)

	return (
		<div className={styles.actions}>
			<button onClick={() => push(editUrl)}>
				<MaterialIcon name="MdEdit" />
			</button>
			<button onClick={removeHandler}>
				<MaterialIcon name="MdClose" />
			</button>
		</div>
	)
}

export default AdminActions
