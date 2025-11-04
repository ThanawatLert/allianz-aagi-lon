interface Logger {
  type: 'error' | 'debug' | 'log';
  logName: string;
  logData: any;
}

export const logger = ({ type, logName, logData }: Logger) => {
  try {
    if (type === 'error') {
      if (logData instanceof Error) {
        console.log(`[ERROR] ${logName} CATCH: ${logData.message}`);
      } else {
        if (typeof logData !== undefined) {
          console.log(
            `[ERROR] ${logName} CATCH: ${typeof logData === 'object' ? JSON.stringify(logData) : String(logData)}`,
          );
        } else {
          console.log(`[ERROR] ${logName} CATCH`);
        }
      }
    } else if (type === 'debug') {
      if (typeof logData !== undefined) {
        console.log(
          `[DEBUG] ${logName}: ${typeof logData === 'object' ? JSON.stringify(logData) : String(logData)}`,
        );
      } else {
        console.log(`[DEBUG] ${logName}`);
      }
    } else {
      if (typeof logData !== undefined) {
        console.log(
          `[LOG] ${logName}: ${typeof logData === 'object' ? JSON.stringify(logData) : String(logData)}`,
        );
      } else {
        console.log(`[LOG] ${logName}`);
      }
    }
  } catch (error) {
    console.log(`[ERROR]${logName || ''} CATCH: ${JSON.stringify({ error })}`);
  }
};
