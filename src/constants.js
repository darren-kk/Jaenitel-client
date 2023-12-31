export const commandList = [
  { commandName: "h", commandValue: "명령어 모음 켜기/끄기" },
  { commandName: "[번호] go", commandValue: "[번호] 페이지 이동" },
  { commandName: "t", commandValue: "초기 화면" },
  { commandName: "b", commandValue: "뒤로 가기" },
  { commandName: "x", commandValue: "로그아웃 / 종료" },
  { commandName: "n", commandValue: "다음 페이지" },
  { commandName: "p", commandValue: "이전 페이지" },
  { commandName: "new", commandValue: "글 쓰기" },
  { commandName: "edit", commandValue: "글 수정" },
  { commandName: "delete", commandValue: "글 삭제" },
  { commandName: "play", commandValue: "동영상 재생" },
  { commandName: "pause", commandValue: "동영상 일시정지" },
  { commandName: "stop", commandValue: "동영상 중지" },
  { commandName: "방향키 위 아래", commandValue: "스크롤" },
  { commandName: "방향키 좌 우", commandValue: "동영상 볼륨" },
];

export const boardsNumberList = {
  1: "/boards/greetings",
  2: "/boards/messages",
  3: "/boards/chatrooms",
  11: "/boards/free",
  12: "/boards/humor",
  21: "/boards/special",
};

export const boardNames = {
  humor: "유머 게시판",
  messages: "쪽지",
  chatrooms: "실시간 대화방",
  free: "자유 게시판",
  greetings: "가입 인사",
  special: "special",
};

export const maxfileSizes = {
  imageContent: 5 * 1024 * 1024,
  videoContent: 50 * 1024 * 1024,
};

export const asciiArts = {
  errorOccured: `
 _____ ______ ______  _____ ______    _____  _____  _____  _   _ ______  _____ ______
|  ___|| ___ \\| ___ \\|  _  || ___\\   |  _  |/  __ \\/  __ \\| | | || ___ \\|  ___||  _  \\
| |__  | |_/ /| |_/ /| | | || |_/ /  | | | || /  \\/| /  \\/| | | || |_/ /| |__  | | | |
|  __| |    / |    / | | | ||    /   | | | || |    | |    | | | ||    / |  __| | | | |
| |___ | |\\ \\ | |\\ \\ \\ \\_/ /|  |\\ \\  \\ \\_/ /| \\__/\\| \\__/\\| |_| || |\\ \\ | |___ | |/  /
\\____/ \\_| \\_|\\_| \\_| \\___/ \\ _| \\_|  \\___/  \\____/ \\____/ \\___/ \\_| \\_|\\____/ |____/
  `,
  selfie: `
  XXXXXXXXXXXXXXXXXXXKK0000KXXXXXXXXXXXXXX
  XXXXXXXXXXXXXXKKKKKOxxddddkKXNXXXXXXXXXX
  XXXXXXXXXXK0xol::cc:;,''''',cxKNXXXXXXXX
  XXXXXXXX0xc'.    ..',,'....  .,o0XXXXXXX
  XXXXXXKd:'.    .',.........    .,xXNXXXX
  XXXXXXx,..   .;oxl'.....        .'xXNXXX
  KXXXXKo..   .cdOOd,..            .,ONNXX
  KXXXXXo.   .:xO00Ol.              .xNNNX
  KKXXXXx.   ,oxkkkxl.              .kNNNX
  KKKKXXKc  .,;:clcc;'....   .......lXNNNX
  KKKKXXO:.,;:,'',;'';;;'..'..;coo;:0NNNNN
  KKKKXXXxloc,,;,;d:':lc:;::;cdxxxldKNNNNN
  KKKKXXXKkdxdoccxOd::cloolcoxxxxxx0NNNNNN
  KKKKXXXX0xolcclolc:;,;:clooddddxOXNNXXXX
  KKKKKXXXOolc:lc:::::::c::cccllox0XNXXXXX
  KKKKKKXXOo::::lllc::::;:cccclldOXNXXXXXX
  KKKKKKKXXkolclollccccllllllllod0XXXXXXXX
  KKKKKKKXXXOoloddollooodolccclloloOXXXXXX
  KKKKKKKKXXX0xdxdddoooooolccccloo:lxOKXXX
  KKKKKKKKKKXX0xolcccccccc::::loddllodO00K
  KKKKKKKKKKK0Okxxlc::::;;;::loxxooodxkxkx
  OKKXXKKK000OkxOOxolccc:ccldkOxooddxOkodo
  OXK00Oo:ck0OOKNXKOkkkxxkk0K0kddddc;lollo
  KX0OK0l;lOOO0XWWNXXXXXKKKXXOdddxx,.;c:co`,
};
