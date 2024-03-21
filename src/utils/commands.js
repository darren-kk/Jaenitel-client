export const toggleCommandList = (showCommandList, setShowCommandList) => ({
  execute() {
    setShowCommandList(!showCommandList);
  },
});

export const navigateToHome = (navigate, setShowMainDos) => ({
  execute() {
    setShowMainDos(true);
    navigate("/boards");
  },
});

export const setLogoutMessage = (setLabelMessage) => ({
  execute() {
    setLabelMessage("종료하고 로그인 화면으로 돌아가시겠습니까?");
  },
});

export const confirmDeletePost = (fetchDeletePost, postId, setCommand, setLabelMessage) => ({
  execute: async () => {
    await fetchDeletePost(postId);
    setCommand("");
    setLabelMessage("");
  },
});

export const confirmLogout = (fetchLogout, setCommand, setLabelMessage) => ({
  execute: () => {
    fetchLogout();
    setCommand("");
    setLabelMessage("");
  },
});

export const cancelCommand = (setCommand, setLabelMessage) => ({
  execute: () => {
    setCommand("");
    setLabelMessage("");
  },
});

export const setDeletePostMessage = (setLabelMessage, user, post, index) => ({
  execute() {
    if (user._id !== post[index].madeBy) {
      setLabelMessage("삭제 권한이 없습니다!");
    } else {
      setLabelMessage("해당 게시글을 삭제하시겠습니까?");
    }
  },
});

export const nextPage = (setCurrentPage, totalPage) => ({
  execute() {
    setCurrentPage((old) => (old === totalPage ? old : old + 1));
  },
});

export const previousPage = (setCurrentPage) => ({
  execute() {
    setCurrentPage((old) => (old === 1 ? old : old - 1));
  },
});

export const goBack = (navigate, pathLength) => ({
  execute() {
    if (pathLength === 2) {
      return;
    }

    navigate(-1);
  },
});

export const createNew = (navigate, setShowMainDos, setShowCreateChatRoomDos, setModalState, boardName, path) => ({
  execute() {
    if (["humor", "greetings", "free"].includes(boardName)) {
      setShowMainDos(false);
      navigate(`/boards/${boardName}/post/new`);
    } else if (path[2] === "messages") {
      setModalState({
        isOpen: true,
        messageId: "new",
      });
    } else if (path[2] === "chatrooms") {
      setShowCreateChatRoomDos(true);
    }
  },
});

export const editPost = (setShowMainDos, setLabelMessage, navigate, user, post, index, boardName, postId) => ({
  execute() {
    if (user._id === post[index].madeBy) {
      setShowMainDos(false);
      navigate(`/boards/${boardName}/post/${index}/${postId}/edit`);
    } else {
      setLabelMessage("수정 권한이 없습니다!");
    }
  },
});

export const controlVideo = (videoRef, action) => ({
  execute() {
    if (action === "play") {
      videoRef.current.play();
    } else if (action === "pause") {
      videoRef.current.pause();
    } else if (action === "stop") {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  },
});

export const navigateByCommand = (
  navigate,
  setCommand,
  setModalState,
  boardsNumberList,
  posts,
  messages,
  chatRooms,
  path,
  boardName,
) => ({
  execute: (command) => {
    const number = command.split("g")[0].trim();
    if (path[path.length - 1] === "boards") {
      navigate(`${boardsNumberList[number]}`);
      setCommand("");
      return;
    }

    if (["greetings", "free", "humor"].includes(boardName)) {
      navigate(`/boards/${boardName}/post/${number}/${posts[number].postId}`);
      setCommand("");
      return;
    }

    if (path[2] === "messages") {
      setModalState({
        isOpen: true,
        messageId: messages[number]?.messageId,
      });
      setCommand("");
      return;
    }

    if (path[2] === "chatrooms") {
      navigate(`/boards/chatrooms/${number}/${chatRooms[number]?.roomId}`);
      setCommand("");
      return;
    }
  },
});
