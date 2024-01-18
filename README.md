# 📺 JAENITEL

<img width="1440" alt="스크린샷 2024-01-18 오후 9 35 25" src="https://github.com/darren-kk/Jaenitel-client/assets/111283378/43d260c2-d7f5-4495-b191-ee150c791a88">

<p align="center">
   예전 PC 통신 시절 천리안, 하이텔, 나우누리 등의 프로그램을 재해석 및 재구현한 웹 어플리케이션입니다. <br></br> 다양한 글과 사진, 동영상을 게시판에 업로드 할 수 있으며, 쪽지와 실시간 대화방을 이용해 다른 사용자와 소통 할 수 있습니다.
</p>

# **🔗 Links**

<p align="center">
  <a href="https://web.jaenitel.com">Deployed website</a>
  <span> | </span>
  <a href="https://github.com/darren-kk/Jaenitel-client">Frontend Repository</a>
  <span> | </span>
  <a href="https://github.com/darren-kk/Jaenitel-server">Backend Repository</a>
</p>

<br></br>

# Table of Contents

- [Motivation](#motivation)
- [Preview](#preview)
- [Test-Coverage](#test-coverage)
- [Features](#features)
- [Challenges](#challenges)
- [Schedule](#schedule)
- [Repository-Link](#repository-link)
- [Tech-Stacks](#tech-stacks)
- [Memoir](#memoir)
  <br></br>

# Motivation

저는 평소에 음악을 굉장히 좋아합니다. 단순 음악에 그치지 않고 음악을 듣는 계기, 장소, 기기, 등 다양한 요소들에 따라 다르게 들리는 음악을 좋아합니다.
<br>
우연한 계기로 LP를 통해 음악을 처음 들었던 날, 그 매력에 깊이 빠져 조금씩 LP를 사모으는 취미도 생겼습니다.
<br></br>
근데 이 LP가 실제로 들으려면 굉장히 **불편합니다**.
<br></br>
듣기 위해선 준비물도 많고, 직접 플레이어에 판을 올리고 바늘을 얹어 주어야 하며 한바닥이 다 돌고나면 판도 뒤집어 주어야 나머지를 들을 수 있습니다.
<br>
하지만 복잡한 과정을 거친 탓인지, 그 과정 끝에 듣는 음악은 **무언가 더 특별한 기분이 듭니다.**
<br>
결과물을 돋보이게 해주는 과정이라 생각하면 그 과정도 굉장히 즐거워집니다.
<br></br>
**제 프로젝트는 이 불편한 과정에서 시작 되었습니다.**
<br></br>
하루가 다르게 빨라지고 좋아지는 성능들 속에서, **의도적으로 사용자에게 불편함을 주면** 굉장히 매력적이지 않을까?
<br>
LP를 통해 불편한 과정을 거쳐 음악을 듣는것 처럼,
<br>
**주어진 불편함에 타당한 근거가 있다면 사용자도 불편함을 되려 즐겁게 느끼고 결과물을 더욱 즐길 수 있지 않을까?**
<br></br>
**_그렇게 저는 불편함 속에서 즐거움을 찾기 위해 예전 PC통신을 재해석한 프로젝트를 시작하게 되었습니다._**
<br></br>

# Preview

### 최초 접속화면

![Sep-04-2023 16-54-39](https://github.com/darren-kk/Jaenitel-client/assets/111283378/98ac39e3-eb9f-47ad-954e-a95f72ede0e6)

### 로그인 - 게시판

![Sep-04-2023 16-49-15](https://github.com/darren-kk/Jaenitel-client/assets/111283378/a86fce8d-2792-4c0a-8946-dd577fda1cd2)

### 실시간 대화방

![Sep-04-2023 16-49-50](https://github.com/darren-kk/Jaenitel-client/assets/111283378/f67694f3-3aef-48a1-b04d-e12a1e34806b)

### 쪽지

![Sep-04-2023 16-50-39](https://github.com/darren-kk/Jaenitel-client/assets/111283378/d07986c3-7d06-40b3-9bd5-c982c67ecaca)

### 쪽지 알림

![스크린샷 2023-09-04 오후 4 27 56](https://github.com/darren-kk/Jaenitel-client/assets/111283378/5fad723f-f900-4f8d-8b7b-9cdce8057999)
<br></br>

# Test-Coverage

- ### Client - 70%
- ### Server - 80%
  <br></br>

# Features

- 최초 화면 접속 이후 모뎀 통신 사운드가 끝나면 로그인 페이지를 통해 **로그인 / 회원가입**
- 로그인 페이지 이후부턴 고증을 위해 마우스 사용이 제한되며 등장하는 **하단의 Dos를 통해 어플리케이션 전반의 조작이 가능.**
- **명령어 입력으로 게시글 조회, 생성, 수정 삭제**가 가능.
- 게시글과 쪽지에 **사진과 동영상 첨부**가 가능.
- 접속해 있는동안 다른 사용자로부터 쪽지가 온다면 모달창을 통해 **실시간 알림**이 전해짐.
- **실시간 대화방**에 입장하여 접속해 있는 사용자들과 대화가 가능.
  <br></br>

# Challenges

- ### 1. 마우스라는 하드웨어가 없던 시절, 어떻게 DOS 창을 재현할까?
  - input
  - ref 와 jotai
- ### 2. 모두 다른 화면크기, 혹시 내 프로젝트 UI가 깨지진 않을까?
  - 반응형을 구현하기 위한 계산
  - 서버에서 이에 걸맞게 전해주기 - 오가는 데이터의 양을 조절하여 최적화
- ### 3. 오디오는 왜 자동재생이 불가능할까?
  - 브라우저 정책상의 미디어 객체 사용자 인터렉션
- ### 4. 좋지 않았던 통신환경, 어떻게 재현해야 할까?
  - 서버에서 재밍 vs 클라이언트에서 느리게 렌더링
  - 애니메이션 키프레임을 이용한 렌더링 구현
- ### 5. 사진과 동영상 파일을 인식하지 못하는 이슈
  - base64 vd formData -> multer
- ### 6. 실시간 통신을 위한 소켓.io, DB 쿼리는 어디에서?
  - 내부 vs 외부
  - artillery를 통한 과부하 테스트 및 측정.. 결과는?!
- ### 7. 커스텀 훅을 통한 API요청
  - 재사용성을 늘리기 위한 API 요청 함수들의 custom Hook 화
- ### 8. 마우스의 사용이 너무 익숙한 브라우저 환경, 보다 나은 UX를 위한 고민은?
  - window.click add event listener, 자동 focus
  - 최초 접속 시 안내 페이지를 통해 유저에세 어플리케이션의 컨셉과 기능을 제시
- ### 9. 배포 과정에서 겪었던 이슈들
  - nginx 프록시 파일 크기 제한
  - sameSite 속성의 express 버전 문제
    <br></br>

# Schedule

### 프로젝트 기간: 2023.08.07(월) ~ 2023.08.25(금)

<br>

#### 1 주차: 아이디어 선정, POC, [목업](https://www.figma.com/file/4oRUfZblOdLRIKUtE0hyfS/Untitled?type=design&node-id=0%3A1&mode=design&t=eFBC6XqVhYXZKVvz-1) 및 [DB스키마](https://lucid.app/lucidchart/ebf98c93-3fc9-4fd7-b459-cbc2df4933aa/edit?invitationId=inv_b91dd44b-6d1a-479c-b098-a935f25b0d99&page=0_0#) 설계

<br>

#### 2 ~ 3주차: 클라이언트 구현 및 서버 구현

<br></br>

# Repository-Link

[Jaenitel - Client](https://github.com/darren-kk/Jaenitel-client)
<br></br>
[Jaenitel - Server](https://github.com/darren-kk/Jaenitel-server)
<br></br>

# Tech-Stacks

### Client

- react
- react-query
- jotai
- tailwind
- socket.io

**Reac-query**
<br>
어플리케이션 특성상 서버에서 자주 데이터를 가져올거란 예상 및 서버와 클라이언트의 상태를 분리하기 위하여 사용했습니다.
또한, 리액트 쿼리의 캐싱기능을 이용하여 자주 바뀌지 않으리라 예상되는 게시글을 캐싱함으로, 서버에 요청을 보내는 빈도수를 줄이기 위하여 사용하였습니다.

**joati**
<br>
하단의 DOS 컴포넌트를 통하여 다른 컴포넌트의 상태를 빈번하게 수정해주어야 했는데, 원할하게 상태를 관리하기 위해선 상태관리 라이브러리의 필요성이 높다고 판단했습니다.
`Redux`, `Justand` 등 스토어 기반의 상태관리 라이브러리를 최초 생각했으나, 서버 상태를 react-query가 관리해주고 있기에 클라이언트의 상태는 보다 간결한 디자인 패턴으로 관리하는게 좋겠다고 판단 했습니다.
이에 따라 atom으로 상태를 관리하는 `jotai`를 선택 했으며, 컴포넌트 별로 jotai의 읽기 전용 혹은 쓰기 전용 atom을 활용하여 상태를 관리하였습니다.

### Server

- node.js
- express.js
- MongoDB
- mongoose
- AWS S3
- socket.io
- multer
- JWT

**MongoDB**
<br>
프로젝트 기획단계에서 최초 스키마의 구조를 설계하고 개발에 진입 하였으나, 개발 도중 추가 혹은 줄어드는 기능이 있으리라 예측하였고, 이에 따라 보다 다양하게 구조의 설계가 가능한 비관계형 DB를 고려하게 되었습니다.
<br>
실제, 게시글 등의 다양한 contents를 추가하는데에 있어서, 각 contents별 `sub-schema`를 활용하여 구조를 설계 하였는데, 이때 `sub-schema`를 참조하기 위하여 MongoDB의 `ref`속성으로도 충분히 구현이 가능하다고 판단하여 MongoDB를 선택했습니다.
<br>
여기에 더하여, 추후 게시글에 조회수, 댓글 등의 기능을 추가하면 좋겠다라는 계획을 하고 있는데 이떄, MongoDB를 통하여 자유로운 확장을 기대하고 있습니다.

**JWT**
<br>
`firebase`, `passport` 등의 라이브러리를 통해 소셜 로그인을 구현할 수도 있었지만, 어플리케이션의 색깔은 소셜 로그인과는 다소 어울리지 않는다고 판단했습니다.
<br>
이에 따라 직접 local 로그인을 구현하기 위하여 JWT와 쿠키를 통한 로그인을 구현하였습니다. 보안적인 측면에서 JWT 기반의 인코딩된 토큰을 통해 클라이언트와 서버는 쿠키를 주고 받고 있으며, 해당 쿠키가 탈취 되어도, 비밀번호는 한번 더 bcrpyt로 인코딩 되어 저장되기 때문에 안전하리라고 판단 하였습니다.

<br></br>

# Memoir

약간은 오래되고 아날로그한 요소들을 좋아하고 즐기는 저에겐 굉장히 즐거운 과정이자 프로젝트 였습니다.
<br>
아쉽게도 고증에 있어서 실제 피시통신을 사용해보지 못하고 참고할만한 자료들도 많지 않았기에 디테일한 측면에서 부족한 부분이 있진 않을까 생각이 듭니다.
<br></br>
프로젝트 자체에서 의도적인 불편함을 주기 위해선 최우선적으로 불편함 없이 최적화되는 과정이 앞서야 한다고 생각했습니다.
<br>
덕분에 그런 측면에서 많은 고민들이 프로젝트 개발 내내 함께 했는데, 그런 고민들이 잘 녹아 들게끔 개발하는 과정은 꽤나 값진 경험이었습니다.
<br>
특히, 당연하게 사용하던 마우스 없이 어플리케이션 전체를 조작 가능하게끔 하는것은 기능적인 측면에서만이 아닌 사용자 경험과도 밀접하게 관련이 있어 그 부분들에 많은 신경을 써 개발 하였습니다.
<br></br>
불편하지만 자연스럽고, 과정이 짜증나지 않기 위해 고려한 요소들이 잘 전달 되었으면 좋겠습니다.
<br>
앞으로도 지속적으로 다양한 기능들을 추가하여 보다 나은 어플리케이션으로 발전시키고 싶단 욕심이 생깁니다.
<br></br>
누군가에겐 신선하고 새로운 경험을, 또 누군가에겐 그립고 동시에 반가운 경험을 전달 할 수 있는 프로젝트가 되었으면 합니다.
<br>
감사합니다.
<br>

- 김재환: <rlawoghks10@gmail.com>
