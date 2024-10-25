# Django 환경 구축하기

## 0. Python 설치 및 Python 가상환경 구축하기
Django 및 Django-rest-framework, Pytorch 등 수많은 라이브러리가 설치될 예정이므로 Python 가상환경을 이용해 global python과 분리하여 라이브러리간 충돌을 피해보자.

아래 페이지에 접속하여 Python을 설치한다.<br>
Python 3.11.4 버전을 기준으로 작성되었으므로 해당 버전을 권장한다.
#### [Python Install Page](https://www.python.org/downloads/)

Python 가상환경을 구축해보자.

```powershell
PS C:\Users\user\Desktop\Group-11> python -m venv .venv
```

`.venv` 대신 다른 폴더 이름을 사용하여도 좋으나 `.venv` 폴더명은 다른 환경 파일과 이름이 겹치지 않고 많은 파이썬 프로젝트들이 해당 폴더명을 사용하므로 편의상 `.venv`를 기준으로 진행할 것 이다.

기다린 후 아래와 같이 `.venv` 폴더가 생겨있을 것이다.
```shell
Root Directory
----
.github
.venv << 파이썬 가상환경 폴더
ai_web_front
...
```

가상환경을 실행해보자.

(Window)
```powershell
PS C:\Users\user\Desktop\Group-11> .\.venv\Scripts\activate
```

(Mac OS)
```shell
source .venv/bin/activate
```

가상환경 실행이 완료되면 아래와 같이 표시될 것이다.
```powershell
(.venv) PS C:\Users\user\Desktop\Group-11> 
```

## 1. Python Library 설치
해당 프로젝트에 필요한 파이썬 라이브러리는 다음과 같다.

**프로젝트가 진행되면서 더 추가될 예정 (ex. Pytorch, Numpy, ...)**
```text
asgiref==3.8.1
Django==5.1
djangorestframework==3.15.2
sqlparse==0.5.1
```

위 내용을 Root Directory에 [`pip_requirements.txt`](../../pip_requirements.txt)로 생성하여 붙여넣자.
```text
📁 ┬ 📁.venv
🔹 ├ 📁ai_web_front
🔹 ├ 📄pip_requirements.txt << This file
```

이후 아래 명령어를 입력하면 필요한 모든 라이브러리가 설치된다.

```powershell
(.venv) …\Group-11> pip install -r pip_requirements.txt
```
