import { db } from '@vercel/postgres';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { team } from '@/data/team';
import { shops } from '@/data/shops';

const client = await db.connect();

const seedTeam = async () => {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS servo_team (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      position VARCHAR(255) NOT NULL,
      email JSON,
      phone JSON
    );
  `;

  const insertedTeam = await Promise.all(
    team.map(async (teamMember) => {
      return client.sql`
        INSERT INTO servo_team (name, position, email, phone)
        VALUES (
          ${teamMember.name},
          ${teamMember.position},
          ${JSON.stringify(teamMember.email)},
          ${JSON.stringify(teamMember.phone)}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedTeam;
};

const seedShops = async () => {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS servo_shops (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      address TEXT NOT NULL
    );
  `;

  const insertedShops = await Promise.all(
    shops.map(async (shop) => {
      return client.sql`
        INSERT INTO servo_shops (title, address)
        VALUES (${shop.title}, ${shop.address})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedShops;
};

const seedCategories = async () => {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS servo_categories (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      slug VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      image VARCHAR(255) NOT NULL,
      parent UUID 
    );
  `;

  const insertedCategories = await Promise.all(
    categories.map(async (category) => {
      return client.sql`
        INSERT INTO servo_categories (id, slug, title, description, image, parent)
        VALUES (${category.id}, ${category.slug}, ${category.title}, ${category.description}, ${category.image}, ${category.parent})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedCategories;
};

const seedProducts = async () => {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS servo_products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      slug VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      categories JSON NOT NULL,
      description TEXT NOT NULL,
      images JSON NOT NULL,
      is_frozen BOOLEAN NOT NULL,
      weight TEXT,
      meta JSON,
      documents JSON,
      dish_image VARCHAR(255),
      details JSON
    );
  `;

  const insertedProducts = await Promise.all(
    products.map(async (product) => {
      return client.sql`
        INSERT INTO servo_products (slug, title, categories, description, images, is_frozen, weight, meta, documents, dish_image, details)
        VALUES (
          ${product.slug},
          ${product.title},
          ${JSON.stringify(product.categories)},
          ${product.description},
          ${JSON.stringify(product.images)},
          ${product.isFrozen},
          ${product.weight},
          ${JSON.stringify(product.meta)},
          ${JSON.stringify(product.documents)},
          ${product.dishImage},
          ${JSON.stringify(product.details)}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedProducts;
};

export async function GET() {
  try {
    await client.sql`BEGIN`;
    // await seedTeam();
    // await seedShops();
    // await seedCategories();
    // await seedProducts();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
