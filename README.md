<img width="1263" alt="스크린샷 2022-12-04 오후 7 34 24" src="https://user-images.githubusercontent.com/78193416/205485978-a63e1a6a-0129-49aa-bf35-56a2e982be2e.png">

# Pre-programming &nbsp;  [바로가기]([https://www.pre-programming.com](https://pre-programming-8b7b76496028.herokuapp.com/me)

## : What to do before you studying programming! 

--------------

**목차**

[1. 프로젝트 계획 이유](#프로젝트-계획-이유)

[2. 목표](#목표)

[3. 작동 모습](#작동-모습)

[4. 기술 스택](#기술-스택)

[5. 세부 사항](#세부-사항)

[6. 개발 계획](#개발-계획)

[7. 배포](#배포)

[9. 버전](#버전)

-------------


### 프로젝트 계획 이유 

개발자 관련 유튜브를 보던 중 아래와 같은 흥미로운 설문조사를 발견했습니다.  &nbsp; &nbsp; (출처 : https://www.youtube.com/@nomadcoders )

![IMG_B324941C660F-1](https://user-images.githubusercontent.com/78193416/205483487-15d7f9e0-3011-42fb-aaef-3f3290c9f864.jpeg)


 위 설문조사를 통해 많은사람이 특정 프로그래밍 언어보단 그 언어를 학습하는 데 
 
 필요한 **영어**를 더 중요시한다는 사실을 알았습니다. 이를 돕고자 특정 기술을 배울 때,   

 **먼저 알아야 할 영어 단어 학습**을 돕는 웹을 개발하게 되었습니다.

-----------

### 목표 

#### 특정 기술을 배우는 데에 있어 효과적으로 영어단어를 학습하도록 돕는 서비스를 만들자!

1. **많은 사람이 배우고자** 하는 기술을 우선적으로 제공할 것.    
2. 효과적인 학습을 위해, 학습하려는 기술 문서에 **자주 등장하는 영어 단어**를 제공할 것. 



### 1. 많은 사람이 배우고자 하는 기술을 우선적으로 제공할 것.

위의 목적을 달성하기 위해 npm install 수와 기술 문서의 완성도를 기준으로 10가지 기술을 채택했습니다. (https://www.npmjs.com/)

<details>
<summary>표 보기</summary>
<div markdown="1">



| 기술              | 주간 다운로드 수 | 제공 유무 |
| ----------------- | ---------------- | --------- |
| react             | 17,000k          | O         |
| next              | 3,400k           | O         |
| react-redux       | 6,400k           | O         |
| react-query       | 1,400k           | O         |
| react-router      | 8,800k           | O         |
| styled-components | 4,700k           | O         |
| axios             | 35,000k          | O         |
| recoil            | 330k             | O         |
| tailwindcss       | 4,080k           | O         |
| react-hook-form   | 2,600k           | O         |

</div>
</details>

### 2. 효과적인 학습을 위해, 학습하려는 기술 문서에 자주 등장하는 영어단어를 제공할 것. 

영어단어를 추출하기 위해 진행한 프로세스는 다음과 같습니다.

 1. 기술 문서 세부 url 추출   

    <details><summary>자세히 보기</summary><div markdown='1'>
    <img width="1180" alt="스크린샷 2022-12-14 오전 1 11 08" src="https://user-images.githubusercontent.com/78193416/207385456-e0fc2e68-b6e4-4a8f-8f22-1719184a9d42.png">
    <img width="1164" alt="스크린샷 2022-12-14 오전 1 13 36" src="https://user-images.githubusercontent.com/78193416/207385644-f3fba482-5b16-47cb-a141-e325058da582.png">
    </div></details>

 2. 세부 url에서 text 추출

    <details><summary>자세히 보기</summary><div markdown="1">       
    <img width="1162" alt="스크린샷 2022-12-14 오전 1 18 39" src="https://user-images.githubusercontent.com/78193416/207387118-f57ffdae-63e6-4095-9725-5bbf2b9dddee.png">
    <img width="1176" alt="스크린샷 2022-12-14 오전 1 19 41" src="https://user-images.githubusercontent.com/78193416/207387310-49ea0f39-22c9-4d3a-a023-52b2578cadc5.png">
    </div></details>

 3. text 전처리  ( 영어 사전에 존재 여부 , NLTK 사용)

    <details><summary>자세히 보기</summary><div markdown="1">       
    <img width="1173" alt="스크린샷 2022-12-14 오전 1 28 50" src="https://user-images.githubusercontent.com/78193416/207389887-45b9ac47-1a27-4e40-8ef4-2eff2acf48de.png">
    <img width="1167" alt="스크린샷 2022-12-14 오전 1 30 03" src="https://user-images.githubusercontent.com/78193416/207389904-e788eeab-4e53-4993-98c0-89b98be57096.png">
    <img width="1168" alt="스크린샷 2022-12-14 오전 1 30 41" src="https://user-images.githubusercontent.com/78193416/207389827-30d519cd-29e6-424d-a0f1-6bae27e59a23.png">
    </div></details>


4. 정렬 (빈도수 기준) 

5. db에 저장

<br />

🍀 전체 프로세스는 아래의 디렉토리에서 확인하실 수 있습니다.
```bash
├── crawler
│   └── parser
│      ├── url-extractor
│      ├── html-extractor
│      ├── text-extractor
│      ├── word-extractor
│      ├── hash-extractor
│      ├── dictionary-validator
│      ├── level-seperator
│      └── en-ko-connector
```

------------------

### 작동 모습

### Version 1 🥚

1. 로그인                              

   <details><summary>(✈️ 보기) </summary><div markdown="1">       
   <image src="https://user-images.githubusercontent.com/78193416/208283144-4e1db15f-6b71-496e-a027-9e22ea3af668.gif"></image>
   </div></details>
   
 
2. 학습할 기술 선택  및 내 단어장에 저장 

   <details><summary>(✈️ 보기) </summary><div markdown="1">
   <image src="https://user-images.githubusercontent.com/78193416/208285706-396b8236-7413-4fa1-899b-50c2424108ea.gif"></image>
   </div></details>              

3. 레벨별 단어 학습 및 퀴즈

   <details><summary>(✈️ 보기) </summary><div markdown="1">       
       <image src="https://user-images.githubusercontent.com/78193416/208285807-3ec6c14b-31a8-430e-903a-eb5c5831aafc.gif"></image>
       </div></details>   

4. 저장한 단어장 확인

   <details><summary>(✈️ 보기) </summary><div markdown="1">       
       <image src="https://user-images.githubusercontent.com/78193416/208286224-2bdbce12-e0d9-4469-b234-505803b97d8a.gif"></image>
       </div></details>

5. 내 단어장 학습

   <details><summary>(✈️ 보기) </summary><div markdown="1">       
       <image src="https://user-images.githubusercontent.com/78193416/208286387-4658bccc-a8f0-4953-b732-bef904bd2736.gif"></image>
       </div></details>  

6. 내 단어장을 모아 나만의 퀴즈 실행     

   <details><summary>(✈️ 보기) </summary>
   <div markdown="1">       
       <image src="https://user-images.githubusercontent.com/78193416/208287382-3ef5e9d3-aa3d-443b-bd32-923fd20cd92a.gif"></image>
   </div>
   </details>  

7. 유저 정보 변경

   <details><summary>(✈️ 보기) </summary>
   <div markdown="1">       
       <image src="https://user-images.githubusercontent.com/78193416/208287943-fdfcbe33-3983-450b-b7f7-357927251b6a.gif"></image>
   </div>
   </details>  
   
 ### Version 2 🐣
 
1. 둘러보기 
         
   <details><summary>(✈️ 보기) </summary>
   <div markdown="1">
      <image src="https://github.com/mahwin/pre-programming/assets/78193416/05926116-cd2f-45f2-bcbf-46f5396375ef"></image>
   </div>
   </details>  

2. 검색어 자동 완성

   <details><summary>(✈️ 보기) </summary>
   <div markdown="1">
      <image src="https://github.com/mahwin/pre-programming/assets/78193416/8986fbfc-5450-4bd5-b825-c502ce2104ce"></image>
   </div>
   </details>  


-----------------------

### 기술 스택

![NEXT.JS](https://img.shields.io/badge/-Next.js-000000?style=for-the-badge&amp;logo=Next.js&amp;logoColor=white)
![REDUX](https://img.shields.io/badge/-Redux-764ABC?style=for-the-badge&amp;logo=Redux&amp;logoColor=white)
![REDUX-SAGA](https://img.shields.io/badge/-Redux--Saga-999999?style=for-the-badge&amp;logo=Redux-Saga&amp;logoColor=white)
![FRAMER-MOTION](https://img.shields.io/badge/-Framer--Motion-6700ed?style=for-the-badge&amp;logo=FramerMotion&amp;logoColor=white)
![AXIOS](https://img.shields.io/badge/-AXIOS-5A29E4?style=for-the-badge&amp;logo=AXIOS&amp;logoColor=white)
![Styled-components](https://img.shields.io/badge/-Styled--components-DB7093?style=for-the-badge&amp;logo=styledcomponents&amp;logoColor=white)
![NEST.JS](https://img.shields.io/badge/-Nest.js-E0234E?style=for-the-badge&amp;logo=NestJs&amp;logoColor=white)
![MYSQL](https://img.shields.io/badge/-Mysql-4479A1?style=for-the-badge&amp;logo=Mysql&amp;logoColor=white)
![PRISMA](https://img.shields.io/badge/-Prisma-2D3748?style=for-the-badge&amp;logo=Prisma&amp;logoColor=white)
![DOCKER](https://img.shields.io/badge/-DOCKER-2496ED?style=for-the-badge&amp;logo=DOCKER&amp;logoColor=white)
![heroku](https://img.shields.io/badge/-Heroku-430098?style=for-the-badge&amp;logo=Heroku&amp;logoColor=white)
![AWS](https://img.shields.io/badge/-aws-232F3E?style=for-the-badge&amp;logo=amazonaws&amp;logoColor=white)


---------------

### 세부 사항

🎨 디자인 및 애니메이션 : framer-motion, styled-componenets, 디자인 (codepen 차용)

📦 상태 관리 : 

* redux로 전역 상태를 관리
* redux-saga로 비동기적으로 api 요청 
  * 데이터 없으면 api 콜, 있으면 그대로 사용
* dark mode 값은 _app.js 에서 관리 ( _app.js는 next.js 앱이 빌드될 때 모든 컴포넌트를 감싸고 있음)

👮🏻‍♀️ Form 검증 : react-hook-form과 정규식 사용

👨🏻‍🌾 URL 구조 : 

 *  next.js 프레임워크는 pages 폴더 안의 폴더 구조가 그대로 url 주소에 반영됨
 *  폴더 구조와 다른 url로 접속시 404page로 이동
 *  인증 없이 인증이 필요한 페이지 접속 시 로그인 화면으로 이동

🤖 ORM : prisma 사용

💾 Database : vitess 사용 

 * mysql과 호환되는 데이터 베이스
 * ps scale 서비스를 이용하면 별다른 설정 없이 db 연결이 가능 (url을 통해서 연결하기에 port, hostname, password 등이 필요 없음)

🚪 로그인 :

1. 클라이언트 단에서 phone number를 검증 후 서버로 넘겨주면 데이터 베이스에 phone number가 저장되어 있는지 확인
   * 없을 경우 user table에 phone number 저장
  
2. 6 자리 무작위 수(token)를 SMS로 발신, user table의 phone number와 일치하는 id와 앞에서 만든 무작위 수를 token table에 저장
   *  SMS 발신 sendgrid 사용

3. 유저가 서버로 보낸 토큰 값과 token table에 저장된 값이 일치한지 확인
   * 일치할 경우  
     1. 일치하면 token table에서 현재 phone number를 값으로 가진 모든 토큰들 중 일치한 토큰만 남기고 나머지는 삭제(여러번 인증 요청 했을 경우 대비)
     2. 일치하는 유저 정보를 JWT로 변환해 HTTP Header에 포함 후 응답함
     3. 서버 응답 중 JWT 값을 local storage에 저장후 인증에 사용
   * 불일치할 경우
     1. 불일치하면 401에러 응답


🔑 인증 :

 * _app.js에서 local storage에 JWT 값이 있는지 확인 후 존재하면, 서버와 api 통신을 할 때 요청 헤더의 Authorization 필드에 담아서 보냄 (type은 bearer)

 *  인증이 필요한 페이지(내정보 변경, 내 단어장)에 접속 시 
    *  local storage에 JWT 값이 없으면 로그인 페이지로 이동
    *  local storage에 JWT 값이 있을 경우
       *  페이지에서 사용할 정보가 redux에 저장 중이면 그대로 실행
       *  페이지에서 사용할 정보가 없다면 redux-saga로 비동기 api call 요청함
  
--------------

### 개발 계획

| 타임라인             | 추가 기능 | 세부 계획 |
| ----------------- | ---------------- | --------- |
| 2023.07.02        | 자동완성 기능   | 1. 단어 로드가 완료되면 트라이 자료구조에 영어 단어를 저장한다 <br/> 2. 유저가 찾는 단어와 가장 유사한 영어단어 8개를 보여준다 |                                  
| 2023.07.23         | 유저 경험 개선   | 1. 퀴즈 결과 데이터를 db로 관리한다. <br/> 2. 단어장 커스텀 기능을 추가한다 |
| 2023.08.31        | 반응형 웹 (모바일 및 테블릿)  | 1. 디스플레이 크기에 맞춘 UI를 개발한다 |

- 네이버 부스트 캠프 참여로 2023.07.11 ~ 2023.12.15 세부 계획 수행 X

 
--------------

### 배포

1차 배포 : Aws Elastic Beanstalk ( 30$/month = 1 loadBalancer 0.02$/1h ) 

2차 배포 : Heroku Deno(7$ / month) 

-----------

### 버전

1.0.0 

2.0.0 
  * 공개 아이디로 로그인 추가
  * 검색어 자동완성 추가
