import styles from './InputFileExcelUsers.module.scss';
import cn from 'classnames';
import { InputFileExcelUsersProps } from './InputFileExcelUsers.props';
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  MouseEvent,
  useState,
} from 'react';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';

import { read, readFile, utils } from 'xlsx';
import { useDepartment } from '@/department/presenter/useDepartment';
import { IOption } from '../SelectArtem/SelectArtem.interface';
import SelectCustom from '../SelectCustom/SelectCustom';
import ModalWindowExcelAddUsers from './ModalWindowExcelAddUsers/ModalWindowExcelAddUsers';
import { DataSheets } from './inputExls.types';

const InputFileExcelUsers = forwardRef(
  (
    { className, children, ...props }: InputFileExcelUsersProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);

    const [fileName, setFileName] = useState<string>('');
    const [data, setData] = useState<DataSheets[]>();

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files) {
        if (e.currentTarget.files[0]) {
          setFileName(e.currentTarget.files[0].name);
          const data = await e.currentTarget.files[0].arrayBuffer();
          const workbook = read(data);
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonDate = utils.sheet_to_json<DataSheets>(worksheet, {
            range: 4,
          });

          setData(jsonDate);
        }
      }
    };

    return (
      <AuthComponent minRole={'director'}>
        <div className={cn(styles.inputWrapper, className)}>
          <input
            accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            type='file'
            className={styles.inputFile}
            ref={ref}
            onChange={(e) => handleChange(e)}
            onClick={() => setVisibleModal(true)}
            {...props}
          />
          <label className={styles.fileButton}>
            <span className={styles.buttonText}>{children}</span>
          </label>
        </div>

        <ModalWindowExcelAddUsers
          data={data}
          fileName={fileName}
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          textBtn='Загрузить'
          ref={ref}
        />

        {/* {visibleModal && (
          <div className={styles.modalWindow}>
            <SelectCustom
              placeholder={'Все отделы'}
              className={styles.selectDepartment}
              options={arrDeparts}
              setDepartSort={setDepartSort}
            />
            <ul>
              {data?.map((user) => {
                return (
                  <li key={uniqid()}>
                    {user.Фамилия} {user.Имя} {user.Отчество}{' '}
                  </li>
                );
              })}
            </ul>
          </div>
        )} */}
      </AuthComponent>
    );
  }
);

InputFileExcelUsers.displayName = 'InputFileExcelUsers';

export default InputFileExcelUsers;