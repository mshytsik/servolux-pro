import Link from 'next/link';
import Subtitle from '@/app/ui/components/shared/Subtitle/Subtitle';
import ProductCard from '@/app/ui/components/ProductCard/ProductCard';

import styles from './CategoryGrid.module.scss';

const CategoryGrid = ({ title, link = null, description, products }) => {
  return (
    <div className={styles.container}>
      {(title || description) && (
        <div className="row">
          <div className="col col-8 col-sm-12">
            {title && link ? (
              <Link className={styles.link} href={link}>
                <Subtitle className={styles.linkLabel} name={title} />
              </Link>
            ) : (
              <Subtitle name={title} />
            )}

            {description && <p className={styles.description}>{description}</p>}
          </div>
        </div>
      )}

      {products.length > 0 && (
        <div className={`${styles.grid} row`}>
          {products.map((item) => (
            <div key={item.id} className="col col-3 col-lg-4 col-md-6">
              <ProductCard
                images={item.images}
                link={`/product/${item.slug}`}
                title={item.title}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;
