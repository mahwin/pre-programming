<img width="1263" alt="스크린샷 2022-12-04 오후 7 34 24" src="https://user-images.githubusercontent.com/78193416/205485978-a63e1a6a-0129-49aa-bf35-56a2e982be2e.png">

# Pre-programming

## : What to do before you studying programming! 

--------------

**목차**

[1. 프로젝트 계획 이유](#프로젝트-계획-이유)

[2. 목표](#목표)

[3. 작동 모습](#작동-모습)

[4. 기술 스택](#기술-스택)

[5. 세부 사항](#세부-사항)

[6. 버전](#버전)

-------------


### 프로젝트 계획 이유  

개발자 관련 유튜브를 보던 중 아래와 같은 흥미로운 설문조사를 발견했습니다.

![IMG_B324941C660F-1](https://user-images.githubusercontent.com/78193416/205483487-15d7f9e0-3011-42fb-aaef-3f3290c9f864.jpeg)
 &nbsp; &nbsp; &nbsp;(출처 : https://www.youtube.com/@nomadcoders )

 본 설문조사를 통해 많은 사람들이 특정 프로그래밍 언어 보단 그 언어를 학습하는 데    

필요한 **영어**를 더 중요시 한다는 사실을 알았고, 이를 돕고자  특정 기술을 배울 때,   

 **먼저 알아야할 영어 단어 학습**을 돕는 웹을 개발하게 됐습니다.

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



1. 로그인                               &nbsp;&nbsp;(:airplane: 바로가기)
2. 학습할 기술 선택                       &nbsp;&nbsp;(:airplane: 바로가기)
3. 레벨 별 단어 학습 및 테스트               &nbsp;&nbsp;(:airplane: 바로가기)
4. 내 단어장에 저장                       &nbsp;&nbsp;(:airplane: 바로가기)
5. 저장한 단어장을 모아 나만의 테스트 실행      &nbsp;&nbsp;(:airplane: 바로가기)
6. 전체                                 &nbsp;&nbsp;(:airplane: 바로가기)

-----------------------

### 기술 스택
next, nest, redux, redux-saga, styled-componenets

---------------

### 세부 사항

--------------

### 버전


