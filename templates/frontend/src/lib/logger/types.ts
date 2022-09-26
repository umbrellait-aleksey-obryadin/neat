export enum Level {
  info = 'info',
  warn = 'warn',
  error = 'error',
  fatal = 'fatal',
}

export interface Transport {
  log(level: Level, payload: unknown, extras: unknown): void
}
