import styles from './ButtonIcon.module.scss';
import cn from 'classnames';
import { ButtonProps } from './ButtonIcon.props';

const ButtonIcon = ({
  appearance,
  children,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(
        styles.button,
        {
          [styles.white]: appearance == 'white',
          [styles.black]: appearance == 'black',
          [styles.gray]: appearance == 'gray',
          [styles.lightGray]: appearance == 'lightGray',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
