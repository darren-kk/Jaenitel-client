import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChatRooms from "../../pages/ChatRooms";
import { currentPageAtom, totalPageAtom, postsPerPageAtom } from "../../atoms/pageAtoms";

const mocks = vi.hoisted(() => {
  return {
    setPostsPerPage: vi.fn(),
    mockChatRooms: [
      {
        _id: "123",
        index: 1,
        title: "Test Chat Room",
        createdDate: "2023-09-02T00:00:00Z",
        users: [
          { _id: "user1", nickname: "User One" },
          { _id: "user2", nickname: "User Two" },
        ],
      },
    ],
    mockTotalChatRooms: 1,
  };
});

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useAtomValue: (atom) => {
      if (atom === currentPageAtom) {
        return 1;
      }
      if (atom === totalPageAtom) {
        return 1;
      }
    },
    useAtom: (atom) => {
      if (atom === postsPerPageAtom) {
        return [10, mocks.setPostsPerPage];
      }

      return actualJotai.useSetAtom(atom);
    },
  };
});

vi.mock("../../apis/getChatrooms", () => ({
  default: () => ({
    error: null,
    chatRooms: mocks.mockChatRooms,
    totalChatRooms: mocks.mockTotalChatRooms,
  }),
}));

const queryClient = new QueryClient();

describe("ChatRooms Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChatRooms />
      </QueryClientProvider>,
    );
    expect(screen.getByText("실시간 대화방")).toBeInTheDocument();
  });

  it("displays chat rooms correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChatRooms />
      </QueryClientProvider>,
    );

    expect(screen.getByText("# 1")).toBeInTheDocument();
    expect(screen.getByText("Test Chat Room")).toBeInTheDocument();
    expect(screen.getByText("개설일: 2023-09-02")).toBeInTheDocument();
    expect(screen.getByText("User One")).toBeInTheDocument();
    expect(screen.getByText("/ User Two")).toBeInTheDocument();
  });

  it("displays total chat rooms and users count", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChatRooms />
      </QueryClientProvider>,
    );
    expect(screen.getByText("개설 방 수: 1 / 99")).toBeInTheDocument();
    expect(screen.getByText("현재 참여인원: 2명")).toBeInTheDocument();
  });

  it("displays current page and total page", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChatRooms />
      </QueryClientProvider>,
    );
    expect(screen.getByText("1 / 1")).toBeInTheDocument();
  });
});
