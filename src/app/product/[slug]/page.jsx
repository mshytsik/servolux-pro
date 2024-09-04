import { fetchProductBySlug } from '@/app/lib/api';
import { getProductBreadcrumbs, splitTextIntoLines } from '@/app/lib/utils';

import MainBanner from '@/app/ui/components/MainBanner/MainBanner';
import Breadcrumbs from '@/app/ui/components/shared/Breadcrumbs/Breadcrumbs';
import Product from '@/app/ui/components/Product/Product';
import Accordion from '@/app/ui/components/shared/Accordion/Accordion';
import IconBlock from '@/app/ui/components/shared/IconBlock/IconBlock';
import Button from '@/app/ui/components/shared/Button/Button';

import styles from './page.module.scss';

export async function generateMetadata({ params: { slug } }) {
  const product = await fetchProductBySlug(slug);

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function Page({ params: { slug } }) {
  const product = await fetchProductBySlug(slug);
  const breadcrumbs = await getProductBreadcrumbs(product);

  return (
    <>
      <MainBanner
        image="/img/images/banner-desktop.jpg"
        imageMobile="/img/images/banner-mobile.jpg"
        title="Готовые решения для вашего бизнеса"
        buttonName="Скачать каталог"
        buttonLink="#"
        buttonType="download"
      />

      <div className="container">
        <div className="container__content">
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <Product product={product} className={styles.productCard} />

          {product.details?.length > 0 && (
            <div className="row">
              <div className="col col-8 col-md-12">
                <div className={styles.accordions}>
                  {product.details.map((block) => (
                    <Accordion
                      label={block.label}
                      className={styles.accordion}
                      key={block.label}
                    >
                      {block.data.icons?.length > 0 && (
                        <div className="row">
                          {block.data.icons.map((item) => (
                            <div
                              className={`col col-${
                                block.data.icons.length == 1
                                  ? '12'
                                  : block.data.icons.length == 2
                                  ? '6 col-sm-12'
                                  : '4 col-lg-6 col-sm-12'
                              }`}
                              key={item.icon}
                            >
                              <IconBlock icon={item.icon}>
                                {item.title && <strong>{item.title}: </strong>}
                                {splitTextIntoLines(item.text)}
                              </IconBlock>
                            </div>
                          ))}
                        </div>
                      )}

                      {block.data.text}
                    </Accordion>
                  ))}
                </div>
              </div>
            </div>
          )}

          <Button
            name="Скачать каталог"
            link="#"
            isLarge
            download
            className={`${styles.download} hide-desktop`}
          />
        </div>
      </div>
    </>
  );
}
