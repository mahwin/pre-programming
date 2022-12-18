<img width="1263" alt="스크린샷 2022-12-04 오후 7 34 24" src="https://user-images.githubusercontent.com/78193416/205485978-a63e1a6a-0129-49aa-bf35-56a2e982be2e.png">

# Pre-programming &nbsp;  [바로가기](http://http://www.pre-programming.com/)

## : What to do before you studying programming! 

--------------

**목차**

[1. 프로젝트 계획 이유](#프로젝트-계획-이유)

[2. 목표](#목표)

[3. 작동 모습](#작동-모습)

[4. 기술 스택](#기술-스택)

[5. 세부 사항](#세부-사항)

[6. 배포](#배포)

[7. 세부 사항](#세부-사항)

[8. 버전](#버전)

-------------


### 프로젝트 계획 이유  

개발자 관련 유튜브를 보던 중 아래와 같은 흥미로운 설문조사를 발견했습니다.

![IMG_B324941C660F-1](https://user-images.githubusercontent.com/78193416/205483487-15d7f9e0-3011-42fb-aaef-3f3290c9f864.jpeg)
 &nbsp; &nbsp; (출처 : https://www.youtube.com/@nomadcoders )

 위 설문조사를 통해 많은 사람들이 특정 프로그래밍 언어 보단 그 언어를 학습하는 데    

필요한 **영어**를 더 중요시 한다는 사실을 알았습니다. 이를 돕고자 특정 기술을 배울 때,   

 **먼저 알아야할 영어 단어 학습을 돕는 웹을 개발하게 됐습니다.

-----------

### 목표 

###  :  특정 기술을 배우는 데에 있어 효과적으로 영어 단어를 학습하도록 돕는 웹을 만들자!

1. **많은 사람들이 배우고자** 하는 기술을 제공 대상으로 할 것.    
2. 효과적인 학습을 위해, 학습하려는 기술 문서에 **자주 등장하는 영어 단어**를 우선 순위로 둘 것.   



### 1. 많은 사람들이 배우고자 하는 기술을 제공 대상으로 할 것.

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

### 2. 효과적인 학습을 위해, 학습하려는 기술 문서에 **자주 등장하는 영어 단어**를 우선 순위로 둘 것

위의 목적을 달성하기 위한 영단어 추출 프로세스

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

위 과정은 많은 부분이 생략된 프로세스이며 실제 프로세스는  아래 경로에서 확인 하실 수 있습니다.

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

## 작동 모습

1. 로그인                              

   <details><summary>(✈️보기) </summary><div markdown="1">       
   <image src="https://user-images.githubusercontent.com/78193416/208283144-4e1db15f-6b71-496e-a027-9e22ea3af668.gif"></image>
   </div></details>

2. 학습할 기술 선택  및 내 단어장에 저장 

   <details><summary>(✈️ 보기) </summary><div markdown="1">
   <image src="https://user-images.githubusercontent.com/78193416/208285706-396b8236-7413-4fa1-899b-50c2424108ea.gif"></image>
   </div></details>              

3. 레벨 별 단어 학습 및 테스트

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

6. 내 단어장을 모아 나만의 테스트 실행     

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

-----------------------

### 기술 스택

next, nest, redux, prisma, axios, vitess 

---------------

### 세부 사항

디자인 및 애니메이션 : framer-motion , styled-componenets , 퀴즈 디자인 (codepen 차용), 배너 디자인(codepen 차용) 

상태 관리 : 

* redux로 전역 상태를 관리

* redux-saga로 비동기적으로 api 콜
  * 데이터 없으면 api콜,  있으면 그대로 사용 (캐싱)
* dark mode 값은 _app 에서 관리 ( _app.js = next.js 앱이 빌드될 때 모든 컴포넌트를 감싸고 있음)

Form 검증 : react-hook-form 사용

URL 구조 :  next 프레임워크는 pages 폴더 안의 폴더 네임이 그대로 url 주소가 됨. 

 *	pages/vocas/index.js  이  www.example.com/vocas로 변경

ORM : prisma orm 사용

Database : vitess 사용

 * mysql과 호환되는 데이터 베이스
 * ps scale을 사용하면 별다른 설정 없이 db 연결이 가능 (url을 통해서 연결) -> port, hostname, password 등등 필요 없음

인증 문자 :

*  sendGrid 사용

로그인 :

1. 클라이언트 단에서 phone number를 입력하면 db에 저장되었는지 확인
2. db user table에 새로운 사용자로 저장
3. 6 자리 무작위 수(token)를 문자로 발신 , token table에 유저 id 와 token을 묶어서 저장
   * send grid 사용(문자 발신)
4. 다시 유저가 입력한 토큰과 token table에 저장한 값이 일치 확인 
   1. 일치하면 JWT를 header에 응답
   2. 불일치하면 401에러 응답
5.  header에 넣은 값을 local storage에 저장해 인증에 사용

인증 :

 * _app.js에서 local storage에 JWT 값이 있는지 확인 후 있으면 axios  common header로 설정
   * axios로 api call이 있으면 JWT 값이 항상 헤더에 붙어서 이동함

 *  인증이 필요한 페이지(내정보, 내 단어장)에 접속 시 
    *  local storage에 JWT 값이 없으면 로그인 페이지로 이동
    *  local storage에 JWT 값이 있을 경우
       *  페이지에서 사용할 정보가 redux에 저장 중이면 그대로 실행
       *  페이지에서 사용할 정보가 redux에 없으면 api call 

-----------



### 배포

1차 배포 : Aws Elastic Beanstalk ( 30$/month = 1 loadBalancer 0.02$/1h ) 

2차 배포 : Heroku (5$ / month)

--------------

### 버전

1.0.0 
