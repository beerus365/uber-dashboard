import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';


export async function getCSVData(): Promise<any[]> {
    const filePath = path.join(process.cwd(), 'lib', '/ncr_ride_bookings_clean.csv');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    return new Promise((resolve, reject) => {
        Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => { resolve(results.data as any[]); },
            error: (error: any) => { reject(error); }
        });
    });
}
export default getCSVData;
