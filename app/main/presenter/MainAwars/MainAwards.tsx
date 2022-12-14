import styles from './MainAwars.module.scss';
import { MainAwarsProps } from './MainAwars.props';
import cn from 'classnames';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ArrowIcon from '@/core/presenter/images/arrowRight.svg';
import CupIcon from '@/core/presenter/images/cup.svg';
import PeopleIcon from '@/core/presenter/images/people.svg';
import UnionIcon from '@/core/presenter/images/union.svg';
import P from '@/core/presenter/ui/P/P';
import { useRouter } from 'next/router';

const MainAwars = ({
  awards,
  users,
  className,
  ...props
}: MainAwarsProps): JSX.Element => {
  const { push } = useRouter();
  let countAll = users.length;
  let countWithAward = users.filter((user) => user.awards.length > 0).length;
  let countWithAwardPercent = Math.ceil((countWithAward * 100) / countAll);
  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <Htag tag='h2'>Медали</Htag>
      <div className={styles.content}>
        <div className={cn(styles.allAwards, styles.card)}>
          <div className='flex'>
            <CupIcon className={styles.img} />
            <div className={styles.description}>
              <P size='s'>Наград в компании</P>
              <P size='xl'>{awards.length}</P>
            </div>
          </div>
          <ArrowIcon
            onClick={() => push('/statistic')}
            className={styles.arrow}
          />
        </div>
        <div className={cn(styles.countAwards, styles.card)}>
          <div className='flex'>
            <PeopleIcon className={styles.img} />
            <div className={styles.description}>
              <P size='s'>Есть награды</P>
              <div className='flex items-end'>
                <P size='xl'>{countWithAward}</P>
                <P size='l' color='gray' className={styles.percent}>
                  {countWithAwardPercent} %
                </P>
              </div>
            </div>
          </div>
          <ArrowIcon
            onClick={() => push('/statistic')}
            className={styles.arrow}
          />
        </div>
        <div className={cn(styles.bestDepart, styles.card)}>
          <div className='flex'>
            <UnionIcon className={styles.img} />
            <div className={styles.description}>
              <P size='s' fontstyle='thin'>
                Лучший отдел
              </P>
              <P size='m' className={styles.countAwardsTitle}>
                Бухгалтерия
              </P>
            </div>
          </div>
          <ArrowIcon
            onClick={() => push('/statistic')}
            className={styles.arrow}
          />
        </div>
      </div>
    </div>
  );
};

export default MainAwars;