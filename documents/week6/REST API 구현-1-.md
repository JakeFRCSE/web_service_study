# RESTAPI

## 1. 비동기 처리를 위한 celery및 redis 개념

AI모델의 연산시간이 길어지는 경우를 대비하기 위해 비동기 처리를 구현할 필요가 있다.

![celery](./img/celery.png)

Celery는 분산 메시지 전달을 기반으로 동작하는 비동기 작업 큐이다.

Celery는 broker와 worker로 구성된다. 

![architectureOfCelery](./img/architectureOfCelery)

Broker 는 Message Queue 의 역할을 하게 되고 Worker 가 일정 간격마다 Polling을 하면서 Message Queue에 있는 Task들을 가져가서 실행하게 되는 방식이다.

![redis](./img/redis.png)

redis는 Broker의 한 종류이다.


## 2. celery 설치 (redis 디펜던시 포함)

프로젝트 가상환경에서 해당 명령어를 실행하면 redis를 사용하기 위한 의존성도 한번에 설치할 수 있다.

```powershell
> pip install 'celery[redis]'
```

해당 명령어를 작성하고 다음 명령어를 실행하면 celery와 redis 사용을 위한 라이브러리가 잘 설치되었음을 확인할 수 있다.

```powershell
> pip list
```

![celeryInstalled](./img/celeryInstalled.png)
![redisInstalled](./img/redisInstalled.png)


## 3. redis(WSL2)

윈도우 개발환경에서는 redis 설치가 쉽지 않아 WSL2를 설치한 후 WSL2에서 redis 설치를 진행하였다.

우분투 환경에서 다음 명령어들을 순차적으로 실행하면 redis를 설치할 수 있다.

```powershell
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install redis-server
$ redis-server --version
```
다음 화면이 나타나면 redis가 잘 설치되었음을 의미한다.

![ubuntuRedis](./img/ubuntuRedis.png)

