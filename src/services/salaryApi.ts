import axios from 'axios';
import api from './api';

const BLS_BASE_URL = 'https://api.bls.gov/publicAPI/v2';

// Expanded occupation codes covering more industries
const occupationCodes: Record<string, string> = {
  // Healthcare
  'Registered Nurse': 'OEUN000000000000029114103',
  'Physician': 'OEUN000000000000029106103',
  'Physical Therapist': 'OEUN000000000000029122103',
  'Dental Hygienist': 'OEUN000000000000029203103',
  'Medical Assistant': 'OEUN000000000000031909103',
  
  // Technology
  'Software Developer': 'OEUN000000000000015113103',
  'Data Scientist': 'OEUN000000000000015110103',
  'Systems Administrator': 'OEUN000000000000015108103',
  'Network Engineer': 'OEUN000000000000015109103',
  'DevOps Engineer': 'OEUN000000000000015112103',
  
  // Finance
  'Financial Analyst': 'OEUN000000000000013205103',
  'Accountant': 'OEUN000000000000013201103',
  'Investment Banker': 'OEUN000000000000013208103',
  'Financial Manager': 'OEUN000000000000011303103',
  'Actuary': 'OEUN000000000000015203103',
  
  // Education
  'Teacher': 'OEUN000000000000025301103',
  'Professor': 'OEUN000000000000025103103',
  'School Administrator': 'OEUN000000000000011904103',
  'Special Education Teacher': 'OEUN000000000000025205103',
  'Librarian': 'OEUN000000000000025401103',
  
  // Sales & Marketing
  'Sales Representative': 'OEUN000000000000041303103',
  'Sales Manager': 'OEUN000000000000011202103',
  'Marketing Manager': 'OEUN000000000000011201103',
  'Public Relations': 'OEUN000000000000027303103',
  'Market Research Analyst': 'OEUN000000000000013116103',
  
  // Service Industry
  'Chef': 'OEUN000000000000035101103',
  'Hotel Manager': 'OEUN000000000000011908103',
  'Restaurant Manager': 'OEUN000000000000011910103',
  'Event Planner': 'OEUN000000000000013161103',
  'Flight Attendant': 'OEUN000000000000039601103',
  
  // Construction & Trades
  'Construction Manager': 'OEUN000000000000011902103',
  'Electrician': 'OEUN000000000000047201103',
  'Plumber': 'OEUN000000000000047301103',
  'Carpenter': 'OEUN000000000000047101103',
  'HVAC Technician': 'OEUN000000000000049021103',
  
  // Manufacturing
  'Production Manager': 'OEUN000000000000011307103',
  'Manufacturing Engineer': 'OEUN000000000000017201103',
  'Quality Control Inspector': 'OEUN000000000000051301103',
  'Industrial Designer': 'OEUN000000000000027102103',
  'Machinist': 'OEUN000000000000051401103',
  
  // Legal
  'Lawyer': 'OEUN000000000000023101103',
  'Paralegal': 'OEUN000000000000023203103',
  'Legal Secretary': 'OEUN000000000000043604103',
  'Judge': 'OEUN000000000000023201103',
  'Court Reporter': 'OEUN000000000000023301103',
  
  // Creative & Media
  'Graphic Designer': 'OEUN000000000000027102103',
  'Video Editor': 'OEUN000000000000027401103',
  'Photographer': 'OEUN000000000000027403103',
  'Interior Designer': 'OEUN000000000000027107103',
  'Art Director': 'OEUN000000000000027101103',
  
  // Transportation & Logistics
  'Truck Driver': 'OEUN000000000000053301103',
  'Logistics Manager': 'OEUN000000000000011307103',
  'Supply Chain Manager': 'OEUN000000000000113061103',
  'Warehouse Manager': 'OEUN000000000000011309103',
  'Fleet Manager': 'OEUN000000000000011310103',
  
  // Human Resources
  'HR Manager': 'OEUN000000000000011307103',
  'Recruiter': 'OEUN000000000000013071103',
  'Training Specialist': 'OEUN000000000000013151103',
  'Compensation Analyst': 'OEUN000000000000013111103',
  'Benefits Coordinator': 'OEUN000000000000013121103',
  
  // Default fallback
  'default': 'OEUN000000000000000000103'
};

function getBLSOccupationCode(role: string): string {
  const normalizedRole = role.toLowerCase();
  
  // Try exact match first
  const exactMatch = Object.keys(occupationCodes).find(
    title => title.toLowerCase() === normalizedRole
  );
  if (exactMatch) return occupationCodes[exactMatch];
  
  // Try partial match
  const partialMatch = Object.keys(occupationCodes).find(
    title => normalizedRole.includes(title.toLowerCase()) || 
             title.toLowerCase().includes(normalizedRole)
  );
  return occupationCodes[partialMatch || 'default'];
}

// Rest of the file remains unchanged
export async function getBLSSalaryData(role: string): Promise<SalaryRange> {
  try {
    const occupationCode = getBLSOccupationCode(role);
    const response = await axios.post(`${BLS_BASE_URL}/timeseries/data/`, {
      seriesid: [occupationCode],
      startyear: '2022',
      endyear: '2023',
    });

    const data = response.data.Results.series[0].data;
    const latestSalary = parseFloat(data[0].value) * 1000;

    return {
      min: latestSalary * 0.75,
      max: latestSalary * 1.25,
      median: latestSalary,
      source: 'Bureau of Labor Statistics'
    };
  } catch (error) {
    console.error('Failed to fetch BLS salary data:', error);
    return null;
  }
}

export async function aggregateSalaryData(role: string, location: string) {
  try {
    const [blsData, localData] = await Promise.all([
      getBLSSalaryData(role).catch(() => null),
      api.get('/salary', { params: { role, location } })
    ]);

    const localSalaries = localData.data.map((entry: any) => entry.salary);
    const allSalaries = [...(blsData ? [blsData.median] : []), ...localSalaries];
    
    const aggregatedMedian = allSalaries.length > 0
      ? allSalaries.reduce((a, b) => a + b, 0) / allSalaries.length
      : 0;

    const min = Math.min(...allSalaries, blsData?.min || Infinity);
    const max = Math.max(...allSalaries, blsData?.max || 0);
    
    return {
      aggregated: {
        median: aggregatedMedian,
        min: min === Infinity ? 0 : min,
        max: max === 0 ? aggregatedMedian * 1.5 : max
      },
      sources: blsData ? [blsData] : [],
      localInsights: localData.data,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Failed to aggregate salary data:', error);
    throw error;
  }
}