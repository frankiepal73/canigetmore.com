import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.company.deleteMany();
  await prisma.salaryEntry.deleteMany();

  // Seed companies across various industries
  const companies = [
    // Healthcare
    {
      name: 'Mayo Clinic',
      avgSalary: 95000,
      employees: 73000,
      growth: 8.5,
      location: 'Rochester, MN',
    },
    {
      name: 'Cleveland Clinic',
      avgSalary: 92000,
      employees: 67000,
      growth: 7.2,
      location: 'Cleveland, OH',
    },
    // Finance
    {
      name: 'JPMorgan Chase',
      avgSalary: 110000,
      employees: 255998,
      growth: 9.8,
      location: 'New York, NY',
    },
    {
      name: 'Goldman Sachs',
      avgSalary: 125000,
      employees: 45100,
      growth: 8.9,
      location: 'New York, NY',
    },
    // Retail
    {
      name: 'Target',
      avgSalary: 65000,
      employees: 409000,
      growth: 5.7,
      location: 'Minneapolis, MN',
    },
    {
      name: 'Walmart',
      avgSalary: 62000,
      employees: 2300000,
      growth: 4.8,
      location: 'Bentonville, AR',
    },
    // Manufacturing
    {
      name: 'General Motors',
      avgSalary: 85000,
      employees: 157000,
      growth: 6.2,
      location: 'Detroit, MI',
    },
    {
      name: 'Boeing',
      avgSalary: 95000,
      employees: 142000,
      growth: 5.4,
      location: 'Chicago, IL',
    },
    // Education
    {
      name: 'Harvard University',
      avgSalary: 78000,
      employees: 18000,
      growth: 4.2,
      location: 'Cambridge, MA',
    },
    {
      name: 'Stanford University',
      avgSalary: 82000,
      employees: 15000,
      growth: 4.5,
      location: 'Stanford, CA',
    },
    // Hospitality
    {
      name: 'Marriott International',
      avgSalary: 55000,
      employees: 121000,
      growth: 7.8,
      location: 'Bethesda, MD',
    },
    {
      name: 'Hilton Worldwide',
      avgSalary: 54000,
      employees: 141000,
      growth: 7.2,
      location: 'McLean, VA',
    },
    // Energy
    {
      name: 'ExxonMobil',
      avgSalary: 98000,
      employees: 72000,
      growth: 6.8,
      location: 'Irving, TX',
    },
    {
      name: 'Chevron',
      avgSalary: 96000,
      employees: 48600,
      growth: 6.5,
      location: 'San Ramon, CA',
    },
    // Media & Entertainment
    {
      name: 'Disney',
      avgSalary: 88000,
      employees: 220000,
      growth: 8.4,
      location: 'Burbank, CA',
    },
    {
      name: 'Warner Bros Discovery',
      avgSalary: 85000,
      employees: 37000,
      growth: 7.9,
      location: 'New York, NY',
    },
    // Pharmaceutical
    {
      name: 'Johnson & Johnson',
      avgSalary: 105000,
      employees: 134500,
      growth: 9.2,
      location: 'New Brunswick, NJ',
    },
    {
      name: 'Pfizer',
      avgSalary: 102000,
      employees: 79000,
      growth: 8.7,
      location: 'New York, NY',
    },
    // Construction
    {
      name: 'Turner Construction',
      avgSalary: 75000,
      employees: 10000,
      growth: 6.8,
      location: 'New York, NY',
    },
    {
      name: 'Bechtel',
      avgSalary: 82000,
      employees: 44000,
      growth: 5.9,
      location: 'Reston, VA',
    },
    // Food & Beverage
    {
      name: 'PepsiCo',
      avgSalary: 72000,
      employees: 309000,
      growth: 5.8,
      location: 'Purchase, NY',
    },
    {
      name: 'Coca-Cola',
      avgSalary: 71000,
      employees: 79000,
      growth: 5.4,
      location: 'Atlanta, GA',
    },
    // Automotive
    {
      name: 'Tesla',
      avgSalary: 94000,
      employees: 127855,
      growth: 15.2,
      location: 'Austin, TX',
    },
    {
      name: 'Ford Motor',
      avgSalary: 82000,
      employees: 186000,
      growth: 5.8,
      location: 'Dearborn, MI',
    },
    // Aerospace & Defense
    {
      name: 'Lockheed Martin',
      avgSalary: 92000,
      employees: 114000,
      growth: 7.2,
      location: 'Bethesda, MD',
    },
    {
      name: 'Northrop Grumman',
      avgSalary: 90000,
      employees: 90000,
      growth: 6.8,
      location: 'Falls Church, VA',
    },
    // Insurance
    {
      name: 'UnitedHealth Group',
      avgSalary: 85000,
      employees: 350000,
      growth: 8.4,
      location: 'Minnetonka, MN',
    },
    {
      name: 'Progressive',
      avgSalary: 78000,
      employees: 49000,
      growth: 7.6,
      location: 'Mayfield, OH',
    },
    // Consulting
    {
      name: 'McKinsey & Company',
      avgSalary: 145000,
      employees: 40000,
      growth: 11.2,
      location: 'New York, NY',
    },
    {
      name: 'Boston Consulting Group',
      avgSalary: 142000,
      employees: 25000,
      growth: 10.8,
      location: 'Boston, MA',
    }
  ];

  for (const company of companies) {
    await prisma.company.create({ data: company });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });