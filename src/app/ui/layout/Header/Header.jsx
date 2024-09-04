'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import Image from 'next/image';
import Mobmenu from '../Mobmenu/Mobmenu';
import NavMenu from '../../components/shared/NavMenu/NavMenu';
import Search from '../../components/shared/Search/Search';

import styles from './Header.module.scss';

const Header = () => {
  const menuItems = [
    { name: 'Главная', link: '/' },
    { name: 'О нас', link: '/#about' },
    { name: 'Каталог', link: '/#catalog' },
    { name: 'Дистрибуция', link: '/#distribution' },
    { name: 'Контакты', link: '/#contacts' },
  ];

  const [hasBackground, setHasBackground] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setHasBackground(window.scrollY > (window.innerWidth >= 768 ? 100 : 20));
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [showMobMenu, setShowMobMenu] = useState(false);

  const { push } = useRouter();

  return (
    <header
      className={`${styles.header} ${
        hasBackground ? styles.hasBackground : ''
      }`}
    >
      <div className="container">
        <div className={`${styles.content} container__content`}>
          <Mobmenu
            menuItems={menuItems.slice(1)}
            onBurgerClick={() => setShowMobMenu(false)}
            isActive={showMobMenu}
          />

          <Image
            className={styles.burgerIcon}
            src="/img/icons/burger.svg"
            width={30}
            height={30}
            alt="Меню"
            priority
            onClick={() => setShowMobMenu(true)}
          />

          <Link href="/" className={styles.logo}>
            <Image
              src="/img/logo.svg"
              width={196}
              height={45}
              priority
              alt="Серволюкс лого"
            />
          </Link>

          <NavMenu items={menuItems} className={styles.menu} />

          <Search placeholder="Поиск по сайту..." className={styles.search} />

          <Image
            className={styles.searchIcon}
            src="/img/icons/search-white.svg"
            width={30}
            height={30}
            alt="Поиск"
            priority
            onClick={() => push('/search')}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
