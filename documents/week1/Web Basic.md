파란색 글씨를 클릭하면 링크로 연결됩니다.

# [HTML](https://developer.mozilla.org/ko/docs/Web/HTML/Element)

- meta는 검색 엔진에 노출이 잘 된다!
- head는 react가 거의 써주니 **body**가 중요
  - head를 설정할 수 있다.

- `<div>` 영역을 구분하는 칸 / 컨테이너 - css로 디자인 가능
  ```html
  <div>안녕하세요</div>
  ```
  <div>안녕하세요</div>
- `<a>` 링크
  ```html
  <div><a href="https://www.naver.com">네이버</a></div>
  ```
  <div><a href="https://www.naver.com">네이버</a></div>
- `<h1~6>` 제목
  ```html
  <div>
    <h1>링크 목록</h1>
    <a href="https://www.naver.com">네이버</a>
    <a href="https://www.google.com">구글</a>
  </div>
  ```
  <div>
    <h1>링크 목록</h1>
    <a href="https://www.naver.com">네이버</a>
    <a href="https://www.google.com">구글</a>
  </div>

이것 외에도 `<p>`, `<footer>`, `<li>`, `<table>` 등 수많은 태그(Elements)가 있으니 아래 링크에서 목록을 확인 후 필요한 태그를 찾아 쓰자.

> **[HTML elements](https://www.w3schools.com/tags/default.asp)**

# JS

### `const`, `let`으로 변수 선언
- `const`: 상수 선언.
  - 웬만하면 const 사용하기. 객체 타입은 root가 크게 변하지 않기 때문에 변수를 변경(주소 값)할 일이 거의 없다.
- `let`은 가변적인 변수 선언.

### [JS의 타입](https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures)

| Type | `typeof` return value | Object wrapper |
|:---:|:---:|:---:|
| Null |	"object" |	N/A |
| Undefined |	"undefined" |	N/A |
| Boolean | "boolean" |	Boolean |
| Number |	"number" | Number |
| BigInt |	"bigint" | BigInt |
| String |	"string" |	String |
| Symbol |	"symbol" |	Symbol |

> `undefined`는 값이 없음을 의미하고, `null`은 객체가 없음을 의미합니다. (`typeof null === "object"`에 대한 변명이 될 수도 있습니다).

### `Date` 타입
- [`Date` 타입 설명](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date)

### 객체
- [`Object` 타입 설명](https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures#%EA%B0%9D%EC%B2%B4)
```js
{
  key1: 'value1',
  key2: 2,
  key3: {
    key3_1: [key01, key02, key03, ...]
  }
}
```

### JS는 약타입 언어
```js
const foo = 42; // foo는 숫자입니다.
const result = foo + "1"; // JavaScript는 foo를 문자열로 강제 변환하므로, 다른 피연산자와 연결할 수 있습니다.
console.log(result); // 421
```
JS는 암시적인 타입 변환을 폭넓게 사용한다. 따라서, 의도치 않은 Error에 주의하자.

### [화살표 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

```js
  const adder = (a,b) => a+b;
```

### [즉시 실행 함수](https://velog.io/@hyowon_lee/JavaScript-%EC%A6%89%EC%8B%9C-%EC%8B%A4%ED%96%89-%ED%95%A8%EC%88%98)
```js
console.log(
  ((a,b) => a+b)(1,2)
);
```
```shell
3
```

### [비동기 처리](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)

#### 비동기 처리 예시
```js
setTimeout(()=>{
    console.log('hi');
  },
  5000
);
```
```shell
# 5초마다
hi
hi
...
```

#### 비동기 처리 Promise 객체를 다루는 방법: `async-await`
- https://ko.javascript.info/async-await
```js
async function foo(){
  const res = await fetch('url', {
    method: 'POST',
    body: JSON.stringify({
      key1: 'value1',
      key2: 2,
      key3: {
        key3_1: [key01, key02, key03, ...]
      }
    })
  });
  const data = await res.json();

  console.log(data);
}
```

# CSS
[CSS W3schools](https://www.w3schools.com/css/default.asp)
- Layout 배치는 `flex`와 `grid` 요소를 사용하면 수월하게 가능하다!
- CSS는 옵션이 굉장히 많기 때문에, 미리 전체를 공부하지 말고 필요할때마다 검색하면서 알아가는 방법이 훨씬 빠르다.
- css 파일
- inline-css
- module.css

**작성 - 이동훈**