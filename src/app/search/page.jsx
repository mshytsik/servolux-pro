import { fetchProducts } from '../lib/api';

import MainBanner from '@/app/ui/components/MainBanner/MainBanner';
import SearchGrid from '@/app/ui/components/SearchGrid/SearchGrid';
import Pagination from '@/app/ui/components/shared/Pagination/Pagination';

export const metadata = {
  title: 'Поиск',
  description: 'Поиск',
};

export default async function Page({ searchParams }) {
  const searchQuery = searchParams?.query || '';
  const searchPage = Number(searchParams?.page) || 1;

  const pagesAmount = await fetchProducts(searchQuery);

  return (
    <>
      <MainBanner
        image="/img/images/banner-desktop.jpg"
        imageMobile="/img/images/banner-mobile.jpg"
        title={searchQuery ? `Поиск: ${searchQuery}` : 'Поиск'}
        isSearch
      />

      <div className="container">
        <div className="container__content">
          <SearchGrid query={searchQuery} page={searchPage} />

          {pagesAmount > 1 && <Pagination totalAmount={pagesAmount} />}
        </div>
      </div>
    </>
  );
}
