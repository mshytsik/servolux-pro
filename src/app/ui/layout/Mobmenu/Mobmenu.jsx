import NavMenu from '../../components/shared/NavMenu/NavMenu';
import Image from 'next/image';

import styles from './Mobmenu.module.scss';

const Mobmenu = ({ menuItems, onBurgerClick, isActive }) => {
  return (
    <div
      className={`${styles.container} ${isActive ? styles.isMenuActive : ''}`}
    >
      <div className={styles.head}>
        <div
          className={`${styles.closeIcon} hide-desktop`}
          onClick={onBurgerClick}
        >
          <Image
            src="/img/icons/close.svg"
            width={30}
            height={30}
            alt="Закрыть меню"
          />
        </div>

        <Image
          className={styles.logo}
          src="/img/logo.svg"
          width={120}
          height={28}
          priority
          alt="Серволюкс лого"
        />
      </div>

      <NavMenu
        items={menuItems}
        onItemClick={onBurgerClick}
        className={styles.menu}
      />
    </div>
  );
};

export default Mobmenu;
