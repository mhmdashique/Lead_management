const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  company: { type: String, trim: true },
  jobTitle: { type: String, trim: true },
  leadSource: { 
    type: String, 
    enum: ['Website', 'LinkedIn', 'Referral', 'Cold Call', 'Email Campaign', 'Trade Show', 'Other'],
    default: 'Other'
  },
  leadStatus: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'],
    default: 'New'
  },
  assignedTo: { type: String, trim: true },
  estimatedValue: { type: Number, default: 0 },
  notes: { type: String },
  tags: [{ type: String }],
  lastContactDate: { type: Date }
}, { 
  timestamps: true 
});

leadSchema.index({ email: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ leadStatus: 1 });

module.exports = mongoose.model('Lead', leadSchema);
