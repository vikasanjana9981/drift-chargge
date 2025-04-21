import fs from 'fs';
import path from 'path';

// Define log file path
const logFilePath = path.join(process.cwd(), 'logs', 'mutation.log');

// Ensure logs directory exists
if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

// Function to log data into a file
export function logToFile(data: any, label: string = 'Log') {
  const logMessage = `[${new Date().toISOString()}] ${label}:\n${JSON.stringify(data, null, 2)}\n\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
}
