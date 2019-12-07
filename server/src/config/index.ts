require('dotenv').config();

const env: string = process.env.NODE_ENV || 'development';

const configs: Record<string, Record<string, string>> = {
    base: {
        env,
        port: process.env.PORT || '4000',
        dbUri: process.env.DB_URI,
        dbUser: process.env.DB_USER,
        dbPass: process.env.DB_PASS,
    },
    development: {},
    production: {},
    test: {},
};

const config: Record<string, string> = Object.assign(
    configs.base,
    configs[env],
);

export default config;
