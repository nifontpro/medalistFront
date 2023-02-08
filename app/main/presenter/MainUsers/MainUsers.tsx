import styles from './MainUsers.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { MainUsersProps } from './MainUsers.props';
import cn from 'classnames';
import UserListRating from 'rating/presenter/UserListRating/UserListRating';
import Htag from '@/core/presenter/ui/Htag/Htag';
import P from '@/core/presenter/ui/P/P';
import ArrowIcon from '@/core/presenter/images/arrowRight.svg';
import { useRouter } from 'next/router';

const MainUsers = ({
  users,
  className,
  ...props
}: MainUsersProps): JSX.Element => {
  const { push } = useRouter()

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={styles.header}>
        <Htag tag='h2'>Лучшие сотрудники</Htag>
        <div className={styles.bestUsers} onClick={() => push('/statistic')}>
          <P size='s' fontstyle='thin' className={styles.text}>
            Рейтинг
          </P>
          <ArrowIcon className={styles.arrow}/>
        </div>
      </div>
      <UserListRating withoutCountAwards={false} users={users} className={styles.userList}/>
    </div>
  );
};

export default MainUsers;
