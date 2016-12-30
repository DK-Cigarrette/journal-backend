# journal-backend


## 환경설정 (NPM 이 깔려 있어야 함)

```
$ cd <your working directory>
$ git clone https://github.com/DK-Cigarrette/journal-backend.git
$ cd journal-backend
$ npm install
```

## bundle.js 가져오기
- frontend <=> backend 간 작업환경 분리로 frontend master 브랜치에서 bundle.js만 가져오기
- 읽어온 파일은 src/public/javascript/bundle.js 로 저장

```
$ npm run fetch
```

- 원격 파일 소스 위치는 fetchRemoteResource.js 에서 수정

```javascript
const rootURL = 'https://raw.githubusercontent.com/DK-Cigarrette/journal-frontend';
const branch = 'master';
const pathName = 'README.md'; // TODO: 해당 경로 추후 수정
```

## 개발서버 올리기

- 기본 로컬 포트: 3000
- 바라보는 폴더: src

```
$ npm start
```

## 빌드하기

- 빌드는 배포서버가 shell script로 실행하기 때문에 개발시 사용할 필요는 없음

```
$ npm run build
```