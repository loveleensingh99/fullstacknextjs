import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../utils/db';

function getRandomName() {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Heidi'];
  return names[Math.floor(Math.random() * names.length)];
}

export async function POST() {
  const name = getRandomName();
  try {
    await connectToDatabase();
    const Demo = (await import('@/models/Demo')).default;
    const newDemo = new Demo({ name });
    await newDemo.save();
    return NextResponse.json({ success: true, name });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Unknown error' }, { status: 500 });
  }
}
