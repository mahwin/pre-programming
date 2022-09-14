# Pre-programming Web for RFC

---

- MetaData
    - Timeline
        - Research   09-14 - 2022
        - Develope   09-21 - 2022
        - Release      09-30 - 2022
    - Reference
        - developer road map
            
            [Developer Roadmaps](https://roadmap.sh/)
            
        - tailwind css
            
            [Documentation](https://tailwindui.com/documentation)
            
        - mind map svg
            
            [Sign up | Miro | Online Whiteboard for Visual Collaboration](https://miro.com/app/dashboard/)
            
        - image
            
            [Loose Drawing | 無料で商用利用可なフリーイラスト](https://loosedrawing.com/)
            
    - 개요
        - 특정 기술을 학습하는데 필요한 영어 단어를 사용자의 수준에 맞춰 제공한다.
        

---

- 목표
    1. 웹 앱 개발                       *priority 0*
    2. 사용자 유입 증가             *priority 1*

---

- 요구 사항
    - API 서버 구축
    - 페이지 구현
    - 추가 기능    (중요도 순으로 나열)
        1. meta 정보 추가 (seo)
        2. 오픈 graph 추가 (입소문)
        3. 개인 실력 테스트 기능 추가 
        4. 그룹 공부 기능 추가

---

- 개발
    - 핵심 목표
        1. 서비스가 더 많은 사용자에게 노출되도록 노력한다.
        2. 서비스 매력을 증진 시킨다.
    - 적정 기술
        - SEO
        - 사용자 편의
            - 속도
                1. web vitals 
                    
                    [Web Vitals](https://web.dev/i18n/ko/vitals/)
                    
            - 모바일 친화성
                
                  1.  google test
                
                [Mobile-Friendly Test - Google Search Console](https://search.google.com/test/mobile-friendly?hl=ko)
                
            - UX
                
                  1.  [google](https://analytics.google.com/analytics/web/) analytics (로그를  통한 유저 반응 확인)
                
                [Redirecting...](https://analytics.google.com/analytics/web/)
                
    - 위험요소
        - 즉시 수정 필요
        - 차후 수정 필요
    - 솔루션
        - Back-end
            - Node.js
                - nest.js
                    
                    
                    | 평가 항목 | 점수 (5점 만점) |
                    | --- | --- |
                    | 커뮤니티 (npm 주간 다운로드 수) | 5 (1,661,962) |
                    | 아키텍처 | 5 (mvc 패턴) |
                    | 학습 비용(개인) | 3  (express.js 기반) |
                    - Reference
                        
                        [우리가 NestJS를 사용해야하는 이유](https://nemne.tistory.com/m/26)
                        
        - Front-end
            - React
                - next.js
                    
                    
                    | 평가 항목 | 점수 (5점 만점) |
                    | --- | --- |
                    | 커뮤니티 (npm 주간 다운로드 수) | 5 (3,247,895) |
                    | 아키텍처 | 5 (파일 베이스 라우터 제공) |
                    | 학습 비용(개인) | 5 (react.js 기반,사용 경험 있음) |
            - CSS
                - Tailwind css
                    
                    
                    | 평가 항목 | 점수 (5점 만점) |
                    | --- | --- |
                    | 커뮤니티 (npm 주간 다운로드 수) | 5 (3 ,773,498) |
                    | 학습 비용(개인) | 5(사용 경험 있음) |
                    | 생산성 | 5 (개인,소규모) |
                    - Utility-First 컨셉을 가진 CSS 프레임워크이며, 다른 CSS 프레임워크와 다르게 자유로운 디자인이 가능하다. ClassName을 랜덤 생성해 이름 짓는 것에 대한 고민이 없으며, 빠르게 프로젝트를 CSS 코드를 생성가능하다. (소규모 프로젝트에 적합)