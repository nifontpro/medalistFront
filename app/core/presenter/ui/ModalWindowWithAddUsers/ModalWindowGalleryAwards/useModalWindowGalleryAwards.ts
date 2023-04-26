import { awardApi } from '@/award/data/award.api';
import { galleryApi } from 'gallery/data/gallery.api';
import { IGalleryObject } from 'gallery/model/gallery.types';
import { useRouter } from 'next/router';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

export const useModalWindowGalleryAwards = (
  create: boolean,
  setVisibleModal: Dispatch<SetStateAction<boolean>>,
  setImg?: Dispatch<SetStateAction<IGalleryObject | undefined>>
) => {
  const { query } = useRouter();
  const awardId = String(query.id);
  const [idFolder, setIdFolder] = useState<string>('');
  const { data: folders } = galleryApi.useGetFoldersQuery('63c307f9fd27cd08c07ad710');

  const { data: awardsGallery } = galleryApi.useGetGalleryObjectsQuery(
    {
      folderId: idFolder,
    },
    { skip: idFolder == '' }
  );

  const [imagesPreview, setImagesPreview] = useState<
    IGalleryObject | undefined
  >(undefined);

  const [setImage] = awardApi.useSetImageFromGalleryMutation();

  const onSubmit = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    if (imagesPreview) {
      if (!create && setImg) {
        setImg(imagesPreview);
        setVisibleModal(false);
      } else {
        let isError = false;
        await setImage({
          awardId: awardId,
          galleryItemId: imagesPreview.id,
        })
          .unwrap()
          .catch(() => {
            isError = true;
            toast.error('Ошибка добавления фото награды');
          });
        if (!isError) {
          toast.success('Фото успешно обновлено');
          setVisibleModal(false);
        }
      }
    }
  };
  return { awardsGallery, imagesPreview, setImagesPreview, onSubmit, folders, setIdFolder };
};