import Image from 'next/image';

import styles from './IconBlock.module.scss';

const IconBlock = ({ icon = '', alt = null, children }) => {
  return (
    <div className={styles.iconBlock}>
      {icon && (
        <div className={styles.icon}>
          <Image
            src={icon}
            width={0}
            height={0}
            sizes="100vw"
            alt={alt ?? 'Иконка'}
          />
        </div>
      )}

      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default IconBlock;
