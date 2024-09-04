import Link from 'next/link';

import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = ({ breadcrumbs, className = '' }) => {
  const breadcrumbsItems = [{ label: 'Главная', link: '/' }, ...breadcrumbs];

  return (
    <ol className={`${styles.breadcrumbs} ${className}`}>
      {breadcrumbsItems.map((breadcrumb, index) => (
        <li key={breadcrumb.label}>
          {index < breadcrumbsItems.length - 1 ? (
            <>
              <Link href={breadcrumb.link}>{breadcrumb.label}</Link>
              <span className={styles.separator}>/</span>
            </>
          ) : (
            <p>{breadcrumb.label}</p>
          )}
        </li>
      ))}
    </ol>
  );
};

export default Breadcrumbs;
