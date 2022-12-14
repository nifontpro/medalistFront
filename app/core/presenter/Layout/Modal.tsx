import {FC, PropsWithChildren} from 'react'

const Modal: FC<PropsWithChildren> = ({children}) => {
	return (
		<>
			<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
				<div className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity">
					<div className="fixed inset-0 z-10 overflow-y-auto animate-fade">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<div
								className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								{children}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Modal