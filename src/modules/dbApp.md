# dbApp.js 사용법

## 개요

기존의 몽고 클라이언트로 DB연결을 하려면 코드가 매우 더러워지면 Callback hell 에 빠지게 될수밖에 없음

 
READ 예제

1. 기존 버전

    ```javascript
    import { MongoClient } from 'mongodb'
    
    app.get('api/call', (req, res) => {
        MongoClient.connect(dbUrl, (err, db) => {
           let collection = db.collection(collectionName);
           collection.find(req.query).toArray((err, docs) => {
               res.send(docs);
           });
        });
    });
    ```

2. dbApp 사용 후 

    ```javascript
    import dbApp from './modules/dbApp.js'
    let collection = new dbApp(process.env.dbAuth).connect(collectionName);
    
    app.get('api/call', (req, res) => {
       collection.find(req.query).then( docs => {
           res.send(docs);
       });
    });
    ```


## DB 연결 후 collection instance 받기

```javascript
// app.js 기준

import dbApp from './modules/dbApp.js'
let db = new dbApp(process.env.dbAuth);
let testGram = db.connect('testGram');

```

## CRUD 인터페이스

### CREATE

```javascript
testGram.insert({
    createAt: new Date(),
    weather: '안나가봐서 모르겠음',
    content: 'dbApp insert 테스트 중!',
    username: 'zach.jung'
});
```

### READ

```javascript
testGram.find({username: 'zach.jung'}).then((doc) => {
    console.log(doc);
});
```

### UPDATE

```javascript
testGram.update(
    {username: 'zach.jung'}, // 쿼리
    {$set: {weather: '미세먼지 강함'}}, // 업데이트 내용
    {multi:true} // 옵션 
    );
```

### DELETE

```javascript
testGram.delete(
    {username: 'zach.jung'}, // 쿼리
    false // 여러파일 삭제 유무 (true: 쿼리에 해당하는 모든 파일 삭제)
).then((col) => {
    col.find({username:'zach.jung'}).then((doc) => console.log(doc));
});
```