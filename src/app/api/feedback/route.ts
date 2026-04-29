import { NextResponse } from 'next/server';
import { ensureSchema, sql } from '@/lib/db';

export async function GET() {
  try {
    await ensureSchema();
    const { rows } = await sql`
      SELECT id, name, rating, comment, createdAt
      FROM feedback
      ORDER BY id DESC
    `;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, rating, comment } = await request.json();
    
    if (!name || rating == null || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await ensureSchema();
    const normalizedRating = Number(rating);
    if (normalizedRating < 1 || normalizedRating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    const { rows } = await sql`
      INSERT INTO feedback (name, rating, comment)
      VALUES (${name}, ${normalizedRating}, ${comment})
      RETURNING id, name, rating, comment, createdAt
    `;

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error('Insert error', error);
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
  }
}
