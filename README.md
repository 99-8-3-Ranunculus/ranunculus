# Ranunculus
ranunculus 웹 개발 미니 프로젝트

---

프로젝트 시작일 22.07.11
프로젝트 종료일 22.07.11

---

### 프로젝트 소개

라넌큘러스 공방에서 원데이 클래스를 모집합니다
메인페이지에서 오늘의 날씨에 맞는 향수를 추천해줍니다.
user는 회원가입을 한 후 원하는 날짜를 선택하여 클래스 예약을 할 수 있습니다.
user는 강좌를 듣고 난 후엔 후기 글을 업로드 할 수 있습니다.

---

### 팀 구성
팀장 : 나소나<br>
팀원 : 하병노, 박진우, 김한빛

---

### 적용 기술
<div align=center>
<a href="https://developer.mozilla.org/ko/docs/Web/HTML">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
</a>
<a href="https://developer.mozilla.org/ko/docs/Web/CSS">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">
</a>
<a href="https://developer.mozilla.org/ko/docs/Learn/JavaScript">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
</a>
<a href="https://developer.mozilla.org/ko/docs/Glossary/jQuery">
  <img src="https://img.shields.io/badge/jquery-0769AD?style=for-the-badge&logo=jquery&logoColor=white">
</a>

<br>

<a href="https://www.mongodb.com/docs/manual/introduction/">
  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
</a>
<a herf="https://flask.palletsprojects.com/en/2.1.x/">
  <img src="https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=white">
</a>
<a herf="https://aws.amazon.com/ko/getting-started/">
  <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> 
</a>

<br>

<a herf="https://bulma.io/documentation/">
  <img src="https://img.shields.io/badge/Bulma-00D1B2?style=for-the-badge&logo=Bulma&logoColor=white">
</a>
<a herf="https://fontawesome.com/">
  <img src="https://img.shields.io/badge/fontawesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white">
</a>

<br>

<a herf="https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
</a>
<a herf="https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
</a>

</div>

---

### 디렉토리 구조
```bash
├── static
│   ├── css
│   │   └── style.css
│   ├── js
│   │   └── script.js
│   ├── favicon.ico
│   ├── loate.png
│   ├── logo.png
│   └── main_back.png
│
├── templates
│   ├──lib
│   │   ├── bottom.html
│   │   └── top.html
│   ├── index.html
│   ├── login.html
│   ├── reservation.html
│   └──  review.html
│
└── app.py
``` 

---

### 기능 table
|기능 |Method|URL|request|reponse|
|---|---|---|---|---|
|로그인|POST|/signin|{'id' : id, 'pw' : pw}	|
|회원가입|POST|/signup|{'id' : id, 'pw' : pw, 'name' : name}|가입 완료 메세지
|예약|POST|/reservation|{'class' : class, 'date' : date, 'person' : person}|클래스 예약 데이터
|예약 조회|GET|/reservation||클래스 예약 grid
|후기 작성|POST|/review/show|{'title' : title, 'contents' : contents}|작성 후기 데이터
|후기 조회|GET|/review/show|후기 리스트
