## **1. Webpack 설정**

자바스크립트를 사용한 기존의 설정에서 몇가지만 변경하면 된다.

먼저 resolve > extensions에 ts를 추가한다. Client의 설정과 달리 js를 빼도 오류가 발생하진 않는다.

```javascript
resolve: {
    extensions: ['.ts'];
}
```

&nbsp;

그리고 typescript를 위한 loader를 추가하는데 babel-loader는 지우고 ts-loader를 넣는다. options에 지정한 transpileOnly와 experimentalWatchApi는 빌드 시간을 줄이기 위한 설정이다. ts-loader는 변환과 타입 검사를 동시에 같은 스레드에서 진행한다고 한다. 그래서 **_transpileOnly_** 를 통해 변환만 하고 타입 검사는 플러그인을 통해 하도록 설정한다. **_experimentalWatchApi_** 는 변경된 부분만 빌드하는 설정이다.

```javascript
plugins: [
    new ForkTsCheckerWebpackPlugin(), // 타입 검사를 해주는 플러그인
];

module: {
    rules: [
        {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOny: true,
                        experimentalWatchApi: true,
                    },
                },
            ],
        },
    ];
}
```

&nbsp;

&nbsp;

## **2. tsconfig.json**

```javascript
    {
        "compilerOptions": {
            // 변환할 ECMAScript 버전
            "target": "ES5",

            // 빌드 결과의 모듈 방식
            "module": "CommonJS",

            // 모듈 해석 방식
            "moduleResolution": "node",

            // default로 export 했다면 import로 불러오고,
            // 아닌 경우엔 export * as 불러와야 하는 것 같은데
            // 이 옵션을 설정하니 상관없이 import 할 수 있었다.
            "esModuleInterop": true,

            "typeRoots": ["./node_modules/@types", "./@types"],
        },

        "include": ["src/**/*"],
        "exclude": ["node_modules"]
    }
```

&nbsp;

&nbsp;

## 3. 모듈 타입 정의

설치한 모듈 중에 @types가 없는 것들도 있다. 이럴 경우엔 직접 정의해서 사용을 하는데 자신이 필요한 부분만 작성해서 사용하면 되는 것 같다. @types라는 폴더에 해당 모듈명으로 폴더를 만들고 index.d.ts를 작성한다. 그리고 tsconfig.json 파일에 compilerOptions > typeRoots를 추가한다.

여기선 swagger-stats에 @types가 없어서 직접 정의하였다. getMiddleware만 사용할 것이기 때문에 아래와 같이 작성하였다. 이렇게 작성해놓으니 자동완성을 지원해준다. 놀라웠다..

```javascript
    declare module 'swagger-stats' {
        interface Options {
            swaggerSpec?: object;
            hostname?: string;

            ... 생략
        }

        interface SwaggerStats {
            getMiddleware: (options: Options) => import('express').RequestHandler;
        }

        let swaggerStats: SwaggerStats;
        export = swaggerStats;
    }

```
