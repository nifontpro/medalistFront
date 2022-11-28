import { SubmitHandler, UseFormReset, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { IUserCreateInput } from '@/user/presenter/admin/create/user-create.type';
import { userApi } from '@/user/data/user.api';
import { toastError } from '@/core/utils/toast-error';
import { getAdminUrl } from '@/core/config/url.config';
import { IUser } from '@/user/model/user.types';

export const useUserCreate = (
  setValue: UseFormSetValue<IUserCreateInput>,
  active: 'MALE' | 'FEMALE' | 'UNDEFINED' | undefined,
  companyId?: string
  // departmentId?: string,
) => {
  const { push, back } = useRouter();
  const [create] = userApi.useCreateMutation();
  const [updateImage] = userApi.useUpdateImageMutation();

  useEffect(() => {
    if (active != undefined) {
      setValue('role', 'user');
      setValue('companyId', companyId);
      // setValue('isMNC', false)
      setValue('gender', active);
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<IUserCreateInput> = async (data) => {
    let isError = false;

    if (companyId) {
      await create({ ...data })
        .unwrap()
        .then(async (user: IUser) => {
          const fileData = data.file[0];
          if (fileData) {
            const formData = new FormData();
            formData.append('imageUrl', fileData);
            await updateImage({ userId: user.id, formData })
              .unwrap()
              .catch(() => {
                isError = true;
                toast.error('Ошибка добавления фото сотрудника');
              });
          }
        })
        .catch((e) => {
          isError = true;
          toastError(e, 'Ошибка создания профиля сотрудника');
        });
    } else {
      isError = true;
      toast.error('Необходимо выбрать компанию');
    }
    if (!isError) {
      toast.success('Профиль сотрудника успешно создан');
      // push('/company/' + companyId).then();
      back()
    }
  };

  return { onSubmit };
};
