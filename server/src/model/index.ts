import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import config from '../config';

const { env, dbUri, dbUser, dbPass } = config;

export const connect = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;

        if (env === 'test') {
            const mockgoose = new Mockgoose(mongoose);

            mockgoose.prepareStorage().then(() => {
                mongoose
                    .connect(dbUri, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    })
                    .then(() => resolve('mockgoose'))
                    .catch(err => reject(err));
            });
        }

        if (['development', 'production'].includes(env)) {
            mongoose
                .connect(dbUri, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    user: dbUser,
                    pass: dbPass,
                })
                .then(() => resolve('mongoose'))
                .catch(err => reject(err));
        }
    });
};
