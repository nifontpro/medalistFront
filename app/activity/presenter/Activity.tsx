import styles from './Activity.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { ActivityProps } from './Activity.props';
import { useState } from 'react';
import Htag from '@/core/presenter/ui/Htag/Htag';
import SortButton from '@/core/presenter/ui/SortButton/EditPanel/SortButton';
import TabTitle from '@/core/presenter/ui/TabTitle/TabTitle';
import { useActivity } from './useActivity';
import SingleActivity from './SingleActivity/SingleActivity';
import Search from '@/core/presenter/ui/Search/Search';
import RangeCalendar from '@/core/presenter/ui/RangeCalendar/RangeCalendar';

const Activity = ({
  company,
  className,
  ...props
}: ActivityProps): JSX.Element => {

  const [active, setActive] = useState<
    '' | 'AWARD' | 'NOMINEE' | 'DELETE_USER'
  >('');

  const [state, setState] = useState<1 | -1>(1);
  const [startDate, setStartDate] = useState<number>(10000000);
  const [endDate, setEndDate] = useState<number>(16732673054000);
  const [searchValue, setSearchValue] = useState<string>('');

  const { activity } = useActivity(searchValue, state, startDate, endDate);

  const allActivityLength = activity.length;
  const awardsLength = activity?.filter((item) =>
    item.state?.includes('AWARD')
  ).length;
  const nomineeLength = activity?.filter((item) =>
    item.state?.includes('NOMINEE')
  ).length;
  const otherLength = activity?.filter((item) =>
    item.state?.includes('DELETE_USER')
  ).length;

  //Фитруем по категории
  let filteredValue = activity?.filter((item) => item.state?.includes(active));

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <Meta title='Активность'>
      <div {...props} className={styles.wrapper}>
        <Htag tag='h2' className={styles.headTitle}>
          Активность
        </Htag>

        <div className={styles.header}>
          <TabTitle
            active={active}
            setActive={setActive}
            count={allActivityLength}
            onClickActive={''}
            className={styles.all}
          >
            Все
          </TabTitle>
          <TabTitle
            active={active}
            setActive={setActive}
            count={awardsLength}
            onClickActive={'AWARD'}
            className={styles.award}
          >
            Медали
          </TabTitle>
          <TabTitle
            active={active}
            setActive={setActive}
            count={nomineeLength}
            onClickActive={'NOMINEE'}
            className={styles.nominee}
          >
            Номинации
          </TabTitle>
          <TabTitle
            active={active}
            setActive={setActive}
            count={otherLength}
            onClickActive={'DELETE_USER'}
            className={styles.other}
          >
            Прочее
          </TabTitle>

          <SortButton
            state={state}
            onClick={() => (state == 1 ? setState(-1) : setState(1))}
            className={styles.sort}
          >
            Сначала новые
          </SortButton>

            <RangeCalendar setStartDate={setStartDate} setEndDate={setEndDate}/>
        </div>

        <div className={styles.cards}>
          <Search
            onChange={handleChange}
            placeholder='Фамилия, Имя, Отдел...'
            color='white'
            button={false}
            search={true}
            className={styles.search}
          />
          {filteredValue?.map((item) => {
            return (
              <SingleActivity
                activity={item}
                key={item.id}
                className={styles.activity}
              />
            );
          })}
        </div>
      </div>
    </Meta>
  );
};

export default Activity;