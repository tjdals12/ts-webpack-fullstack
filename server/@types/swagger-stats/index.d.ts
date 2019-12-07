declare module 'swagger-stats' {
    interface Options {
        swaggerSpec?: object;
        hostname?: string;
        name?: string;
        version?: string;
        ip?: string;
        uriPath?: string;
        timelineBucketDuration?: number;
        durationBuckets?: Array<number>;
        requestSizeBuckets?: Array<number>;
        responseSizeBuckets?: Array<number>;
        apdexThreshold?: number;
        onResponseFinish?: any;
        authentication?: boolean;
        onAuthenticate?: boolean;
        sessionMaxAge?: number;
        elasticsearch?: boolean;
        elasticsearchIndexPrefix?: string;
        elasticsearchUsername?: string;
        elasticsearchPassword?: string;
        swaggerOnly?: boolean;
        metricsPrefix?: string;
        enableEgress?: boolean;
        pathUI?: string;
        pathDist?: string;
        pathStats?: string;
        pathMetrics?: string;
        pathLogout?: string;
    }

    interface SwaggerStats {
        getMiddleware: (options: Options) => import('express').RequestHandler;
    }

    let swaggerStats: SwaggerStats;
    export = swaggerStats;
}
