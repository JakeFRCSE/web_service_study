[[Kor]](#readmemd-가이드라인) [[Eng]](#readmemd-guidelines)

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/T3QcP9pQ)


## README.md 가이드라인
- README 파일 작성시에 아래의 5가지 항목의 내용은 필수적으로 포함해야 합니다.
- 아래의 7가지 항목이외에 프로젝트의 이해를 돕기위한 내용을 추가해도 됩니다.
- `SAMPLE_README.md`가 단순한 형태의 예제이니 참고하세요.
### 1. 프로젝트 소개
#### 1.1. 개발배경 및 필요성
AID(정보컴퓨터공학부 AI동아리) 내에서 `맥도날드 리뷰 데이터 별점 예측` 대회를 개최하였습니다. 맥도날드 매장에 대한 리뷰(영문) 데이터를 통해 학습된 모델이 리뷰 텍스트를 입력받으면 해당 리뷰의 별점은 몇점인지 예측하는 모델이 개발되었고, 개발된 모델을 시연해볼 수 있도록 웹서비스로 배포하는 것이 목적입니다. 해당 모델이 대회에서만 1회용으로 제작되는 것에 그치는 것이 아닌 누구나 시연해 볼 수 있는 환경이 필요하여 시작된 토이 프로젝트입니다.

#### 1.2. 개발 목표 및 주요 내용
맥도날드 매장의 후기를 영어로 입력받으면 해당 후기를 남긴 유저의 별점을 예측하는 프로그램을 배포하는 일련의 과정을 스터디하고 경험하는 것을 목표로 하고 있습니다. 이번 토이 프로젝트를 통해 웹과 Pytorch 모델이 어떻게 결합될 수 있는지 스터디 해보고 차후에 AI 모델을 학습하고 python 환경에서 이용하는 것에서 벗어나 누구나 쉽게 모델을 이용해볼 수 있는 환경을 제작하는 능력을 갖추는 것이 목표입니다.

#### 1.3. 세부내용
- 프론트엔드: Next.JS를 활용한 프롬프트 시스템
- 백엔드: Django + Pytorch로 AI 모델 API화, Django <-DB-> SQLite
- AI: AI모델 튜닝 및 인스턴스화
  - AI 모델을 위해 메모리, CPU 등의 하드웨어 성능이 뒷받침 되어야 할 것으로 보임.
  - Pytorch 모델을 Django 앱과 비동기적으로 동작하도록 설계하는 것이 중요함.

#### 1.4. 주차 별 계획 및 진행사항

