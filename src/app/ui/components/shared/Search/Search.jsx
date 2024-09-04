import { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import Image from 'next/image';
import { Suspense } from 'react';

import styles from './Search.module.scss';

const SearchContent = ({ placeholder, className = '' }) => {
  const searchParams = useSearchParams();
  const defaultSearchQuery = searchParams.get('query')?.toString() || '';

  const pathname = usePathname();
  const { push, replace } = useRouter();

  const [searchQuery, setSearchQuery] = useState();

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('query', searchQuery);
    }

    const searchUrl = `/search?${params.toString()}`;
    pathname === '/search' ? replace(searchUrl) : push(searchUrl);
  };

  return (
    <form className={`${styles.search} ${className}`} onSubmit={handleSearch}>
      <Image
        className={styles.icon}
        src="/img/icons/search.svg"
        width={19}
        height={20}
        alt="Поиск"
      />

      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        defaultValue={pathname === '/search' ? defaultSearchQuery : ''}
        className={styles.input}
        placeholder={placeholder}
      />
    </form>
  );
};

const Search = (props) => {
  return (
    <Suspense>
      <SearchContent {...props} />
    </Suspense>
  );
};

export default Search;
