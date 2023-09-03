import { cleanup, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { scrollRefAtom } from "../../atoms/refAtoms";
import { vi } from "vitest";

import Messages from "../../pages/Messages";

const mocks = vi.hoisted(() => {
  return {
    setScrollRef: vi.fn(),
    mockShowMessageModal: { isOpen: false, messageId: null },
  };
});

vi.mock("../../components/NewMessageModal", () => ({
  default: () => {
    return <div data-testid="new-message-modal">New Message Modal</div>;
  },
}));

vi.mock("../../components/MessageModal", () => ({
  default: () => {
    return <div data-testid="message-modal">Message Modal</div>;
  },
}));

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useAtomValue: () => {
      return mocks.mockShowMessageModal;
    },
    useSetAtom: (atom) => {
      if (atom === scrollRefAtom) {
        return mocks.setScrollRef;
      }

      return actualJotai.useSetAtom(atom);
    },
  };
});

const queryClient = new QueryClient();

describe("Messages Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("renders the header correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Messages />
      </QueryClientProvider>,
    );

    expect(screen.getByText("쪽지")).toBeInTheDocument();
  });

  it("renders both received and sended message lists", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Messages />
      </QueryClientProvider>,
    );

    expect(screen.getByText("쪽지함")).toBeInTheDocument();
    expect(screen.getByText("내가 보낸 쪽지")).toBeInTheDocument();
  });

  it("renders NewMessageModal when modal is open with messageId as 'new'", () => {
    mocks.mockShowMessageModal.isOpen = true;
    mocks.mockShowMessageModal.messageId = "new";

    render(
      <QueryClientProvider client={queryClient}>
        <Messages />
      </QueryClientProvider>,
    );

    expect(screen.getByText("New Message Modal")).toBeInTheDocument();
  });

  it("renders MessageModal when modal is open with a specific messageId", () => {
    mocks.mockShowMessageModal.isOpen = true;
    mocks.mockShowMessageModal.messageId = "12345";

    render(
      <QueryClientProvider client={queryClient}>
        <Messages />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Message Modal")).toBeInTheDocument();
  });
});
