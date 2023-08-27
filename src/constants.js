export const commandList = [
  { commandName: "h", commandValue: "명령어 모음" },
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
