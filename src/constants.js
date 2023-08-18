export const commandList = [
  { commandName: "h", commandValue: "명령어 모음" },
  { commandName: "[번호] go", commandValue: "[번호] 페이지 이동" },
  { commandName: "t", commandValue: "초기 화면" },
  { commandName: "x", commandValue: "로그아웃 / 종료" },
  { commandName: "next", commandValue: "다음 페이지" },
  { commandName: "prev", commandValue: "이전 페이지" },
  { commandName: "new", commandValue: "글쓰기" },
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
