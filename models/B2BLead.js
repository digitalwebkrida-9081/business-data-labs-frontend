import mongoose from 'mongoose';

const B2BLeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  totalRecords: {
    type: String, // Stored as string to handle commas e.g. "120,500" or can be Number
    required: true,
  },
  emailCount: {
    type: String,
  },
  phoneCount: {
    type: String,
  },
  price: {
    type: String,
    default: "$299"
  },
  lastUpdate: {
    type: String,
    default: new Date().toLocaleDateString()
  },
  // This stores the sample rows shown on the detail page
  sampleList: [
    {
      name: String,
      address: String,
      city: String,
      state: String,
      country: String,
      email: String,
      phone: String,
      rating: String,
      reviews: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.B2BLead || mongoose.model('B2BLead', B2BLeadSchema);
