# 📺 JAENITEL

<p align="center">
  <img width="1000" alt="스크린샷 2024-01-18 오후 9 35 25" src="https://github.com/darren-kk/Jaenitel-client/assets/111283378/43d260c2-d7f5-4495-b191-ee150c791a88">
</p>
<br></br>

<p align="center">
   예전 PC 통신 시절 천리안, 하이텔, 나우누리 등의 프로그램을 <b>재해석 및 재구현 </b>한 웹 어플리케이션입니다. <br> <b>다양한 글과 사진, 동영상</b>을 게시판에 업로드 할 수 있으며, 쪽지와 실시간 대화방을 이용해 다른 사용자와 소통 할 수 있습니다.
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
- [Test-Coverage](#test-coverage)
- [Features](#features)
- [Challenges](#challenges)
  - [1. 그 시절 통신 프로그램 재현을 위한 노력](#1-그-시절-통신-프로그램-재현을-위한-노력)
    - [1-1. 마우스라는 하드웨어가 없던 시절, 어떻게 DOS창을 재현할까>](#1-1-마우스라는-하드웨어가-없던-시절-어떻게-dos-창을-재현할까)
    - [1-2. 좋지 않았던 통신환경, 어떻게 재현해야 할까?: 서버 지연 vs 클라이언트 렌더링](#1-2-좋지-않았던-통신환경-어떻게-재현해야-할까--서버-지연-vs-클라이언트-렌더링)
  - [2. 불편함이라는 테마 속 자연스러운 유저 경험을 위한 고민](#2-불편함이라는-테마-속-자연스러운-유저-경험을-위한-고민)
    - [2-1. 마우스의 사용이 너무 익숙한 브라우저 환경, 보다 나은 ux를 위한 고민은?](#2-1-마우스의-사용이-너무-익숙한-브라우저-환경-보다-나은-ux를-위한-고민은)
    - [2-2. 모두 다른 화면크기, 혹시 내 프로젝트 ui가 깨지진 않을까?](#2-2-모두-다른-화면크기-혹시-내-프로젝트-ui가-깨지진-않을까)
- [Issues](#issues)
  - [1. 실시간 통신을 위한 socket.io DB 쿼리는 어디에서?](#1-실시간-통신을-위한-socketio-db-쿼리는-어디에서)
  - [2. 배포 과정에서 겪었던 이슈들](#2-배포-과정에서-겪었던-이슈들)
    - [2-1. nginx 프록시 서버 파일 크기 제한](#2-1-nginx-프록시-파일-크기-제한)
    - [2-2. samesite 속성의 express 버전 문제](#2-2-samesite-속성의-express-버전-문제)
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

# Test-Coverage

- ### Client - 70%
- ### Server - 80%
  <br></br>

# Features

### 안내 페이지 및 로그인

<details><summary>🎬 preview</summary>
<p align="center">
  <img width="800px" src="https://github.com/darren-kk/Jaenitel-client/assets/111283378/98ac39e3-eb9f-47ad-954e-a95f72ede0e6">
</p>
</details>

- 최초 화면 접속 이후 모뎀 통신 사운드가 끝나면 로그인 페이지를 통해 **로그인 / 회원가입**
- 이메일 중복검사 및 이메일 형식에 맞게끔 **validation**
- 로그인 페이지 이후부턴 고증을 위해 마우스 사용이 제한되며 등장하는 **하단의 Dos를 통해 어플리케이션 전반의 조작이 가능.**

### 게시판

<details><summary>🎬 preview</summary>
<p align="center">
  <img width="800px" src="https://github.com/darren-kk/Jaenitel-client/assets/111283378/a86fce8d-2792-4c0a-8946-dd577fda1cd2">
</p>
</details>

- **각 페이지에 맞는** 명령어가 알맞게 등장 및 **안내 명령어** 입력으로 사용법 안내 가능
- **명령어 입력으로 게시글 조회, 생성, 수정, 삭제**가 가능.
- 게시글 생성시 기본은 텍스트 입력칸으로 시작하며 **사진과 동영상 첨부**가 가능.

### 쪽지 및 알림기능

<details><summary>🎬 preview</summary>
<p align="center">
  <img width="800px" src="https://github.com/darren-kk/Jaenitel-client/assets/111283378/d07986c3-7d06-40b3-9bd5-c982c67ecaca">
  <img width="800px" src="https://github.com/darren-kk/Jaenitel-client/assets/111283378/5fad723f-f900-4f8d-8b7b-9cdce8057999">
</p>
</details>

- 접속해 있는동안 다른 사용자로부터 쪽지가 온다면 모달창을 통해 **실시간 알림**이 전해짐.
- 받은 쪽지와 내가 보낸 쪽지함 확인이 가능
- 쪽지 작성시 기본은 텍스트 입력칸으로 시작하며 **사진과 동영상 첨부**가 가능.

### 실시간 대화방

<details><summary>🎬 preview</summary>
<p align="center">
  <img width="800px" src="https://github.com/darren-kk/Jaenitel-client/assets/111283378/f67694f3-3aef-48a1-b04d-e12a1e34806b">
</p>
</details>

- **실시간 대화방**에 입장하여 접속해 있는 사용자들과 대화가 가능.
- 현재 대화방에 입장해있는 **사용자의 목록**이 표시됨.
- 시스템 메시지를 통해 들어오고 나가는 사용자의 기록이 대화방에 생성됨
  <br></br>

# Challenges

## 1. 그 시절 통신 프로그램 재현을 위한 노력

### 1-1. 마우스라는 하드웨어가 없던 시절, 어떻게 DOS 창을 재현할까?

그 시절 통신 프로그램이 처음 등장했던 시기에는, 아직 마우스라는 하드웨어가 존재하기 이전이었습니다. 그로 인해 사용자들은 프로그램 내부의 **DOS 창**을 통해 명령어를 입력하고, 해당 명렁어를 통해 프로그램 전반을 조작하였습니다.

저의 어플리케이션 역시 위와 같은 기능의 재현을 위해 **input의 입력값**과 **React의 ref**를 활용하여 키보드만을 통해 프로그램 전체의 조작이 가능한 Dos창을 구현하였습니다.

DOS 창은 사용자의 키보드 입력에 따라 다음의 행동들을 해야 합니다.

- **명령어가 입력되고 Enter가 눌렸을때 특정 명령어에 대응하는 로직 실행**
- **사용자의 키보드 입력에 따라 스크롤 조절**

**명령어 입력 대응 로직**: input 창에서 Enter 키 입력 이벤트가 발생했을때, 해당 명령어에 대응하는 조건문을 통해 구현이 가능 했습니다.

```jsx
if (event.key === "Enter") {
  handleCommand();
}

// hanldeCommand함수 내부는 다음과 같이 조건문을 통해 동작합니다.

if (command === "h") {
  setShowCommandList(!showCommandList);
}

if (command === "x") {
  setLabelMessage("종료하고 로그인 화면으로 돌아가시겠습니까?");
}

if (command === "t") {
  setShowMainDos(true);
  navigate("/boards");
}
```

**스크롤 조절 기능**: `React의 ref`를 활용하여 구현이 가능했습니다.

> React automatically updates the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction) to match your render output, so your components won’t often need to manipulate it. However, sometimes you might need access to the DOM elements managed by React—for example, to focus a node, scroll to it, or measure its size and position. There is no built-in way to do those things in React, so you will need a _ref_ to the DOM node.

공식문서에선 `ref`에 대하여 위와 같이 설명합니다.
`React`에서는 `state`가 변할 때마다 컴포넌트가 리렌더링됩니다. 이러한 리렌더링 과정에서, `DOM`에 직접 접근하여 조작할 필요가 있을 때가 종종 있습니다.

- 특정 `DOM` 요소에 `focus`를 맞추는 경우.
- **스크롤**을 조절하는 경우.
- 요소의 크기와 위치를 측정해야 할 경우.

`React` 자체에서는 이러한 작업을 직접적으로 수행할 수 있는 방법을 따로 제공하지 않기 때문에, `DOM` 노드에 대한 직접적인 참조가 필요합니다. 이를 위해 저는 **React의 ref**를 활용 할 수 있었습니다.

저의 프로젝트에서는 React의 ref를 사용하여 **DOS 창** 내의 스크롤을 조절합니다.
사용자가 키보드 입력을 통해 페이지를 넘기거나, 상하로 내용이 긴 게시글, 메시지 내용이 많은 대화방 등을 열람할때, `ref`를 사용하여 해당 `DOM` 요소의 스크롤 위치를 조정함으로써 사용자 인터페이스의 효과적인 반응성을 유지합니다. 이를 통해, 마우스 없이도 키보드만으로 페이지 내의 내용을 효과적으로 탐색하고, 필요한 정보에 접근할 수 있도록 하였습니다.

```jsx
if (scrollRef) {
  if (event.key === "ArrowDown") {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollTop + 30,
      behavior: "smooth",
    });
  }

  if (event.key === "ArrowUp") {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollTop - 30,
      behavior: "smooth",
    });
  }
}
```

### 1-2. 좋지 않았던 통신환경, 어떻게 재현해야 할까? : **서버 지연 vs 클라이언트 렌더링**

오늘날 대부분의 웹 어플리케이션은 높은 하드웨어 기기들의 스펙과 빠른 통신속도를 기반으로 사용자에게 쾌적한 경험을 선사합니다.

그러나 저의 어플리케이션은 독특하게 이와 반대되는 부분을 고민했습니다. 좋지 않았던 통신환경을 재현하기 위해, **서버에서 데이터 전송에 인위적인 지연(재밍)**을 주는 방식과 **클라이언트 측에서 의도적으로 느린 렌더링**을 구현하는 두 가지 방법을 고려했습니다.

물론, 재현이라는 키워드 아래에선 예측 불가능하고 제어 가능성이 낮은 서버 지연 방식이 더 어울린다고 생각했지만 결국 어플리케이션의 테마는 **의도된 불편함을 재밌는 경험으로 승화 시키는것** 이었기 때문에 아래의 비교를 기준으로 클라이언트에서 느린 렌더링을 구현하였습니다.

| 기준          | 서버 지연                 | 클라이언트 느린 렌더링            |
| ------------- | ------------------------- | --------------------------------- |
| 제어 가능성   | 낮음 (외부 서버 의존)     | 높음 (내부 구현에 의존)           |
| 사용자 경험   | 불규칙하고 예측 불가능    | 일관되고 예측 가능                |
| 퍼포먼스 영향 | 전체 시스템에 영향        | 독립적인 클라이언트 영역에만 영향 |
| 구현 난이도   | 복잡 (네트워크 관리 필요) | 단순 (애니메이션 키프레임 활용)   |
| 커스터마이징  | 제한적                    | 유연하고 다양한 옵션 가능         |

클라이언트의 느린 렌더링을 구현하기 위하여 저는 CSS의 Animation KeyFrames와 함께 **`clip-path`** 및 **`polygon`** 속성을 활용했습니다.

- **clip-path**: 이 속성은 요소의 보여지는 부분을 결정합니다. `clip-path`를 사용하면 특정 모양으로 요소의 표시 영역을 '자를' 수 있습니다.
- **polygon**: `polygon` 함수는 다각형의 모양을 정의하여 `clip-path`에서 사용합니다. 이 함수는 다각형의 각 꼭짓점의 좌표를 백분율로 나타내며, 이를 통해 복잡한 클리핑 패스를 생성할 수 있습니다.

이 두 속성을 활용하여, 저는 요소가 마치 느린 인터넷 속도로 인해 상단부터 점진적으로 로딩되는 것처럼 보이는 애니메이션을 구현했습니다.

```jsx
drawFromTop: {
          "0%": { opacity: "100", clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)" },
          "5%": { clipPath: "polygon(0 0, 100% 0, 100% 5%, 0 5%)" },
          "10%": { clipPath: "polygon(0 0, 100% 0, 100% 10%, 0 10%)" },
          "25%": { clipPath: "polygon(0 0, 100% 0, 100% 25%, 0 25%)" },
          "50%": { clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" },
          "75%": { clipPath: "polygon(0 0, 100% 0, 100% 75%, 0 75%)" },
          "100%": { opacity: "100", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
        },

// 미리 정의한 해당 애니메이션 class
slideFadeInImage: "drawFromTop 6s steps(6) forwards",
```

<br>
<p align="center">
<img width="600" alt="스크린샷 2024-01-23 오전 1 09 30" src="https://github.com/Team-Dataface/DataFace-client/assets/111283378/60d2c86f-219c-4c59-abf4-ba62fb5483c8">
<p>

위의 애니메이션은 요소가 시간이 지남에 따라 상단에서 하단까지 점차적으로 나타나도록 구현되어 있습니다.
이 프로젝트를 통해, 사용자들은 과거의 기술적 제약을 체험하면서도 현대적인 기법을 통해 구현된 새로운 방식의 `ineratction`을 제공하고자 했습니다.

## 2. 불편함이라는 테마 속 자연스러운 유저 경험을 위한 고민

### 2-1. 마우스의 사용이 너무 익숙한 브라우저 환경, 보다 나은 UX를 위한 고민은?

웹 어플리케이션을 사용하는 사용자의 경험은 매우 중요합니다. 단순히 속도가 느리거나 버그가 없는 것을 넘어서, 사용자의 이용 흐름을 예측하고 편안함을 제공하는 것은 큰 과제입니다.

저의 어플리케이션은 일부러 불편함을 제공합니다. 그러나 이 불편함이 사용자에게 설득력 있게 다가가길 바랐습니다. 이를 위해, 불편함 속에서도 즐거움을 찾을 수 있는 방법에 대해 깊이 고민했습니다.

이러한 고민들이 프로젝트에 잘 녹아들 수 있도록 제가 고민한 부분은 다음과 같습니다.

- **안내 페이지로의 유도**: 초기 사용자들의 피드백을 바탕으로, 사용자가 어플리케이션의 컨셉을 쉽게 이해할 수 있도록 최초 홈페이지 진입 시 안내 페이지를 통해 전반적인 사용 흐름을 설명하는 방식을 채택했습니다. 이는 사용자가 불편함 속에서도 어플리케이션의 목적과 사용법을 자연스럽게 파악할 수 있도록 돕습니다.
  <br>
  <img width="600" alt="스크린샷 2024-01-23 오전 1 09 30" src="https://github.com/Team-Dataface/DataFace-client/assets/111283378/8293eea2-6fac-461c-8494-423ad276c68f">

- **자동 Focusing과 onClick Event**: 마우스 대신 키보드 중심의 조작 방식을 채택함으로써, 사용자가 명령어 입력에 더 자연스럽게 접근할 수 있도록 했습니다. 페이지 로딩 시 자동으로 명령어 입력 창에 포커스가 맞춰지며, 화면 어디를 클릭해도 다시 명령어 입력 창으로 돌아오는 방식을 구현했습니다. 이는 사용자가 새로운 조작 방식에 쉽게 적응할 수 있도록 돕습니다.

  ```jsx
  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === "k") {
        commandInputRef.current.focus();
      }
    }

    function handleOnClick() {
      commandInputRef.current.focus();
    }

    if (commandInputRef.current) {
      commandInputRef.current.focus();
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleOnClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleOnClick);
    };
  }, []);
  ```

- **유연한 명령어 입력 처리**: 사용자가 명령어를 빠르게 입력하는 과정에서 생길 수 있는 오류를 줄이기 위해, 명령어 입력의 유연성을 높였습니다. 예를 들어, 게시글 이동을 위해 "12 go"와 같은 명령어를 입력할 때 띄어쓰기 오류를 최소화하기 위해 입력 로직을 개선했습니다. 이러한 조정을 통해 사용자가 더욱 원활하게 어플리케이션을 사용할 수 있도록 유도 하였습니다.

```jsx
if (command.endsWith("go")) {
  const number = command.split("g")[0].trim();

  if (path[path.length - 1] === "boards") {
    navigate(`${boardsNumberList[number]}`);
    setCommand("");

    return;
  }
}
```

이러한 요소들은 사용자가 불편함을 경험하면서도 어플리케이션의 독특한 컨셉을 즐길 수 있도록 설계되었습니다. 사용자의 행동을 예측하고, 사용 경험을 향상시키기 위한 지속적인 고민과 노력이 녹아 들도록 노력했습니다. 이를 통해, 사용자들은 단순한 불편함 너머, 의도된 불편함을 통한 재미를 느끼길 기대했습니다.

### 2-2. 모두 다른 화면크기, 혹시 내 프로젝트 UI가 깨지진 않을까?

반응형 디자인과 데이터 최적화

현대 웹 어플리케이션에서 반응형 디자인은 필수적입니다. 사용자들은 다양한 화면 크기와 해상도를 가진 장치를 사용하므로, 이에 적절히 대응하는 UI 설계는 매우 중요합니다. 이를 위해, 클라이언트의 뷰포트(Viewport) 크기에 따라 게시글의 수를 조절하고, 서버에서 이에 맞추어 데이터를 제공하는 로직을 구현했습니다.

```jsx
useEffect(() => {
  const postHeight = 48; // 각 게시글의 높이

  // 뷰포트 크기에 따라 페이지당 게시글 수 조정
  const handleResize = () => {
    if (mainRef.current) {
      const mainHeight = mainRef.current.clientHeight;
      setPostsPerPage(Math.floor(mainHeight / postHeight)); // 전체 높이를 게시글 높이로 나누어 페이지당 게시글 수 계산
    }
  };

  window.addEventListener("resize", handleResize); // 창 크기 변경 시 핸들러 실행
  handleResize(); // 초기 설정

  return () => {
    window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 이벤트 리스너 제거
  };
}, [mainRef, setPostsPerPage]);
```

위 로직은 클라이언트의 화면 크기 변화에 따라 적절한 수의 게시글을 보여줍니다. 각 게시글의 높이를 고려하여, 사용 가능한 공간에 맞게 페이지당 표시할 게시글 수를 동적으로 조절합니다.

```jsx
// 게시글 데이터 가져오기
const skip = (parseInt(page) - 1) * parseInt(limit);
const totalPosts = await Post.countDocuments({ category: category });
const posts = await Post.find({ category: category })
  .populate("madeBy")
  .populate("contents")
  .sort("-createdDate")
  .skip(skip)
  .limit(parseInt(limit));

// 게시글 데이터에 인덱스 추가
const postsWithIndex = posts.map((post, index) => {
  return {
    _id: post._id,
    title: post.title,
    madeBy: post.madeBy,
    createdDate: post.createdDate,
    index: totalPosts - (skip + index),
  };
});

// 클라이언트에 데이터 전송
res.status(200).json({
  posts: postsWithIndex,
  totalPages: Math.ceil(totalPosts / parseInt(limit)),
  currentPage: parseInt(page),
});
```

위의 로직을 통해 클라이언트와 서버는 다음과 같은 흐름으로 데이터를 주고 받게 됩니다.

<img width="400" alt="스크린샷 2024-01-23 오전 2 13 55" src="https://github.com/Team-Dataface/DataFace-client/assets/111283378/b2248fa2-6dea-4719-9e29-fcabe6190695">

서버 측에서는 요청된 페이지와 페이지당 제한된 게시글 수에 따라 해당하는 게시글 데이터를 제공합니다. 클라이언트에서 계산된 게시글 수를 기준으로 서버에서는 필요한 만큼의 데이터만 전송하여, 네트워크 트래픽을 최적화하고 사용자 경험을 개선하고자 했습니다.

# Issues

### 1. 실시간 통신을 위한 Socket.io, DB 쿼리는 어디에서?

실시간 대화방의 채팅 기능 구현을 위해, 저는 Socket.io를 사용하여 서버와 클라이언트 간 통신을 구성했습니다. 사용자가 보낸 채팅은 서버를 거쳐 다른 사용자에게 전달되며, 모든 사용자가 채팅 내역을 볼 수 있도록 DB에 저장하는 방식으로 구현했습니다.

최초 생각했던 로직의 흐름은 아래와 같았습니다.

1. 클라이언트에서 서버로 소켓 이벤트 전송
2. 서버(소켓)에서 클라이언트 응답
3. 동시에 서버 내 소켓에서 DB에 메시지 저장

<img width="400" alt="스크린샷 2024-01-23 오전 3 46 39" src="https://github.com/darren-kk/Jaenitel-client/assets/111283378/7f7a15aa-704b-4c2f-b4af-a6d179ee6d9e">

그러나 이 방식은 소켓 이벤트의 빠른 처리와 DB 저장의 복잡성이 혼합되면서 성능 저하의 가능성을 내포하고 있었습니다. 실시간 응답을 요구하는 소켓 통신의 특성상, DB 저장 로직이 소켓 이벤트 처리 속도에 영향을 미칠 수 있었습니다.

이러한 가정을 검증하기 위해, 'artillery'라는 서버 과부하 테스트 라이브러리를 사용하여 실험을 진행했습니다. 실험은 다음과 같은 흐름으로 구성되었습니다:

- 소켓에 가상 사용자 입장
- 2분간 점진적으로 사용자 입장 및 채팅 이벤트 발생
- 3분간 추가 사용자 입장 및 퇴장

```yaml
scenarios:
  - engine: "socketio"
    flow:
      - emit:
          channel: "join-room"
          data:
            roomId: "Room123"
            message: "Joined Room123"
      - loop:
          - emit:
              channel: "send-chat"
              data:
                roomId: "Room123"
                message: "Chatting in Room123"
          - think: 1
        count: 5

      - emit:
          channel: "leave-room"
          data:
            roomId: "Room123"
            message: "Left Room123"
```

**실험 결과와 로직 변경**

실험 결과, 소켓 이벤트와 DB 저장 로직이 결합된 경우와 분리된 경우에서 응답 시간에 큰 차이를 발견했습니다. DB 저장 로직이 분리된 경우, 처리 속도가 약 650% 향상된 것을 확인했습니다.

<img width="800" alt="스크린샷 2024-01-23 오전 4 27 47" src="https://github.com/darren-kk/Jaenitel-client/assets/111283378/fe63080a-be50-41d2-b651-834bbe990f4a">

-> 기존 소켓과 DB fetching 로직이 **합쳐진** 형태 (최대 응답속도: 약 **12ms**)
<br></br>

<img width="800" alt="스크린샷 2024-01-23 오전 4 27 59" src="https://github.com/darren-kk/Jaenitel-client/assets/111283378/4455d0fa-0e9c-4fc7-94c1-1b19c6ac8791">

-> 기존 소켓과 DB fetching 로직이 **분리된** 형태 (최대 응답속도: 약 **2ms**)
<br></br>

이를 바탕으로, 다음과 같은 방식으로 로직을 변경했습니다:

1. 클라이언트에서 서버로 소켓 이벤트 전송
2. 클라이언트에서 별도의 POST 요청을 통해 서버로 메시지 전송
3. 서버(소켓)에서 클라이언트의 소켓 이벤트에 응답

<img width="400" alt="스크린샷 2024-01-23 오전 4 05 17" src="https://github.com/darren-kk/Jaenitel-client/assets/111283378/8d75cf56-49bf-43e2-9a72-ec0212726abf">

<br>

이 변경으로 실시간 통신의 빠른 반응성을 유지하면서도 DB 저장 역시 성취함으로, 성능과 효율성을 크게 향상시켰습니다.
프로젝트에서 성능 최적화를 위해 신중하게 로직을 검토하고, 실험을 통해 데이터 기반 결정을 내림으로, 가정 기반의 로직 변경이 아닌 보다 구체적이고 근거있는 방향성으로의 개선이 가능했습니다.

### 2. 배포 과정에서 겪었던 이슈들

### 2-1 nginx 프록시 파일 크기 제한

프로젝트에서는 사용자가 게시글과 쪽지에 사진 및 동영상을 첨부할 수 있습니다. 로컬 개발 환경에서는 문제 없이 작동하던 사진과 동영상 전송이 `Elastic Beanstalk`을 통해 배포한 환경에서는 문제가 발생했습니다.

> Failed to load resource: the server responded with a status of 413 (Request Entity Too Large)

클라이언트에서 서버로의 데이터 전송 중에 "413 Request Entity Too Large" 오류가 발생했는데, 이는 `Elastic Beanstalk`의 기본 프록시 설정인 `NGINX`에서 요청된 데이터의 크기가 너무 크기 때문이었습니다.

`Elastic Beanstalk`는 `NGINX` 또는 `Apache HTTPD`를 역방향 프록시로 사용합니다. 프록시 서버는 클라이언트와 서버 사이의 중개자 역할을 하며, 요청 및 응답을 처리하는데 중요한 역할을 합니다. `NGINX`는 특히 성능, 안정성, 간소한 구성으로 유명한 웹 서버이자 프록시 서버입니다.

NGINX의 기본 설정은 클라이언트로부터 넘어오는 데이터의 크기를 최대 1MB로 제한합니다. 사진과 동영상 전송에는 이보다 더 큰 데이터 크기가 필요하기 때문에, NGINX의 구성 파일을 수정하여 이 제한을 늘려야 했습니다.
<br>

```yml
client_max_body_size 50M
```

이 변경을 통해 클라이언트가 서버로 전송할 수 있는 최대 데이터 크기를 **50MB**로 증가시켰습니다. 이로써 사진과 동영상 첨부 기능이 원활하게 작동하게 되었습니다.

### 2-2 sameSite 속성의 express 버전 문제

배포 환경에서 서버에서 클라이언트로 전송된 쿠키가 제대로 설정되지 않는 문제가 발생했습니다. 특히, 사용자 인증에 있어서 중요한 부분을 차지하는 문제였기에 빠른 해결이 필요했습니다.

일단, 쿠키가 제대로 설정되지 않는 첫번째 이유는 `sameSite` 속성 때문이었습니다.

쿠키에서 `SameSite`속성은 브라우저가 쿠키를 어떻게 처리할지 정의하는 속성입니다.

**`SameSite`** 쿠키 속성에는 세 가지 주요 설정이 있습니다.

- `Strict`는 쿠키가 크로스 사이트 요청에선 전송되지 않습니다.
- `Lax`는 GET요청과 웹 페이지 이동에 한해서만 크로스 사이트 요청에 쿠키 전송을 허용합니다.
- `None`은 모든 크로스 사이트 요청에서 쿠키를 전송하도록 허용하지만 보안을 위해 이를 사용하려면 **`Secure`** 속성을 함께 사용해야만 합니다.

따라서, 이를 해결하기 위해 쿠키의 sameSite 옵션을 설정하려 하였지만 반복적으로 쿠키가 설정되지 않는 문제가 발생하였고 이는 express의 버전 문제였습니다.

최초 node.js 및 express 서버 환경을 설정할때, express-generator를 이용하였습니다. 이때의 express 버전은 4.16 버전으로 설정이 됩니다.

그러나 Express 4.16 버전에서는 이 속성을 지원하지 않았습니다.

이를 위해 express의 버전을 업그레이드해 클라이언트-서버 간 쿠키 전송 문제를 해결할 수 있었습니다.

```js
res.cookie("AccessToken", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
});
```

보안과 관련된 기능을 구현에 있어서 웹 표준이 권장하는 보안수준을 맞추는 것은 중요함을 깨달았습니다.
이를 위해 사용하는 프레임워크와 라이브러리의 최신 버전을 유지하는 것이 필수임을 배울 수 있는 값진 경험이었습니다.

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

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Tanstack Query](https://img.shields.io/badge/-Tanstack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![Jotai](https://img.shields.io/badge/Jotai-000?style=for-the-badge&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Socket.io](https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white)

### Server

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB & Mongoose](https://img.shields.io/badge/MongoDB%20&%20Mongoose-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![AWS S3](https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=%2361DAFB) ![Socket.io](https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white) ![JJWT](https://img.shields.io/badge/JWT-000?style=for-the-badge&logoColor=white)

### Deployment

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) ![AWS Elastic Beanstalk](https://img.shields.io/badge/AWS%20Elastic%20Beanstalk-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

**React-query**
<br>
어플리케이션 특성상 서버에서 자주 데이터를 가져올거란 예상 및 서버와 클라이언트의 상태를 분리하기 위하여 사용했습니다.
또한, 리액트 쿼리의 캐싱기능을 이용하여 자주 바뀌지 않으리라 예상되는 게시글을 캐싱함으로, 서버에 요청을 보내는 빈도수를 줄이기 위하여 사용하였습니다.

**joati**
<br>
하단의 DOS 컴포넌트를 통하여 다른 컴포넌트의 상태를 빈번하게 수정해주어야 했는데, 원할하게 상태를 관리하기 위해선 상태관리 라이브러리의 필요성이 높다고 판단했습니다.
`Redux`, `Justand` 등 스토어 기반의 상태관리 라이브러리를 최초 생각했으나, 서버 상태를 react-query가 관리해주고 있기에 클라이언트의 상태는 보다 간결한 디자인 패턴으로 관리하는게 좋겠다고 판단 했습니다.
이에 따라 atom으로 상태를 관리하는 `jotai`를 선택 했으며, 컴포넌트 별로 jotai의 읽기 전용 혹은 쓰기 전용 atom을 활용하여 상태를 관리하였습니다.

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
