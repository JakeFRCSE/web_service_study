# React

# React와 React-dom의 차이

### React

- UI를 만들기 위한 JS 라이브러리

### React-dom

- UI를 실제 페이지에 렌더링

---

# React 기초 문법

1. class가 아닌 `className`을 사용한다.
    
    why? → 리액트는 HTML이 아닌 **JSX문법을 사용**하기 때문이다.
    
    ```jsx
    <div className="App">
      	<div className="container"></div>
    	<h1>AID</h1>
    </div>
    ```
    
2. `감싸는 태그`가 없으면 **에러가 발생**한다.
    
    why? → React 컴포넌트 내부는 **하나의 DOM 트리 구조**로 이루어져야 하기 때문이다.
    
    ```jsx
    <> 
    	<div className="App"></div>
    	<div className="container"></div>
    	<h1>REASON</h1>
    </> 
    // 빈 태그 또는 <div> 태그 사용하기
    ```
    

1. **변수 바인딩**은 **`{ }`** 를 사용하고, **함수형 컴포넌트의 이름**은 항상 `대문자`로 시작한다.
    
    ```jsx
    function App() {
      let text = 'AID';
      return <div className="App">{text}</div>;
      }
    ```
    

---

# React Component

## `useState()`

보통 `const [x, setx] = useState(...)` 꼴로 useState()를 사용한다.

x, setx의 값은 각각 다음과 같다.

```jsx
[현재 state, state를 변경하기 위한 함수]
```

그렇기에 대부분 다음과 같은 함수 꼴로 사용한다.

```jsx
const [AID, setAID] = useState()
```

여기서는 `AID` 가 state 그 자체인 것이고, `setAID` 는 이 state를 변경할 때 사용하는 함수인 것이다.

그럼 이 useState()를 이용하여 만든 간단한 예시를 확인해보자.

```jsx
import React, { useState } from 'react'; //이 import를 써 주어야 useState 함수 사용이 가
 
function Counter() {
  const [count, setCount] = useState(0); // 초기 상태값이 0이라는 상태 변수를 생성
 
  const addCount = () => {
    setCount(count + 1);  //실행 시 count의 상태 변수 값이 1씩 늘어남
  }
 
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={addCount}>Add</button>  // 버튼을 누를 때마다 addCount 실행
    </div>
  );
}
```

## `useEffect()`

**컴포넌트가 화면에 나타나거나**(마운트), **화면에서 사라지거나**(언마운트), **특정 값이 변경될 때 자동으로 어떤 일을 처리**할 수 있게 도와준다.

진짜 간단한 예시를 보면서 알아보자.

```jsx
import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
		// 이 부분이 실행된다.
    console.log("hello AID");
  });
  return <div>Home</div>;
}

export default App;
```

**브라우저에서 우리가 App 컴포넌트를 눈으로 보는 순간(렌더링 될 때)**,

useEffect() 안에 있는 console.log(”hello useEffect”)가 실행된다. 

위의 코드는 렌더링을 할 때마다 console.log(”hello useEffect”)가 실행된다. 만약 **어떤 함수를 렌더링 될 때 단 한번만 실행**하고 싶으면 어떤 방식을 써야 할까?

```jsx
 useEffect(() => {
    console.log("hello useEffect");
  }, []); // useEffect 두 번째 인자에 []을 추가하기
```

바로 위 코드처럼 **`의존성 배열`** 을 추가해주는 것이다.

의존성 배열 안에 값이 있으면 **그 값이 바뀔 때만 useEffect를 실행**한다.

위 코드에서는 의존성 배열에 아무것도 넣지 않았으니 useEffect는 처음에 딱 한번만 실행되고 그 이후로는 어떤 일이 일어나도 실행이 되지 않기에 처음 렌더링 될 때만 작동을 하는 것이다.

지금까지는 컴포넌트가 렌더링될 때 실행하는 방법을 다뤄봤다. 그러면 컴포넌트가 삭제될 때 실행하는 방법은 어떻게 하면 될까? 바로 **`clean up`** 함수를 사용하는 것이다.

clean up 함수를 사용하는 방법은 간단하다.

```jsx
 useEffect(() => {
    console.log("hello useEffect");
    		return ()=>{
			// 여기에 clean up 함수를 넣으면 된다.
		}
  }, []); // useEffect 두 번째 인자에 []을 추가하기
```

위에 주석에서도 설명을 했지만, **useEffect 안에서 return**을 해주면 실행 된다.

## ※ State Life Cycle

Mount → Update → Unmounting

[[React] 리액트 라이프 사이클](https://velog.io/@remon/React-리액트-라이프-사이클)

## 번외: `useRef()`

### useState는 무조건 리렌더링 과정, 렌더링을 피하면서 구현하고 싶을 때 유용

**서버사이드 렌더링(SSR)**  : 서버에서 HTML을 완전히 렌더링한 후, 브라우저로 페이지를 전송하는 방식

- 페이지를 초기에 그려서 넘긴다. 중간에 바껴서 다시 전체를 보내야한다. 네트워크 비용이 급증한다. 동적인 파일을 만들 수 없다.
- next.js는 기본적으로 서버사이드 렌더링

**클라이언트 렌더링(CSR)** : 클라이언트(브라우저)가 자바스크립트를 통해 페이지의 콘텐츠를 렌더링하는 방식

- 클라이언트가 그리는것. 초기에 느릴수도 있다. 근데 중간만 렌더링을 하면 된다.


**작성 - 곽도연**
