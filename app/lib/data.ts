import { sql } from "@vercel/postgres";
import {
    ClaimantField,
    ClaimantTableType,
    StatementForm,
    StatementTable,
    LatestStatement,
    Revenue,
} from './definitions';
import { formatCurrency } from "./copy-utils";

export async function fetchRevenue() {
    try {
        const data = await sql<Revenue>`SELECT * FROM revenue`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchLatestStatements() {
    try {
        const data = await sql<Revenue>`
    SELECT statements.amount, claimants.name, claimants.image_url, statements.id
    FROM statements
    JOIN claimants ON statements.claimants_id = claimants.id
    ORDER BY statements.date DESC
    LIMIT 5`;

        const latestStatements = data.rows.map((statement) => ({
            ...statement,
            amount: formatCurrency(statement.amount),
        }));
        return latestStatements;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}

export async function fetchCardData() {
    try {
        const statementCountPromise = sql`SELECT COUNT(*) FROM statements`;
        const claimantCountPromise = sql`SELECT COUNT(*) FROM claimants`;
        const statementStatusPromise = sql`SELECT
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM statements`;

        const data = await Promise.all([
            statementCountPromise,
            claimantCountPromise,
            statementStatusPromise,
        ]);
        const numberOfStatements = Number(data[0].rows[0].count ?? '0');
        const numberOfClaimants = Number(data[1].rows[0].count ?? '0');
        const totalStatementsPaid = formatCurrency(data[2].rows[0].paid ?? '0');
        const totalPendingStatements = formatCurrency(data[2].rows[0].pending ?? '0');

        return {
            numberOfStatements,
            numberOfClaimants,
            totalStatementsPaid,
            totalPendingStatements,
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}
const ITEMS_PER_PAGE = 6;
export async function fetchFilteredStatements(
    query: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const statements = await sql<StatementTable>`
            SELECT
              statements.id,
              statements.amount,
              statements.date,
              statements.status,
              claimants.name,
              claimants.email,
              claimants.image_url
            FROM statements
            JOIN claimants ON statements.claimants_id = claimants.id
            WHERE
              claimants.name ILIKE ${`%${query}%`} OR
              claimants.email ILIKE ${`%${query}%`} OR
              statements.amount::text ILIKE ${`%${query}%`} OR
              statements.date::text ILIKE ${`%${query}%`} OR
              statements.status ILIKE ${`%${query}%`}
            ORDER BY statements.date DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
          `;

        return statements.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch statements.');
    }
}

export async function fetchStatementsPages(query: string) {
    try {
        const count = await sql`SELECT COUNT(*)
          FROM statements
          JOIN claimants ON statements.claimants_id = claimants.id
          WHERE
            claimants.name ILIKE ${`%${query}%`} OR
            claimants.email ILIKE ${`%${query}%`} OR
            statements.amount::text ILIKE ${`%${query}%`} OR
            statements.date::text ILIKE ${`%${query}%`} OR
            statements.status ILIKE ${`%${query}%`}
        `;

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of statements.');
    }
}

export async function fetchStatementsById(id: string) {
    try {
      const data = await sql<StatementForm>`
        SELECT
          statements.id,
          statements.claimants_id,
          statements.amount,
          statements.status
        FROM statements
        WHERE statements.id = ${id};
      `;
  
      const statement = data.rows.map((statement) => ({
        ...statement,
        amount: statement.amount / 100,
      }));
  
      return statement[0];
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch statement.');
    }
  }
  
export async function fetchClaimants() {
    try {
      const data = await sql<ClaimantField>`
        SELECT
          id,
          name
        FROM claimants
        ORDER BY name ASC
      `;
  
      const claimants = data.rows;
      return claimants;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch all claimants.');
    }
  }

  export async function fetchFilteredClaimants(query: string) {
    try {
      const data = await sql<ClaimantTableType>`
          SELECT
            claimants.id,
            claimants.name,
            claimants.email,
            claimants.image_url,
            COUNT(statements.id) AS total_statements,
            SUM(CASE WHEN statements.status = 'pending' THEN statements.amount ELSE 0 END) AS total_pending,
            SUM(CASE WHEN statements.status = 'paid' THEN statements.amount ELSE 0 END) AS total_paid
          FROM claimants
          LEFT JOIN statements ON claimants.id = statements.claimants_id
          WHERE
        claimants.name ILIKE ${`%${query}%`} OR
          claimants.email ILIKE ${`%${query}%`}
          GROUP BY claimants.id, claimants.name, claimants.email, claimants.image_url
          ORDER BY claimants.name ASC
        `;
  
      const claimants = data.rows.map((claimant) => ({
        ...claimant,
        total_pending: formatCurrency(claimant.total_pending),
        total_paid: formatCurrency(claimant.total_paid),
      }));
  
      return claimants;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch claimants table.');
    }
  }
  