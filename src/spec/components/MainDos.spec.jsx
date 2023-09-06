import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";

import MainDos from "../../components/MainDos";

import { showCreateChatRoomAtom } from "../../atoms/chatRoomAtoms";
import { modalStateAtom } from "../../atoms/messageAtoms";
import { userAtom } from "../../atoms/userAtom";
import { currentPageAtom } from "../../atoms/pageAtoms";
import { showMainDosAtom } from "../../atoms/postAtoms";

const mocks = vi.hoisted(() => {
  return {
    modalState: false,
    showCreateChatRoom: false,
    user: { _id: 1234 },
    setModalSate: vi.fn(),
    setShowCreateChatRoom: vi.fn(),
    setUser: vi.fn(),
    setCurrentPage: vi.fn(),
    setShowMainDos: vi.fn(),
    navigate: vi.fn(),
  };
});

vi.mock("../../components/CreateChatRoomDos", () => ({
  default: () => {
    return <div data-testid="create-chatroomdos">ChatRoom Dos</div>;
  },
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  };
});

const queryClient = new QueryClient();

describe("MainDos Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Provider>
            <MainDos />
          </Provider>
        </QueryClientProvider>
      </MemoryRouter>,
    );
    vi.mock("jotai", async () => {
      const actualJotai = await vi.importActual("jotai");

      return {
        ...actualJotai,
        useAtom: (atom) => {
          if (atom === showCreateChatRoomAtom) {
            return [mocks.showCreateChatRoom, mocks.setShowCreateChatRoom];
          }

          if (atom === modalStateAtom) {
            return [mocks.modalState, mocks.setModalSate];
          }

          if (atom === userAtom) {
            return [mocks.user, mocks.setUser];
          }
        },
        useSetAtom: (atom) => {
          if (atom === currentPageAtom) {
            return mocks.setCurrentPage;
          }
          if (atom === showMainDosAtom) {
            return mocks.setShowMainDos;
          }

          return actualJotai.useSetAtom(atom);
        },
      };
    });
  });

  afterEach(() => {
    mocks.setShowMainDos.mockClear();
    mocks.setCurrentPage.mockClear();
  });

  it("renders correctly", () => {
    expect(screen.getByLabelText(/선택 >>/i)).toBeInTheDocument();
  });

  it("handles command input", () => {
    const input = screen.getByLabelText(/선택 >>/i);

    function changeCommand(command) {
      fireEvent.change(input, { target: { value: command } });
      fireEvent.keyDown(input, { key: "Enter" });
    }

    changeCommand("h");
    expect(screen.getByText(/명령어 안내 켜기\/끄기\(h\)/i)).toBeInTheDocument();

    changeCommand("x");
    expect(screen.getByText(/종료하고 로그인 화면으로 돌아가시겠습니까?/i)).toBeInTheDocument();

    changeCommand("t");
    expect(mocks.setShowMainDos).toHaveBeenCalledWith(true);
    expect(mocks.navigate).toHaveBeenCalledWith("/boards");

    changeCommand("1 go");
    expect(mocks.navigate).toHaveBeenCalled();

    changeCommand("b");
    expect(mocks.navigate).toHaveBeenCalled();

    changeCommand("p");
    expect(mocks.setCurrentPage).toHaveBeenCalled();

    changeCommand("n");
    expect(mocks.setCurrentPage).toHaveBeenCalled();
  });

  it("should render createChatRoom Dos when showCreateChatRoom is true", () => {
    mocks.showCreateChatRoom = true;
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Provider>
            <MainDos />
          </Provider>
        </QueryClientProvider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("create-chatroomdos")).toBeInTheDocument();
  });
});
