import { sql } from "@vercel/postgres";

const PRODUCTS_PER_PAGE = 8;

export async function fetchCategories(parentId = null) {
  try {
    const data = await (parentId ?
      sql`SELECT * FROM servo_categories WHERE servo_categories.parent = ${parentId}` :
      sql`SELECT * FROM servo_categories WHERE servo_categories.parent IS NULL`
    );

    return data.rows;
  } catch (error) {
    console.error("Fetching categories error:", error);
    throw new Error("Failed to fetch categories.");
  }
}

export async function fetchCategoryBySlug(slug) {
  try {
    const data = await sql`SELECT * FROM servo_categories WHERE servo_categories.slug = ${slug} LIMIT 1`;
    return data.rows[0];
  } catch (error) {
    console.error("Fetching category error:", error);
    throw new Error("Failed to fetch category.");
  }
}

export async function fetchCategoryById(id) {
  try {
    const data = await sql`SELECT * FROM servo_categories WHERE servo_categories.id = ${id} LIMIT 1`;
    return data.rows[0];
  } catch (error) {
    console.error("Fetching category error:", error);
    throw new Error("Failed to fetch category.");
  }
}

const prepareProduct = (data) => ({
  ...data,
  isFrozen: data.is_frozen,
  dishImage: data.dish_image,
  is_frozen: null,
  dish_image: null,
});

export async function fetchProductsByCategoryId(categoryId) {
  try {
    const data = await sql`
      SELECT *
      FROM servo_products
      WHERE ${categoryId} IN ( SELECT json_array_elements_text( servo_products.categories ) )
    `;

    return data.rows.map(row => prepareProduct(row));
  } catch (error) {
    console.error("Fetching products error:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function fetchFilteredProducts(query, currentPage = 1) {
  const offset = (currentPage - 1) * PRODUCTS_PER_PAGE;

  try {
    const data = await sql`
      SELECT
        servo_products.*
      FROM servo_products
      LEFT JOIN servo_categories ON servo_categories.id::text IN (
        SELECT json_array_elements_text( servo_products.categories )
      )
      WHERE
        servo_products.title ILIKE ${`%${query}%`} OR
        servo_products.description ILIKE ${`%${query}%`} OR
        servo_categories.title ILIKE ${`%${query}%`} OR
        servo_categories.description ILIKE ${`%${query}%`}
      GROUP BY servo_products.id
      LIMIT ${PRODUCTS_PER_PAGE} OFFSET ${offset}
    `;

    return data.rows.map(row => prepareProduct(row));
  } catch (error) {
    console.error("Fetching products error:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function fetchProducts(query) {
  try {
    const data = await sql`
      SELECT COUNT (DISTINCT servo_products.id)
      FROM servo_products
      LEFT JOIN servo_categories ON servo_categories.id::text IN (
        SELECT json_array_elements_text( servo_products.categories )
      )
      WHERE
        servo_products.title ILIKE ${`%${query}%`} OR
        servo_products.description ILIKE ${`%${query}%`} OR
        servo_categories.title ILIKE ${`%${query}%`} OR
        servo_categories.description ILIKE ${`%${query}%`}
    `;

    return Math.ceil(Number(data.rows[0].count) / PRODUCTS_PER_PAGE);
  } catch (error) {
    console.error("Fetching products error:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function fetchProductBySlug(slug) {
  try {
    const data = await sql`SELECT * FROM servo_products WHERE servo_products.slug = ${slug} LIMIT 1`;
    return data.rows.map(row => prepareProduct(row))[0];
  } catch (error) {
    console.error("Fetching products error:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function fetchTeam() {
  try {
    const data = await sql`SELECT * FROM servo_team`;
    return data.rows;
  } catch (error) {
    console.error("Fetching team error:", error);
    throw new Error("Failed to fetch team.");
  }
}

export async function fetchShops() {
  try {
    const data = await sql`SELECT * FROM servo_shops`;
    return data.rows;
  } catch (error) {
    console.error("Fetching shops error:", error);
    throw new Error("Failed to fetch shops.");
  }
}