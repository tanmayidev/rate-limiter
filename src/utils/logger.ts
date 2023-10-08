export enum LogTypes {
  Info = 'Info',
  Warn = 'Warn',
  Error = 'Error',
}

export const logger = (logType: LogTypes, log: string) => {
  console.log(`\n${logType}:\t${log}\n`);
};
