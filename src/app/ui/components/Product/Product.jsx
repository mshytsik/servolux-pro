import Image from 'next/image';
import Subtitle from '../shared/Subtitle/Subtitle';
import ProductCard from '../ProductCard/ProductCard';
import Button from '../shared/Button/Button';

import styles from './Product.module.scss';
import './Product.scss';

const Product = ({ product }) => {
  return (
    <div className={`${styles.container} product row`}>
      <div className={`${styles.sliderColumn} col col-4 col-lg-5 col-md-12`}>
        <ProductCard images={product.images} className={styles.slider} />
      </div>

      <div className={`${styles.infoColumn} col col-8 col-lg-7 col-md-12`}>
        <div className={styles.head}>
          <Subtitle name={product.title} headingSize={1} />

          {product.isFrozen && (
            <div className={styles.label}>
              <Image
                src="/img/icons/snowflake.png"
                width={72}
                height={73}
                alt="Замороженный продукт"
              />
              <span>Замороженный продукт</span>
            </div>
          )}
        </div>

        {product.description && (
          <p className={styles.description}>{product.description}</p>
        )}

        {product.weight && (
          <p className={styles.weight}>
            <span>Вес в ед:</span> {product.weight}
          </p>
        )}

        {product.meta?.length > 0 && (
          <div className={styles.meta}>
            <p className={styles.metaLabel}>
              Пищевая и энергетическая ценность, на 100 г
            </p>

            <ul className={styles.metaList}>
              {product.meta.map((item) => (
                <li key={item.label}>
                  <p className={styles.metaValue}>{item.value}</p>
                  <p className={styles.metaName}>{item.label}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={`${styles.documentsRow} row`}>
          <div className="col col-6 col-md-12">
            {product.documents?.length > 0 && (
              <div className={styles.documents}>
                {product.documents.map((document, index) => (
                  <Button
                    name={document.label}
                    link={document.link}
                    alternative={index % 2}
                    download
                    className={styles.document}
                    key={document.label}
                  />
                ))}
              </div>
            )}
          </div>

          {product.dishImage && (
            <div className={`${styles.dish} col col-6 col-md-12`}>
              <Image
                src={product.dishImage}
                width={0}
                height={0}
                sizes="100vw"
                alt="Продукт"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
