'use client';

import { usePathname } from 'next/navigation';
import { scrollToSection } from '@/app/lib/utils';

import Link from 'next/link';

import styles from './NavMenu.module.scss';

const NavMenu = ({ items, onItemClick = null, className = '' }) => {
  const pathname = usePathname();

  const handleClick = (e, target) => {
    e.preventDefault();
    onItemClick?.();
    scrollToSection(target);
  };

  return (
    <ul className={`${styles.navmenu} ${className}`}>
      {items.map((item) => (
        <li
          key={item.link}
          style={{ fontWeight: pathname === item.link ? '800' : null }}
        >
          {item.link.includes('#') && pathname === item.link.split('#')[0] ? (
            <a
              href={item.link}
              onClick={(e) => handleClick(e, item.link.split('#')[1])}
            >
              {item.name}
            </a>
          ) : (
            <Link
              href={item.link}
              scroll={!item.link.includes('#')}
              onClick={() => onItemClick?.()}
            >
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
