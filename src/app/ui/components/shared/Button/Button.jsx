import Link from 'next/link';

import styles from './Button.module.scss';

const Button = ({
  name,
  link,
  isLarge = false,
  alternative = false,
  download = false,
  target = null,
  onClick = null,
  className = '',
}) => {
  const classList = `${styles.button} ${isLarge ? styles.isLarge : ''} ${
    alternative ? styles.isAlternative : ''
  } ${className}`;

  return download || target ? (
    <a href={link} className={classList} download={download} target={target}>
      <span className={styles.name}>{name}</span>
    </a>
  ) : (
    <Link href={link} className={classList} onClick={onClick}>
      <span className={styles.name}>{name}</span>
    </Link>
  );
};

export default Button;
