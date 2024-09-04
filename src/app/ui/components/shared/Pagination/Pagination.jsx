'use client';

import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';

import styles from './Pagination.module.scss';

const PaginationContent = ({ totalAmount }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalAmount);

  return (
    <div className={styles.pagination}>
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className={styles.numbers}>
        {allPages.map((page, index) => (
          <PaginationNumber
            href={createPageURL(page)}
            page={page}
            isMiddle={page === '...'}
            isActive={currentPage === page}
            key={index}
          />
        ))}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalAmount}
      />
    </div>
  );
};

const PaginationNumber = ({ page, href, isActive, isMiddle }) => {
  return isActive || isMiddle ? (
    <div
      className={`${styles.number} ${
        isActive ? styles.isActive : styles.isMiddle
      }`}
    >
      {page}
    </div>
  ) : (
    <Link href={href} className={styles.number}>
      {page}
    </Link>
  );
};

const PaginationArrow = ({ href, direction, isDisabled }) => {
  const className = `${styles.arrow} ${
    direction === 'left' ? styles.arrowPrev : styles.arrowNext
  }`;

  const icon = (
    <Image
      src="/img/icons/arrow-left.svg"
      width={19}
      height={31}
      alt={direction === 'left' ? 'Назад' : 'Вперед'}
    />
  );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link href={href} className={className}>
      {icon}
    </Link>
  );
};

const Pagination = (props) => {
  return (
    <Suspense>
      <PaginationContent {...props} />
    </Suspense>
  );
};

export default Pagination;
