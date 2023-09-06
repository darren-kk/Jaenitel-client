import { vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ChatRoomDos from "../../components/ChatRoomDos";

import { userAtom } from "../../atoms/userAtom";
import { showMainDosAtom } from "../../atoms/postAtoms";
import { showCreateChatRoomAtom } from "../../atoms/chatRoomAtoms";
import { scrollRefAtom } from "../../atoms/refAtoms";

const mocks = vi.hoisted(() => {
  return {
    setChat: vi.fn(),
    setShowMainDos: vi.fn(),
    setShowCreateChatRoomDos: vi.fn(),
    deleteChatRoom: vi.fn(),
    postChat: vi.fn(),
    mockUser: { _id: "testId", nickname: "testNickname" },
    mockScrollRef: { current: { scrollTo: vi.fn() } },
  };
});

vi.mock("react-router-dom", () => ({
  useParams: () => ({ roomId: "testRoomId" }),
  useNavigate: () => vi.fn(),
}));

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");

  return {
    ...actual,
    useQueryClient: () => ({ setQueryData: vi.fn() }),
  };
});

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useAtomValue: (atom) => {
      if (atom === userAtom) return mocks.mockUser;
      if (atom === scrollRefAtom) return mocks.mockScrollRef;
      return null;
    },
    useSetAtom: (atom) => {
      if (atom === showMainDosAtom) return mocks.setShowMainDos;
      if (atom === showCreateChatRoomAtom) return mocks.setShowCreateChatRoomDos;
      return vi.fn();
    },
  };
});

vi.mock("socket.io-client", () => ({
  default: () => ({ emit: vi.fn(), disconnect: vi.fn() }),
}));

vi.mock("../apis/deleteChatRoom", () => ({
  default: () => mocks.deleteChatRoom,
}));
vi.mock("../apis/postChat", () => ({
  default: () => mocks.postChat,
}));

const queryClient = new QueryClient();

describe("ChatRoomDos Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("renders chat input correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChatRoomDos />
      </QueryClientProvider>,
    );

    const chatInput = screen.getByLabelText(">>");
    fireEvent.change(chatInput, { target: { value: "Test chat message" } });

    expect(chatInput.value).toBe("Test chat message");
  });

  it("handles 'Enter' key press to send chat", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChatRoomDos />
      </QueryClientProvider>,
    );

    const chatInput = screen.getByLabelText(">>");
    fireEvent.change(chatInput, { target: { value: "Test chat message" } });
    fireEvent.keyDown(chatInput, { key: "Enter" });
  });

  it("handles 'ArrowDown' key press to scroll down", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChatRoomDos />
      </QueryClientProvider>,
    );

    const chatInput = screen.getByLabelText(">>");
    fireEvent.keyDown(chatInput, { key: "ArrowDown" });

    expect(mocks.mockScrollRef.current.scrollTo).toHaveBeenCalledWith({
      top: mocks.mockScrollRef.current.scrollTop + 30,
      behavior: "smooth",
    });
  });

  it("handles 'ArrowUp' key press to scroll up", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ChatRoomDos />
      </QueryClientProvider>,
    );

    const chatInput = screen.getByLabelText(">>");
    fireEvent.keyDown(chatInput, { key: "ArrowUp" });

    expect(mocks.mockScrollRef.current.scrollTo).toHaveBeenCalledWith({
      top: mocks.mockScrollRef.current.scrollTop - 30,
      behavior: "smooth",
    });
  });

  // Add more tests as needed
});
