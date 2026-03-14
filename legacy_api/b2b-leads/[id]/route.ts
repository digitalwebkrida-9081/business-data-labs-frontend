import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import B2BLead from '@/models/B2BLead';
import mongoose from 'mongoose';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  
  const { id } = await params;
  
  try {
    // If ID is valid Mongo Object ID, try to find it
    if (mongoose.Types.ObjectId.isValid(id)) {
        const lead = await B2BLead.findById(id);
        if (lead) return NextResponse.json(lead);
    }
  } catch (error) {
    console.warn("Detail fetch error", error);
  }

  // Fallback Mock Data (Simulated Detail)
  const mockDetailData = {
    id: id, // Echo back the ID so component doesn't break
    category: "Clothing Stores",
    location: "India",
    lastUpdate: "Jan 15, 2024",
    price: "$299",
    totalRecords: "102,120",
    emailCount: "13,400",
    phoneCount: "92",
    sampleList: [
      { name: "Levi's Store", address: "123 Main St", city: "Mumbai", state: "MH", country: "India", email: "contact@levi.in", phone: "+91 9876543210", rating: "4.5", reviews: "102" },
      { name: "Zara Fashion", address: "45 Park Street", city: "Delhi", state: "DL", country: "India", email: "info@zara.com", phone: "+91 9988776655", rating: "4.2", reviews: "250" },
      { name: "H&M Retail", address: "Orbit Mall, 2nd Floor", city: "Bangalore", state: "KA", country: "India", email: null, phone: "+91 8877665544", rating: "4.8", reviews: "89" },
      { name: "FabIndia", address: "Sector 17 Market", city: "Chandigarh", state: "CH", country: "India", email: "support@fabindia.com", phone: null, rating: "4.6", reviews: "150" },
      { name: "Raymonds Shop", address: "MG Road", city: "Pune", state: "MH", country: "India", email: "sales@raymond.in", phone: "+91 7654321098", rating: "4.3", reviews: "75" },
      { name: "Manyavar", address: "City Center", city: "Hyderabad", state: "TS", country: "India", email: "hello@manyavar.com", phone: "+91 9087654321", rating: "4.7", reviews: "210" },
      { name: "Pantaloons", address: "Phoenix Mall", city: "Chennai", state: "TN", country: "India", email: null, phone: null, rating: "4.1", reviews: "300" },
    ]
  };

  return NextResponse.json(mockDetailData);
}
