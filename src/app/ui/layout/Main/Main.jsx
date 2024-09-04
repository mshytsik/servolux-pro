'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { scrollToSection } from '@/app/lib/utils';

import styles from './Main.module.scss';

const Main = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (location.hash) {
      scrollToSection(location.hash.substring(1));
    }
  }, [pathname]);

  return <main className={styles.main}>{children}</main>;
};

export default Main;
