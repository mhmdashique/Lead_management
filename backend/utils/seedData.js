require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Lead = require('../models/Lead');

const LEAD_SOURCES = ['Website', 'LinkedIn', 'Referral', 'Cold Call', 'Email Campaign', 'Trade Show'];
const LEAD_STATUSES = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];
const STATUS_WEIGHTS = { New: 0.4, Contacted: 0.3, Qualified: 0.15, Converted: 0.1, Lost: 0.05 };
const SALES_REPS = [
  'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis',
  'David Wilson', 'Jessica Martinez', 'Robert Taylor', 'Amanda Anderson'
];

const getWeightedStatus = () => {
  const rand = Math.random();
  let sum = 0;
  for (const [status, weight] of Object.entries(STATUS_WEIGHTS)) {
    sum += weight;
    if (rand <= sum) return status;
  }
  return 'New';
};

const generateLead = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const createdAt = faker.date.between({ 
    from: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), 
    to: new Date() 
  });

  return {
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    phone: faker.phone.number(),
    company: faker.company.name(),
    jobTitle: faker.person.jobTitle(),
    leadSource: faker.helpers.arrayElement(LEAD_SOURCES),
    leadStatus: getWeightedStatus(),
    assignedTo: faker.helpers.arrayElement(SALES_REPS),
    estimatedValue: faker.number.int({ min: 1000, max: 100000 }),
    notes: faker.helpers.maybe(() => faker.lorem.paragraph(), { probability: 0.6 }),
    tags: faker.helpers.arrayElements(['Enterprise', 'SMB', 'Startup', 'Hot Lead', 'Follow-up'], { min: 0, max: 3 }),
    lastContactDate: faker.helpers.maybe(() => faker.date.recent({ days: 30 }), { probability: 0.5 }),
    createdAt,
    updatedAt: createdAt
  };
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Lead.deleteMany({});
    console.log('Cleared existing leads');

    const leads = Array.from({ length: 750 }, generateLead);
    await Lead.insertMany(leads);
    
    console.log(`✅ Successfully seeded ${leads.length} leads`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
