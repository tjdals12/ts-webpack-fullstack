## **1. Webpack 설정**

자바스크립트를 사용한 기존의 설정에서 몇가지만 변경하면 된다.

먼저 resolve > extensions에 ts, tsx를 추가한다. js, jsx를 지우고 빌드를 해봤는데 오류가 발생한다.

```javascript
resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'];
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

            // jsx 문법 사용
            "jsx": "react",

            // 모듈 해석 방식
            "moduleResolution": "node",

            // 추가적인 라이브러리를 필요한 경우
            // lib를 생략하면 target에 지정한 값에 따라 기본값으로 넣어준다.
            // ES5: 'DOM', 'ES5', 'scripthost'
            // ES6: 'DOM', 'DOM.iterable', 'ES6', 'scripthost'
            "lib": ["DOM", "DOM.Iterable", "ESNext"],

            // default로 export 했다면 import로 불러오고,
            // 아닌 경우엔 export * as 불러와야 하는 것 같은데
            // 이 옵션을 설정하니 상관없이 import 할 수 있었다.
            "esModuleInterop": true,
        },

        "include": ["src/**/*"],
        "exclude": ["node_modules"]
    }
```
