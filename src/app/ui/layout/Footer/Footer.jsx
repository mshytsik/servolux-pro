import { useMemo } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import NavMenu from '../../components/shared/NavMenu/NavMenu';

import styles from './Footer.module.scss';

const Footer = () => {
  const menuItems = [
    { name: 'Главная', link: '/' },
    { name: 'О нас', link: '/#about' },
    { name: 'Каталог', link: '/#catalog' },
    { name: 'Дистрибуция', link: '/#distribution' },
    { name: 'Контакты', link: '/#contacts' },
  ];

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={`${styles.content} container__content`}>
          <div className={styles.info}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/img/logo.svg"
                width={196}
                height={45}
                alt="Серволюкс лого"
              />
            </Link>

            <p className={styles.copyright}>© {year} Servolux Professional</p>
          </div>

          <NavMenu items={menuItems} className={styles.menu} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
