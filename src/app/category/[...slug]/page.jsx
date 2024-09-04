import {
  fetchCategoryBySlug,
  fetchCategories,
  fetchProductsByCategoryId,
} from '@/app/lib/api';
import { splitTextIntoLines } from '@/app/lib/utils';

import MainBanner from '@/app/ui/components/MainBanner/MainBanner';
import ImageBanner from '@/app/ui/components/ImageBanner/ImageBanner';
import CategoryGrid from '@/app/ui/components/CategoryGrid/CategoryGrid';
import Button from '@/app/ui/components/shared/Button/Button';

import styles from './page.module.scss';

export async function generateMetadata({ params: { slug } }) {
  const categorySlug = slug[slug.length - 1];
  const category = await fetchCategoryBySlug(categorySlug);

  return {
    title: category.title,
    description: category.description,
  };
}

export default async function Page({ params: { slug } }) {
  const categorySlug = slug[slug.length - 1];
  const category = await fetchCategoryBySlug(categorySlug);
  let categoryChildren = await fetchCategories(category.id);
  categoryChildren = categoryChildren.length ? categoryChildren : [category];

  const categoryChildrenWithProducts = Array.from(
    await Promise.all(
      categoryChildren.map(async (child) => {
        const products = await fetchProductsByCategoryId(child.id);
        return { ...child, products };
      })
    )
  );

  return (
    <>
      <MainBanner
        image="/img/images/banner-desktop.jpg"
        imageMobile="/img/images/banner-mobile.jpg"
        title={category.title}
        buttonName="Скачать каталог"
        buttonLink="#"
        buttonType="download"
      />

      <ImageBanner
        image="/img/images/food-category.png"
        isLargeImage={false}
        isImageInline={false}
        title={category.title}
      >
        {splitTextIntoLines(category.description)}
      </ImageBanner>

      <div className="container">
        <div className="container__content">
          {categoryChildren.length > 0 && (
            <div className={styles.categories}>
              {categoryChildrenWithProducts.map((child) => (
                <CategoryGrid
                  title={child.slug === categorySlug ? '' : child.title}
                  link={
                    child.slug === categorySlug
                      ? null
                      : `/category/${categorySlug}/${child.slug}`
                  }
                  description={
                    child.slug === categorySlug ? '' : child.description
                  }
                  products={child.products}
                  key={child.id}
                />
              ))}
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
