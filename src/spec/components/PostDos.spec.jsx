import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";

import PostDos from "../../components/PostDos";

import { showMainDosAtom } from "../../atoms/postAtoms";

const mocks = {
  setShowMainDos: vi.fn(),
  navigate: vi.fn(),
  createPost: vi.fn(),
  editPost: vi.fn(),
  location: { pathname: "/new" },
};

vi.mock("../../apis/createPost", () => ({
  default: () => mocks.createPost,
}));

vi.mock("../../apis/putPost", () => ({
  default: () => mocks.editPost,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
    useLocation: () => mocks.location,
  };
});

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useSetAtom: (atom) => {
      if (atom === showMainDosAtom) {
        return mocks.setShowMainDos;
      }
      return vi.fn();
    },
  };
});

const queryClient = new QueryClient();

describe("PostDos Component", () => {
  const handleAddContent = vi.fn();
  const contentRefs = { current: [{}] };

  beforeEach(() => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Provider>
            <PostDos handleAddContent={handleAddContent} contentRefs={contentRefs} />
          </Provider>
        </QueryClientProvider>
      </MemoryRouter>,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders command input correctly", () => {
    expect(screen.getByLabelText(/명령어 >>/i)).toBeInTheDocument();
  });

  it("handles command input", () => {
    const input = screen.getByLabelText(/명령어 >>/i);

    function changeCommand(command) {
      fireEvent.change(input, { target: { value: command } });
      fireEvent.keyDown(input, { key: "Enter" });
    }

    changeCommand("text");
    expect(handleAddContent).toHaveBeenCalledWith("textContent");

    changeCommand("image");
    expect(handleAddContent).toHaveBeenCalledWith("imageContent");

    changeCommand("video");
    expect(handleAddContent).toHaveBeenCalledWith("videoContent");

    changeCommand("t");
    expect(mocks.setShowMainDos).toHaveBeenCalledWith(true);
    expect(mocks.navigate).toHaveBeenCalledWith("/boards");

    changeCommand("b");
    expect(mocks.setShowMainDos).toHaveBeenCalledWith(true);
    expect(mocks.navigate).toHaveBeenCalledWith(-1);
  });

  it("should call createPos when post mode is new", () => {
    const input = screen.getByLabelText(/명령어 >>/i);

    function changeCommand(command) {
      fireEvent.change(input, { target: { value: command } });
      fireEvent.keyDown(input, { key: "Enter" });
    }

    changeCommand("submit");
    expect(mocks.createPost).toHaveBeenCalled();
  });

  it("should call editPost when post mode is edit", () => {
    const input = screen.getByLabelText(/명령어 >>/i);
    mocks.location = { pathname: "/edit" };

    function changeCommand(command) {
      fireEvent.change(input, { target: { value: command } });
      fireEvent.keyDown(input, { key: "Enter" });
    }

    changeCommand("submit");
    expect(mocks.editPost).toHaveBeenCalled();
  });
});
