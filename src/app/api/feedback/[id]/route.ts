import { NextResponse } from 'next/server';
import { ensureSchema, sql } from '@/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await ensureSchema();
    await sql`DELETE FROM feedback WHERE id = ${id}`;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete feedback' }, { status: 500 });
  }
}
