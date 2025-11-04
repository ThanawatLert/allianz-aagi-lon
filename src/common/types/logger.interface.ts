export interface Logger {
  type: 'error' | 'debug' | 'log';
  logName: string;
  logData: any;
}
