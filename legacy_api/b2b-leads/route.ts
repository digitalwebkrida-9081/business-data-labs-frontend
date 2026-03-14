import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import B2BLead from '@/models/B2BLead';

export async function GET() {
  // Connect to MongoDB
  await dbConnect();

    try {
    // Try to fetch real data
    const realData = await B2BLead.find({});
    return NextResponse.json(realData);
  } catch (error) {
    console.error("Database error:", (error as Error).message);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
