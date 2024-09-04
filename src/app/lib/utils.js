import { Fragment } from "react";
import { fetchCategoryById } from "./api";

export const scrollToSection = (id) => {
  const element = document.getElementById(id);

  if (element) {
    const headerHeight = document.querySelector('header').offsetHeight;
    const scrollTop = element.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top: scrollTop, behavior: 'smooth' });
  }
};

export const splitTextIntoLines = (text) => {
  return text.split('\n').map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
};

export const sanitizePhone = (phone) => {
  return phone.replace('/[^0-9+]+/', '');
};

export const getCategoryLink = async (category) => {
  let slugs = [];

  let currentCategory = category;
  while (true) {
    slugs.push(currentCategory.slug);

    if (currentCategory.parent) {
      currentCategory = await fetchCategoryById(currentCategory.parent);
    } else {
      break;
    }
  }

  return `/category/${slugs.reverse().join('/')}`;
};

export const getProductBreadcrumbs = async (product) => {
  const category = await fetchCategoryById(product.categories[0]);

  let breadcrumbs = [];

  let crumbCategory = category;
  while (true) {
    breadcrumbs.push({
      label: crumbCategory.title,
      link: await getCategoryLink(crumbCategory),
    });

    if (crumbCategory.parent) {
      crumbCategory = await fetchCategoryById(crumbCategory.parent);
    } else {
      break;
    }
  }

  breadcrumbs.reverse().push({ label: product.title });
  return breadcrumbs;
};

export const generatePagination = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (item, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};