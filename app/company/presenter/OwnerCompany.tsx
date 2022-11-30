import { FC } from 'react';
import Catalog from '@/core/presenter/ui/catalog/Catalog';
import Meta from '@/core/utils/meta/Meta';
// import Heading from "@/core/presenter/ui/heading/Heading";
import { companyApi } from '@/company/data/company.api';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ButtonIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/router';

const OwnerCompany: FC = () => {
  const { push } = useRouter();
  
  const { data: companies, isLoading } = companyApi.useGetByOwnerQuery();

  return (
    <Meta title='Компании владельца'>
      <div className='flex justify-between'>
        <Htag tag='h1'>Ваши компании</Htag>
        <ButtonIcon
          onClick={() => push('/manage/company/create')}
          appearance='black'
          icon='plus'
        >
          Создать компанию
        </ButtonIcon>
      </div>

      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <Catalog
          data={companies || []}
          prefix='/company'
          title='Ваши компании'
          description='В этом списке компании, к котрым вы имеете доступ'
        />
      )}
    </Meta>
  );
};

export default OwnerCompany;
