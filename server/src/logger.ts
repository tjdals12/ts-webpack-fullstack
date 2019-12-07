import { format, createLogger, transports } from 'winston';
import timestampColorize from 'winston-timestamp-colorize';

const commonFormat = format.combine(
    format(info => ({ ...info, level: info.level.toUpperCase() }))(),
    format.label({ label: 'EXPRESS_TS' }),
    format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
);

const consoleFormat = format.combine(
    timestampColorize({ color: 'yellow' }),
    format.colorize({
        all: true,
        colors: { info: 'green', debug: 'yellow', error: 'red' },
    }),
    format.printf(
        ({ timestamp, label, level, message }) =>
            `${timestamp} ${label}::[${level}] - ${message}`,
    ),
);

const logger = createLogger({
    level: 'info',
    format: format.combine(commonFormat, consoleFormat),
    transports: [new transports.Console()],
});

export default logger;
