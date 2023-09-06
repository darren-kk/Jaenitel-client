import { render, screen, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChatRoom from "../../pages/ChatRoom";
import { userAtom } from "../../atoms/userAtom";
import { scrollRefAtom } from "../../atoms/refAtoms";

const mocks = vi.hoisted(() => {
  return {
    setScrollRef: vi.fn(),
    mockChatRoom: {
      _id: "123",
      title: "Test Chat Room",
      users: [
        { _id: "user1", nickname: "User One" },
        { _id: "user2", nickname: "User Two" },
      ],
      chats: [
        { _id: "chat1", writer: { _id: "user1", nickname: "User One" }, content: "Hello!", isSystem: false },
        { _id: "chat2", writer: {}, content: "User Two has joined.", isSystem: true },
      ],
    },
    mockSocket: {
      on: vi.fn(),
      emit: vi.fn(),
      off: vi.fn(),
      disconnect: vi.fn(),
    },
  };
});

vi.mock("../../components/ChatRoomDos", () => ({
  default: () => {
    return <div data-testid="chatroom-dos">ChatRoomDos</div>;
  },
}));

vi.mock("react-router-dom", () => ({
  useParams: () => ({ roomId: 123 }),
}));

vi.mock("../../apis/axios", () => ({
  default: () => ({
    data: { chatRoom: mocks.mockChatRoom },
  }),
}));

vi.mock("@tanstack/react-query", async () => {
  const actualReactQuery = await vi.importActual("@tanstack/react-query");

  return {
    ...actualReactQuery,
    useQuery: (key) => {
      if (key[0] === "chatRoom" && key[1] === 123) {
        return {
          data: mocks.mockChatRoom,
          error: null,
        };
      }
    },
  };
});

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useAtomValue: (atom) => {
      if (atom === userAtom) {
        return { _id: "user1", nickname: "User One" };
      }

      return actualJotai.useAtomValue(atom);
    },
    useSetAtom: (atom) => {
      if (atom === scrollRefAtom) {
        return mocks.setScrollRef;
      }

      return actualJotai.useSetAtom(atom);
    },
  };
});

vi.mock("socket.io-client", () => ({
  default: () => {
    return mocks.mockSocket;
  },
}));

const queryClient = new QueryClient();

describe("ChatRoom Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders chat room details correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChatRoom />
      </QueryClientProvider>,
    );

    expect(screen.getByText("실시간 대화방")).toBeInTheDocument();
    expect(screen.getByText("방 이름: Test Chat Room")).toBeInTheDocument();
    expect(screen.getByText("참여인원: 2")).toBeInTheDocument();
    expect(screen.getByText("User One")).toBeInTheDocument();
    expect(screen.getByText("User Two")).toBeInTheDocument();
  });

  it("displays chat messages correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChatRoom />
      </QueryClientProvider>,
    );

    expect(screen.getByText(">> User One: Hello!")).toBeInTheDocument();
    expect(screen.getByText(">> SYSTEM: User Two has joined.")).toBeInTheDocument();
  });

  it("joins the room on mount and leaves on unmount", async () => {
    act(() => {
      render(
        <QueryClientProvider client={queryClient}>
          <ChatRoom />
        </QueryClientProvider>,
      );
    });

    await waitFor(() => {
      expect(mocks.mockSocket.emit).toHaveBeenCalledWith("join-room", expect.any(Object));
    });

    act(() => {
      render(null);
    });

    expect(mocks.mockSocket.emit).toHaveBeenCalledWith("leave-room", expect.any(Object));
    expect(mocks.mockSocket.off).toHaveBeenCalledWith("new-chat");
    expect(mocks.mockSocket.disconnect).toHaveBeenCalled();
  });

  it("listens for user-joined, user-left, and new-chat events", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChatRoom />
      </QueryClientProvider>,
    );

    expect(mocks.mockSocket.on).toHaveBeenCalledWith("user-joined", expect.any(Function));
    expect(mocks.mockSocket.on).toHaveBeenCalledWith("user-left", expect.any(Function));
    expect(mocks.mockSocket.on).toHaveBeenCalledWith("new-chat", expect.any(Function));
  });
});
