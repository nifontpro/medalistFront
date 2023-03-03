import { useCompanyState } from '@/company/data/company.slice';
import { useEffect, useMemo, useState } from 'react';
import { awardApi } from 'award/data/award.api';
import { IAwardUsers } from 'award/model/award.types';

export const useAwardsFull = () => {
  const { currentCompany } = useCompanyState();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [state, setState] = useState<1 | -1>(-1);
  const [arr, setArr] = useState<IAwardUsers[]>([]); // Итоговый массив, который показывается
  console.log(arr);

  const { data: awardsFull, isFetching } =
    awardApi.useGetAwardsByCompanyWithUserBaseQuery(
      {
        companyId: currentCompany != null ? currentCompany.id : '',
        page: currentPage,
        pageSize: 20,
        // filter: 'Test img',
        field: 'startDate',
        direction: -1,
      },
      { skip: !currentCompany }
    );

  let allAwards = arr?.filter((award) => award.state == 'AWARD');
  let allNominee = arr?.filter((award) => award.state == 'NOMINEE');

  const [active, setActive] = useState<
    '' | 'NOMINEE' | 'AWARD' | 'DELETE_USER'
  >('');

  //Пагинация
  useEffect(() => {
    if (awardsFull && awardsFull.length > 0) {
      setArr((prev) => [...prev, ...awardsFull]);
    }
  }, [awardsFull]);
  useEffect(() => {
    if (awardsFull && awardsFull.length > 0) {
      window.addEventListener('scroll', scrollHandler);
    }
    return function () {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [awardsFull]);
  const scrollHandler = () => {
    if (
      document.documentElement.scrollTop + window.innerHeight + 1 >=
        document.documentElement.scrollHeight &&
      !isFetching
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Сотртировка по startDate
  const filteredValue = arr?.filter((item) => item.state?.includes(active));

  if (filteredValue) {
    filteredValue.sort((prev, next): number => {
      if (prev.startDate !== undefined && next.startDate !== undefined) {
        if (prev?.startDate > next?.startDate) return state; //(-1)
      }
      return state;
    });
  }

  // console.log(filteredValue);
  // console.log(state);
  // console.log(currentPage);
  // console.log(isFetching);

  return useMemo(() => {
    return {
      awardsFull,
      isFetching,
      allAwards,
      allNominee,
      active,
      setActive,
      state,
      setState,
      arr,
      filteredValue,
    };
  }, [
    awardsFull,
    isFetching,
    allAwards,
    allNominee,
    active,
    setActive,
    state,
    setState,
    arr,
    filteredValue,
  ]);
};
