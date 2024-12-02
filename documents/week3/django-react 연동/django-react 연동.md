# django-react 연동

# 학습목표

- rest API가 무엇인지 이해한다.
- react와 django를 rest api를 이용해서 연결하는 실습을 통해서 프론트와 백 사이의 API통신이 어떻게 이루어지는 이해한다.

# REST API란?

- REST : Representational State Transfer의 약자
    - 자원을 이름(자원의 표현..?)으로 구분해서 해당 자원의 상태를 주고 받는 것을 의미한다.
    - HTTP URI를 통해 자원을 명시하고 HTTP method(GET, POST, PUT(혹은 PATCH), DELETE)를 통해 자원에 대한 CRUD OPERATION을 적용하는 것을 말한다.
    - 즉 REST는 클라이언트가 서버데이터에 엑세스할 수 있는 GET,POST,PUT,DELETE등의 함수 집합을 정의한다.

<aside>
💡

**CRUD**

- Create : 데이터 생성(POST)
- Read : 데이터 조회(GET)
- Update : 데이터 수정(PUT, PATCH)
- Delete : 데이터 삭제(DELETE)
</aside>

- API : Application Programming Interface의 약자
    - 이때 Application이란 고유한 기능을 가진 모든 소프트웨어를 일컫는다.
    - 두 application이 서로 통신하는 방법을 제공한다. (어떻게 요청을 하고 어떻게 응답을 하는지)

- REST API는 이러한 REST를 기반으로 만들어진 API를 일컫는다.

# REST API이용해서 django-react 연결해보기 실습

<aside>
💡

**목표** 

**⇒  문자열을 담아서 GET API요청을 보낸다. django는 이를 받아서 문자열의 길이를 API요청에 대한 응답으로 보낸다.** 

</aside>

<aside>
😀

**들어가기전에**

- **AXIOS 라이브러리 사용 - http통신 라이브러리.**
    - `npm install axios` 를 이용해서 axios라이브러리 다운로드.
    - `import axios from 'axios'`  : axios라이브러리 import

- **django**
    - opasgiref==3.8.1
    - Django==5.1
    - djangorestframework==3.15.2
    - sqlparse==0.5.1
        - tutorial step3 - render()까지 진행한 django 프로젝트를 이용
        - project 이름 : mysite
        - api요청을 받을 app이름 : polls

- **react**
    - axios@1.7.7
    - next@14.2.7
    - react-dom@18.3.1
    - react@18.3.1
        - 아무 페이지나 만들기
</aside>

## 1. [Django-settings.py](http://Django-settings.py) CORS 설정

- CORS오류 문제를 해결해서 react와 리소스를 주고받는 것을 가능하게 하자.

<aside>
😀

**CORS(Cross Origin Resource Sharing)란?**

- 기본적으로 web application은 SOP(Same origin Policy)를 따른다. 즉 동일한 출처의 resource끼리만 상호작용을 허용한다.
- 하지만 웹 개발에서는 다른 출처의 자원들 끼리의 상호작용이 필요한 경우가 많고 이에 등장한 것이 CORS이다.
- 우리는 CORS정책을 준수하면서 다른 출처의 자원들끼리 resource를 주고받을 수 있다.
</aside>

- python가상환경을 키고 django-cors-header를 다운.
    
    `pip install django-cors-headers` 
    
- project의 settings.py를 열고 다음과 같이 설정

```python
#주석을 달아놓은 것이 CORS문제를 해결하기 위해 추가한 내용들 
#django프로젝트의 settings.py

INSTALLED_APPS = [
    "polls.apps.PollsConfig",
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders'   #for CORS
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware'     #for CORS
    'django.middleware.common.CommonMiddleware'     #for CORS
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

#for CORS
CORS_ORIGIN_WHITELIST = (
    'http://127.0.0.1:8000', 'http://localhost:3000')
CORS_ALLOW_CREDENTIALS = True
```

## 2. django에 API요청에 view만들기

<aside>
😀

- **API요청은 위에서 말했듯이 polls app으로 보낼 것이다.**
- **view이름은 api-get으로 한다.**
</aside>

```python
##polls.urls
urlpatterns = [
    path("", views.index, name="index"),
    path("<int:question_id>", views.detail),
    path("<int:question_id>/results", views.results),
    path("<int:question_id>/vote", views.vote),
    path("api-get", views.api_get, name="api-get"), #API요청에 매칭될 view를 등록
]

##polls.views
def api_get(request):
    message = request.GET.get('abc') ##아래 추가 설명 보기 
    ret_val = len(message)
    return HttpResponse(ret_val)
```

`reqest.GET.get('abc')` 

→ `request.GET` 은 들어온 request를 dictionary형태로 변형한다.

→ `.get('abc')` 은 python dictionary의 메서드이다.  key값에 맞는 value를 리턴한다. 만약 없다면 None을 리턴한다.

## 3. react에서 axios를 이용해서 django로 보낼 GET API 구현

```jsx
"use client"
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function test_page() {
    const [test, setTest] = useState(0)           

    const test_get = () => {
        axios.get("http://127.0.0.1:8000/polls/api-get", {
            params: {
                'abc': 'afacfacfacfa',
            },
        })
        .then((response) => {setTest(JSON.stringify(response.data))})
    };

    return (
       <div>
           <h1>글자 길이 : {test}</h1>
           <button onClick={test_get}>
               <h1>GET</h1>
           </button>
	      </div>

    )
};
```

## axios

- axios는 두번째 parameter인 params를 이용해서 쿼리 파라미터를 쉽게 만들 수 있다.
    - GET은 header가 없긴 때문에 API요청에 추가적인 정보를 담아서 보낼때는 쿼리 파라미터를 이용해야 한다.

```jsx
axios.get("http://127.0.0.1:8000/polls/api-get", {
            params: {
                'abc': 'afacfacfacfa',
            },
        })
```

이러한 요청은

`http://127.0.0.1:8000/polls/api-get?abc=afacfacfacfa`  

이렇게 django로 요청을 보내는 것과 동일하다.

## 결과

- 처음 react 페이지는 아래와 같다.

![스크린샷 2024-10-22 오전 4.55.23.png](django_react/1.png)

- GET버튼을 클릭하면 django서버로 API를 쏜다 (이때 당연히 django 서버가 켜진 상태여야 한다.)

![스크린샷 2024-10-22 오전 4.59.46.png](django_react/2.png)

- 이렇게 react로 부터 요청이 정상적으로 온 것을 볼 수 있다. (sttp status = 200)
- 다시 react로 가서 django의 응답이 잘 도착했는지 확인해 보자.

![스크린샷 2024-10-22 오전 4.55.58.png](django_react/3.png)

- Good