(2024-11-27 기준)
[![image](https://github.com/user-attachments/assets/2e3604b0-7d03-4216-a52a-c100817d2ce5)](https://aeolian-arch-69e.notion.site/12b7102ef97780f287b4e18be2041cc1?v=3907530821de471d91c949cfe7f19a53)

- **F**: Front-End
- **B**: Back-End
- **A**: AI & Pytorch

| 주차 | 키워드 | 계획 | 진행 내역 |
|:-------:|:-------:|:-------:|:-------:|
| 1주차 | React | Web 기초 스터디 **F** <br> React 스터디 **F** | 1. [HTML, CSS, JS](./documents/week1/Web%20Basic.md) <br> 2. [React](https://www.notion.so/React-5d06778aa9b541d8ba95270fd4db5591) |
| 2주차 | HTTP <br> Figma | HTTP 기반 API 스터디 **F,B,A** <br> Figma로 Wireframe 설계 **F** | 1. [HTTP 기반 API](https://www.notion.so/HTTP-API-64249f434f934fb3a7da7c9062b9fad3) <br> 2. [Figma Wireframe](./documents/week2/Figma%20Wireframe.md) |
| 3주차 | Django <br> REST API | Django 기초 스터디 **B,A** <br> Django REST Framework 스터디 **B,A** | 1. [Django](./documents/week3/django/django%20basic.md) <br> 2-1. [Django ↔ React](./documents/week3/django-react%20연동/django-react%20연동.md)<br> 2-2. [django-rest-framework](./documents/week3/djangoRestFramework/djangoRESTframework.md) |
| 4주차 | Pytorch <br> Next.js <br> DB | Pytorch 기초 스터디 **A** <br> Next.js로 UI 구축 -1- **F** <br> DB (PostgreSQL) 스터디 **B** | 1. [Pytorch Basic](./documents/week4/Pytorch%20Basic.md) <br> 2. [Next.js UI](./documents/week4/NextJS_Create_the_UI.md) <br>  3. [Databse](./documents/week4/DataBase.md) |
| 5주차 | Pytorch <br> Next.js <br> Django, REST API | Pytorch 모델 가공 -1- **A** <br> Next.js로 UI 구축 -2- **F** <br> API 명세서 작성 및 DB ERD 작성 **B,A** | 1. [Pytorch 모델 가공](./documents/week5/Modularzation_ipynbToPy.md) <br> 2. [Next.js UI](./documents/week4/NextJS_Create_the_UI.md) <br> 3-0. [Django 환경 세팅](./documents/week5/Django_Install_and_Setting.md) <br> 3-1. [API 명세서 작성](./documents/week5/API_Document.md) |
| 6주차 | Pytorch <br> Next.js <br> Django, REST API | Pytorch 모델 가공 -2- **A** <br> Next.js로 UX 구축 -1- **F** <br> REST API 구현 -1- **B** | 1. [Pytorch 모델 가공](./documents/week5/Modularzation_ipynbToPy.md) <br> 2. Next.js UX <br> 3. [REST API 구현 -1-](./documents/week6/RESTAPI_구현-1-.md) |
| 7주차 | Pytorch <br> Next.js <br> Django, REST API | Pytorch 모델 API Serving **A** <br> Next.js로 UX 구축 -2- **F** <br> REST API 구현 -2- **B** | 1. [Torch 모델 API Serving](./ai-web-back/api/tasks.py) <br> 2. Next.js UX <br> 3. [REST API 구현 -2-](./documents/week7/RESTAPI_구현-2-.md) |
| 8주차 | Pytorch <br> Next.js <br> Django, REST API | 통합 테스트 및 디버깅 -1- **F,B,A** | - |
| 9주차 | Pytorch <br> Next.js <br> Django, REST API | 통합 테스트 및 디버깅 -2- **F,B,A** | - |
| 10주차 | Docker | Docker로 인프라 구축하기 | 1. [Docker 설정하기](./documents/week10/docker.md) |
| 11주차 | AWS | 서비스 배포 | 비용 문제로 인한 미진행 <br> 배포 예정 |

### 2. 상세설계
#### 2.1. 시스템 구성도
![System Diagram](/documents/README_img/System_Diagram.png)

#### 2.2. 사용 기술

- Frontend
  ```text
    Node.js v20.18.0

    "dependencies": {
      "react": "19.0.0-rc-69d4b800-20241021",
      "react-dom": "19.0.0-rc-69d4b800-20241021",
      "next": "15.0.1"
    }
  ```
 
- Backend ([pip_requirements.txt](./ai-web-back/pip_requirements.txt))
  ```text
    Python 3.11.4

    celery==5.4.0
    Django==5.1
    django-cors-headers==4.6.0
    djangorestframework==3.15.2
    gevent==24.11.1
    lightning==2.4.0
    redis==5.2.0
    torch==2.5.1
    transformers==4.46.3
  ```

- Infra
  ```text
  Docker
  ```

### 3. 개발결과
#### 3.1. 전체시스템 흐름도
![FrontEnd Flow](./documents/week2/img/Figma_v2.png)

#### 3.2. 기능설명
서비스는 단 하나의 페이지로 이루어져 있습니다.
- 리뷰 입력하기
  - 사용자는, 리뷰 입력 후 본인이 직접 남길 별점(AI가 맞춰야하는 별점)을 입력합니다.
- AI 연산 기다리기
  - AI의 연산이 완료될 때 까지 기다립니다.
- AI가 예상한 별점 확인하기
  - 사용자가 입력한 리뷰텍스트를 바탕으로 AI가 예측한 `사용자가 남길 별점`을 로드하여 확인합니다.

#### 3.3. 기능명세서
- Front End WireFrame: [Figma Link](https://www.figma.com/design/W0H8nZWsKPx3kqhnuEPOg0/AI-Web-Study?node-id=0-1&t=919RrO8ZHoLmXY23-1)
- System Diagram: [Figma Link](https://www.figma.com/design/W0H8nZWsKPx3kqhnuEPOg0/AI-Web-Study?node-id=18-7&t=919RrO8ZHoLmXY23-1)
- API Docs: [Notion Link](https://aeolian-arch-69e.notion.site/1317102ef97780119d9ccd079265e578?v=f37d9ae956b942a2b17f77175503c141)
- ERD, 하나의 테이블로 이루어져 있어 이미지로 대체
![Database ERD](./documents/README_img/ERD.png)

#### 3.4. 디렉토리 구조
- Root (`GROUP-11`)
```shell
📁 ┬ 📁.github # Github 레포지토리 설정 관련 파일
🔹 ├ 📁ai_web_front # FrontEnd를 담당하는 Next.js 폴더
🔹 ├ 📁ai-web-back # BackEnd를 담당하는 Django 폴더
🔹 ├ 📁documents # README.md와 연결된 각종 문서 파일
🔹 ├ 📁notice # PNU 스터디 그룹 공지사항 파일 폴더
🔹 ├ ⚙️.env # .gitignore로 인해 Push되지 않는 환경변수를 담은 파일
🔹 │         # 프로젝트 실행을 위해 직접 생성해주어야함
🔹 ├ ⚙️.gitignore # 레포지토리에 올리지 않을 파일 목록을 기재한 파일
🔹 ├ 🐋compose.yaml # 빠른 실행 및 환경 구성을 위한 Docker-Compose 관련 파일
🔹 └ 📜README.md # 지금 여러분이 보고 있는 Markdown 문서
```

- `ai_web_front`
```shell
📁 ┬ 📁app # Next.js에서 렌더링 및 라우팅할 React 파일이 담겨있는 폴더
🔹 ├ 📁components # React 공용(자주사용되는) Component를 담은 폴더
🔹 ├ 📁public # 이미지, 정적데이터와 같은 정적 파일들을 담은 폴더
🔹 ├ 📁documents # README.md와 연결된 각종 문서 파일
🔹 ├ 📁notice # PNU 스터디 그룹 공지사항 파일 폴더
🔹 ├ ⚙️.gitignore # Next.js가 자동 생성한 Next.js의 .gitignore 목록
🔹 ├ 🐋dockerfile # Docker 실행을 위해 Next.js 실행 명령어를 담은 파일
🔹 ├ 🪛jsconfig.json # javascript 설정 파일
🔹 ├ 🪛next.config.mjs # Next.js 설정 파일
🔹 ├ 🪛package-lock.json # 패키지에 필요한 모듈 의존성을 담은 파일
🔹 ├ 🪛package.json # 패키지에 필요한 구성요소를 담은 파일
🔹 └ 📜README.md # Next.js가 자동생성한 README.md
```

- `ai-web-back`
```shell
📁 ┬ 📁api # API 기능을 담은 폴더. /api/** 로 라우팅 됨
🔹 ├ 📁myapp # Django 기본 기능 및 Celery, django 설정을 담은 폴더
🔹 ├ 🐋dockerfile # Docker 실행을 위해 Django와 Celery 실행 명령어를 담은 파일
🔹 ├ 🪛manage.py # Django 실행을 위한 Django 메인 스크립트 파일
🔹 └ 📜pip_requirements.txt # Django, Celery, Torch에 필요한 모듈 목록을 담은 문서
```

### 4. 설치 및 사용 방법
#### 4.1. Docker를 이용한 실행 방법
1. Docker Desktop 설치 및 실행 - [Windows Link](https://docs.docker.com/desktop/setup/install/windows-install/), [Mac Link](https://docs.docker.com/desktop/setup/install/mac-install/), [Linux Link](https://docs.docker.com/desktop/setup/install/linux/)
2. Root (`GROUP-11`) 폴더에 `.env` 파일 생성 및 아래 내용 삽입
```shell
# Django 프로젝트 생성 시 발급된 KEY 삽입
SECRET_KEY='django-insecure-YOUR_DJANGO_INSECURE'

CORS_ORIGIN_WHITELIST_FROM='http://localhost:8080'
CORS_ORIGIN_WHITELIST_TO='http://localhost:3000'

DATABASES_ENGINE='django.db.backends.postgresql'
DATABASES_NAME=aiweb
DATABASES_USER=aiweb
DATABASES_PASSWORD='YOUR POSTGRESQL PASSWORD'
DATABASES_HOST=postgres
# Docker를 이용하지 않고 Back-End 개별 실행시 아래 값 이용
# DATABASES_HOST='YOUR DB HOST, 기본값: localhost'
DATABASES_PORT=5432

# 현재 Docker에 REDIS_USER를 설정하는 스크립트를 설정해놓지
# 않아, 빈 스트링 이외의 값이 들어갈 시 에러 발생
REDIS_USER=''
REDIS_PASSWORD='YOUR REDIS PASSWORD'
REDIS_URL=redis
# Docker를 이용하지 않고 Back-End 개별 실행시 아래 값 이용
# REDIS_URL='YOUR REDIS HOST, 기본값: localhost'
```
3. Terminal을 이용하여 Root 폴더(`Group-11`)에서 아래 명령어 실행, 첫 실행시 완료까지 수분 소요
```shell
docker-compose up --build -d
```
4. Docker에서 `backend-django` 컨네이너의 로그 확인, 아래 로그가 출력되면 컨테이너 실행 완료.
![Docker Log](./documents/README_img/Docker-log.png)
- Torch에 대한 경고문이 출력되나, 정상적으로 실행됨을 확인하였습니다.
5. 웹브라우저를 이용하여 `http://localhost:3000`으로 접속

#### 4.2. Docker를 이용하지 않고 각 Domain 개별 실행
각 영역별 문서 참고
- Front-End
  - [Front-End 실행](./documents/week4/NextJS_Install_and_Setting.md)
- Back-End with Torch
  - [Back-End 실행 -1-](./documents/week5/Django_Install_and_Setting.md)
  - [Back-End 실행 -2-](./documents/week6/RESTAPI_구현-1-.md)

### 5. 팀 소개
> 팀원 소개 & 구성원 별 역할 분담 & 간단한 연락처를 작성하세요.
#### 🍱 배고픈사람들
| 이동훈 | 조현성 | 안소희 |
|:-------:|:-------:|:-------:|
|<a href="https://github.com/bluelemon61"><img width="100px" alt="이동훈" src="https://avatars.githubusercontent.com/u/67902252?v=4" /></a> | <a href="https://github.com/hyunsung1221"><img width="100px" alt="조현성" src="https://avatars.githubusercontent.com/u/138447029?v=4" /></a> | <a href="https://github.com/soheean1370"><img width="100px" alt="안소희" src="https://avatars.githubusercontent.com/u/127065983?v=4" /></a> |
| therqq13@pusan.ac.kr | sungsam3312@pusan.ac.kr | soheean1370@pusan.ac.kr |
| 총괄 <br/> 인프라 구축 | Pytorch 개발 | Pytorch 개발 |

| 박준혁 | 박상훈 |곽도연 |
|:-------:|:-------:|:-------:|
|<a href="https://github.com/JakeFRCSE"><img width="100px" alt="박준혁" src="https://avatars.githubusercontent.com/u/162955476?v=4" /></a> | <a href="https://github.com/sanghunii"><img width="100px" alt="박상훈" src="https://avatars.githubusercontent.com/u/152972679?v=4" /></a>| <a href="https://github.com/Karryun"><img width="100px" alt="곽도연" src="https://avatars.githubusercontent.com/u/165464282?v=4" /></a> |
| eppi001004@gmail.com | sanghoon556@pusan.ac.kr |gdy0210@pusan.ac.kr |
| 백엔드 개발 | 백엔드 개발 | 프론트엔드 개발 |

[[Kor]](#readmemd-가이드라인) [[Eng]](#readmemd-guidelines)

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/T3QcP9pQ)

## README.md Guidelines
- When writing the README file, the content of the following 5 items must be included.
- You may add content beyond the following 7 items to help understand the project.
- Refer to `SAMPLE_README.md` as it is a simple example.

### 1. Project Introduction
#### 1.1. Development Background and Necessity
A `McDonald's Review Data Star Rating Prediction` competition was held within AID (AI Club of the Department of Computer Science and Engineering). A model was developed that predicts the star rating of a review when given the review text (in English) for a McDonald's store. The purpose is to deploy this developed model as a web service so it can be demonstrated. This toy project was started because there was a need for an environment where anyone could try out the model, rather than it being just a one-time creation for the competition.

#### 1.2. Development Goals and Main Content
The goal is to study and experience the entire process of deploying a program that predicts the star rating a user would give based on their English review of a McDonald's store. Through this toy project, the aim is to study how web technologies and PyTorch models can be integrated, and ultimately acquire the ability to create environments where anyone can easily use AI models, moving beyond just training models and using them in a Python environment.

#### 1.3. Detailed Content
- Frontend: Prompt system using Next.JS
- Backend: AI model API using Django + PyTorch, Django <-DB-> SQLite
- AI: AI model tuning and instantiation
  - Hardware performance such as memory, CPU, etc., seems necessary for the AI model.
  - Designing the PyTorch model to operate asynchronously with the Django app is important.

#### 1.4. Weekly Plan and Progress

(As of 2024-11-27)
[![image](https://github.com/user-attachments/assets/2e3604b0-7d03-4216-a52a-c100817d2ce5)](https://aeolian-arch-69e.notion.site/12b7102ef97780f287b4e18be2041cc1?v=3907530821de471d91c949cfe7f19a53)

- **F**: Front-End
- **B**: Back-End
- **A**: AI & PyTorch

| Week | Keyword | Plan | Progress |
|:-------:|:-------:|:-------:|:-------:|
| Week 1 | React | Web Basics Study **F** <br> React Study **F** | 1. [HTML, CSS, JS](./documents/week1/Web%20Basic.md) <br> 2. [React](https://www.notion.so/React-5d06778aa9b541d8ba95270fd4db5591) |
| Week 2 | HTTP <br> Figma | HTTP-based API Study **F,B,A** <br> Design Wireframe with Figma **F** | 1. [HTTP-based API](https://www.notion.so/HTTP-API-64249f434f934fb3a7da7c9062b9fad3) <br> 2. [Figma Wireframe](./documents/week2/Figma%20Wireframe.md) |
| Week 3 | Django <br> REST API | Django Basics Study **B,A** <br> Django REST Framework Study **B,A** | 1. [Django](./documents/week3/django/django%20basic.md) <br> 2-1. [Django ↔ React Integration](./documents/week3/django-react%20연동/django-react%20연동.md)<br> 2-2. [django-rest-framework](./documents/week3/djangoRestFramework/djangoRESTframework.md) |
| Week 4 | PyTorch <br> Next.js <br> DB | PyTorch Basics Study **A** <br> Build UI with Next.js -1- **F** <br> DB (PostgreSQL) Study **B** | 1. [PyTorch Basic](./documents/week4/Pytorch%20Basic.md) <br> 2. [Next.js UI](./documents/week4/NextJS_Create_the_UI.md) <br> 3. [Database](./documents/week4/DataBase.md) |
| Week 5 | PyTorch <br> Next.js <br> Django, REST API | Process PyTorch Model -1- **A** <br> Build UI with Next.js -2- **F** <br> Create API Specification & DB ERD **B,A** | 1. [Process PyTorch Model](./documents/week5/Modularzation_ipynbToPy.md) <br> 2. [Next.js UI](./documents/week4/NextJS_Create_the_UI.md) <br> 3-0. [Django Environment Setup](./documents/week5/Django_Install_and_Setting.md) <br> 3-1. [Create API Specification](./documents/week5/API_Document.md) |
| Week 6 | PyTorch <br> Next.js <br> Django, REST API | Process PyTorch Model -2- **A** <br> Build UX with Next.js -1- **F** <br> Implement REST API -1- **B** | 1. [Process PyTorch Model](./documents/week5/Modularzation_ipynbToPy.md) <br> 2. Next.js UX <br> 3. [Implement REST API -1-](./documents/week6/RESTAPI_구현-1-.md) |
| Week 7 | PyTorch <br> Next.js <br> Django, REST API | PyTorch Model API Serving **A** <br> Build UX with Next.js -2- **F** <br> Implement REST API -2- **B** | 1. [Torch Model API Serving](./ai-web-back/api/tasks.py) <br> 2. Next.js UX <br> 3. [Implement REST API -2-](./documents/week7/RESTAPI_구현-2-.md) |
| Week 8 | PyTorch <br> Next.js <br> Django, REST API | Integration Testing and Debugging -1- **F,B,A** | - |
| Week 9 | PyTorch <br> Next.js <br> Django, REST API | Integration Testing and Debugging -2- **F,B,A** | - |
| Week 10 | Docker | Build Infrastructure with Docker | 1. [Configure Docker](./documents/week10/docker.md) |
| Week 11 | AWS | Service Deployment | Not progressed due to cost issues <br> Scheduled for deployment |

### 2. Detailed Design
#### 2.1. System Architecture Diagram
![System Diagram](/documents/README_img/System_Diagram.png)

#### 2.2. Technologies Used

- Frontend
  ```text
    Node.js v20.18.0

    "dependencies": {
      "react": "19.0.0-rc-69d4b800-20241021",
      "react-dom": "19.0.0-rc-69d4b800-20241021",
      "next": "15.0.1"
    }
  ```
- Backend (pip_requirements.txt)
```text
  Python 3.11.4
  celery==5.4.0
  Django==5.1
  django-cors-headers==4.6.0
  djangorestframework==3.15.2
  gevent==24.11.1
  lightning==2.4.0
  redis==5.2.0
  torch==2.5.1
  transformers==4.46.3
```

- Infra
  ```text
  Docker
  ```

### 3. Development Results

#### 3.1. Overall System Flowchart
![FrontEnd Flow](./documents/week2/img/Figma_v2.png)
#### 3.2. Feature Description

The service consists of a single page.

- Enter Review
  - The user enters a review and then inputs the star rating they would actually give (the rating the AI needs to predict).
- Wait for AI Calculation
  - Wait until the AI's calculation is complete.
- Check AI's Predicted Star Rating
  - Load and check the star rating the user would give predicted by the AI based on the user's input review text.
#### 3.3. Functional Specification

- Front End WireFrame: [Figma Link](https://www.figma.com/design/W0H8nZWsKPx3kqhnuEPOg0/AI-Web-Study?node-id=0-1&t=919RrO8ZHoLmXY23-1)
- System Diagram: [Figma Link](https://www.figma.com/design/W0H8nZWsKPx3kqhnuEPOg0/AI-Web-Study?node-id=18-7&t=919RrO8ZHoLmXY23-1)
- API Docs: [Notion Link](https://aeolian-arch-69e.notion.site/1317102ef97780119d9ccd079265e578?v=f37d9ae956b942a2b17f77175503c141)
- ERD, replaced with an image as it consists of a single table ![Database ERD](./documents/README_img/ERD.png)

#### 3.4. Directory Structure
- Root ('GROUP-11')
```shell
📁 ┬ 📁.github # Files related to Github repository settings
🔹 ├ 📁ai_web_front # Next.js folder responsible for FrontEnd
🔹 ├ 📁ai-web-back # Django folder responsible for BackEnd
🔹 ├ 📁documents # Various document files linked with README.md
🔹 ├ 📁notice # Folder for PNU study group notice files
🔹 ├ ⚙️.env # File containing environment variables not pushed due to .gitignore
🔹 │         # Must be created manually to run the project
🔹 ├ ⚙️.gitignore # File listing files not to be included in the repository
🔹 ├ 🐋compose.yaml # Docker-Compose related file for quick execution and environment setup
🔹 └ 📜README.md # The Markdown document you are currently reading
```

- `ai_web_front`
```shell
📁 ┬ 📁app # Folder containing React files for rendering and routing in Next.js
🔹 ├ 📁components # Folder containing common (frequently used) React Components
🔹 ├ 📁public # Folder containing static files like images, static data
🔹 ├ 📁documents # Various document files linked with README.md
🔹 ├ 📁notice # Folder for PNU study group notice files
🔹 ├ ⚙️.gitignore # .gitignore list automatically generated by Next.js
🔹 ├ 🐋dockerfile # File containing Next.js execution commands for Docker execution
🔹 ├ 🪛jsconfig.json # javascript configuration file
🔹 ├ 🪛next.config.mjs # Next.js configuration file
🔹 ├ 🪛package-lock.json # File containing module dependencies required for the package
🔹 ├ 🪛package.json # File containing components required for the package
🔹 └ 📜README.md # README.md automatically generated by Next.js
```

- `ai-web-back`
```shell
📁 ┬ 📁api # Folder containing API functions. Routed to /api/**
🔹 ├ 📁myapp # Folder containing basic Django functions, Celery, and Django settings
🔹 ├ 🐋dockerfile # File containing Django and Celery execution commands for Docker execution
🔹 ├ 🪛manage.py # Main Django script file for running Django
🔹 └ 📜pip_requirements.txt # Document listing required modules for Django, Celery, Torch
```

### 4. Installation and Usage

#### 4.1. How to Run Using Docker

1. Install and run Docker Desktop - [Windows Link](https://docs.docker.com/desktop/setup/install/windows-install/), [Mac Link](https://docs.docker.com/desktop/setup/install/mac-install/), [Linux Link](https://docs.docker.com/desktop/setup/install/linux/)
2. Create a .env file in the Root (GROUP-11) folder and insert the following content:
```shell
# Insert the KEY issued when creating the Django project
SECRET_KEY='django-insecure-YOUR_DJANGO_INSECURE'

CORS_ORIGIN_WHITELIST_FROM='http://localhost:8080'
CORS_ORIGIN_WHITELIST_TO='http://localhost:3000'

DATABASES_ENGINE='django.db.backends.postgresql'
DATABASES_NAME=aiweb
DATABASES_USER=aiweb
DATABASES_PASSWORD='YOUR POSTGRESQL PASSWORD'
DATABASES_HOST=postgres
# Use the value below when running Back-End individually without Docker
# DATABASES_HOST='YOUR DB HOST, default: localhost'
DATABASES_PORT=5432

# Currently, the script to set REDIS_USER in Docker is not configured,
# so entering a value other than an empty string will cause an error.
REDIS_USER=''
REDIS_PASSWORD='YOUR REDIS PASSWORD'
REDIS_URL=redis
# Use the value below when running Back-End individually without Docker
# REDIS_URL='YOUR REDIS HOST, default: localhost'
```

3. Using the Terminal, navigate to the Root folder (Group-11) and run the following command. The first run may take several minutes to complete.
```shell
docker-compose up --build -d
```

4. Check the logs of the backend-django container in Docker. 
![Docker Log](./documents/README_img/Docker-log.png) 
- If the following log is displayed, the container has started successfully.
- A warning about Torch is output, but it has been confirmed to run normally.

5. Access 'http://localhost:3000' using a web browser.

#### 4.2. Running Each Domain Individually Without Docker

Refer to the documentation for each area:

-Front-End
 - [Front-End Execution](./documents/week4/NextJS_Install_and_Setting.md)
-Back-End with Torch
 - [Back-End Execution -1-](./documents/week5/Django_Install_and_Setting.md)
 - [Back-End Execution -2-](./documents/week6/RESTAPI_구현-1-.md)

### 5. Team Introduction

> Introduce team members & role distribution per member & write down simple contact information.

#### 🍱 Hungry People

| 이동훈 | 조현성 | 안소희 |
|:-------:|:-------:|:-------:|
|<a href="https://github.com/bluelemon61"><img width="100px" alt="이동훈" src="https://avatars.githubusercontent.com/u/67902252?v=4" /></a> | <a href="https://github.com/hyunsung1221"><img width="100px" alt="조현성" src="https://avatars.githubusercontent.com/u/138447029?v=4" /></a> | <a href="https://github.com/soheean1370"><img width="100px" alt="안소희" src="https://avatars.githubusercontent.com/u/127065983?v=4" /></a> |
| therqq13@pusan.ac.kr | sungsam3312@pusan.ac.kr | soheean1370@pusan.ac.kr |
| Overall Lead <br> Infrastructure Setup | PyTorch Development | PyTorch Development |

| 박준혁 | 박상훈 |곽도연 |
|:-------:|:-------:|:-------:|
|<a href="https://github.com/JakeFRCSE"><img width="100px" alt="박준혁" src="https://avatars.githubusercontent.com/u/162955476?v=4" /></a> | <a href="https://github.com/sanghunii"><img width="100px" alt="박상훈" src="https://avatars.githubusercontent.com/u/152972679?v=4" /></a>| <a href="https://github.com/Karryun"><img width="100px" alt="곽도연" src="https://avatars.githubusercontent.com/u/165464282?v=4" /></a> |
| eppi001004@gmail.com | sanghoon556@pusan.ac.kr |gdy0210@pusan.ac.kr |
| Backend Development | Backend Development | Frontend Development |
