import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

const client = await db.connect();

async function listInvoices() {
	const data = await client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data.rows;
}

export async function GET() {
  try {
  	return NextResponse.json(await listInvoices());
  } catch (error) {
  	return NextResponse.json({ error }, { status: 500 });
  }
}
