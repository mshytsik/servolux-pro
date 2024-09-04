import { fetchFilteredProducts } from '@/app/lib/api';

import ProductCard from '@/app/ui/components/ProductCard/ProductCard';
import Subtitle from '../shared/Subtitle/Subtitle';

import styles from './SearchGrid.module.scss';

const SearchGrid = async ({ query, page }) => {
  const products = await fetchFilteredProducts(query, page);

  return products.length > 0 ? (
    <div className={`${styles.grid} row`}>
      {products.map((product) => (
        <div key={product.id} className="col col-3 col-lg-4 col-md-6">
          <ProductCard
            images={product.images}
            link={`/product/${product.slug}`}
            title={product.title}
          />
        </div>
      ))}
    </div>
  ) : (
    <Subtitle name="Продукты не найдены" className={styles.notFound} />
  );
};

export default SearchGrid;
