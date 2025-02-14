import { db } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { claimants, revenue, statements, users } from '../lib/placeholder-data';

const client = await db.connect();


async function seedUsers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;
  
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );
  
    return insertedUsers;
  }

  async function seedClaimants() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
    await client.sql`
      CREATE TABLE IF NOT EXISTS claimants (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;
  
    const insertedClaimaints = await Promise.all(
      claimants.map(
        (claimant) => client.sql`
          INSERT INTO claimant (id, name, email, image_url)
          VALUES (${claimant.id}, ${claimant.name}, ${claimant.email}, ${claimant.image_url})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );
  
    return insertedClaimaints;
  }



  async function seedStatements() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
    await client.sql`
      CREATE TABLE IF NOT EXISTS statements (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        claimants_id UUID NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      );
    `;
  
    const insertedStatements = await Promise.all(
        statements.map(
        (statement) => client.sql`
          INSERT INTO statements (claimants_id, amount, status, date)
          VALUES (${statement.claimant_id}, ${statement.amount}, ${statement.status}, ${statement.date})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );
  
    return insertedStatements;
  }
  

  async function seedRevenue() {
    await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;
  
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
          INSERT INTO revenue (month, revenue)
          VALUES (${rev.month}, ${rev.revenue})
          ON CONFLICT (month) DO NOTHING;
        `,
      ),
    );
  
    return insertedRevenue;
  }
  

export async function GET() {
    try{
        await seedClaimants();
        await seedUsers();
        await seedRevenue();
        await seedStatements();
        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({ error }, { status: 500 });
    }
}
