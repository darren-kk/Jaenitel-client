import { vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Board from "../../pages/Board";
import { currentPageAtom, totalPageAtom, postsPerPageAtom } from "../../atoms/pageAtoms";

const mocks = vi.hoisted(() => {
  return {
    currentPage: 1,
    totalPage: 2,
    postsPerPage: 10,
    setPostsPerPage: vi.fn(),
    mockPosts: [
      {
        _id: "123",
        index: 1,
        madeBy: { nickname: "darren" },
        createdDate: "2023-09-01T00:00:00",
        title: "test",
      },
    ],
  };
});

vi.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "test/sample" }),
}));

vi.mock("../../apis/getPosts", () => ({
  default: () => ({
    error: null,
    posts: mocks.mockPosts,
  }),
}));

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useAtomValue: (atom) => {
      if (atom === currentPageAtom) {
        return mocks.currentPage;
      }
      if (atom === totalPageAtom) {
        return mocks.totalPage;
      }
    },
    useAtom: (atom) => {
      if (atom === postsPerPageAtom) {
        return [mocks.postsPerPage, mocks.setPostsPerPage];
      }

      return actualJotai.useAtom(atom);
    },
  };
});

const queryClient = new QueryClient();

describe("Board Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("renders header elements correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Board />
      </QueryClientProvider>,
    );
    expect(screen.getByText("번호")).toBeInTheDocument();
    expect(screen.getByText("이름")).toBeInTheDocument();
    expect(screen.getByText("날짜")).toBeInTheDocument();
    expect(screen.getByText("제목")).toBeInTheDocument();
  });

  it("renders posts correctly", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Board />
      </QueryClientProvider>,
    );

    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("darren")).toBeInTheDocument();
    expect(screen.getByText("2023-09-01")).toBeInTheDocument();
  });

  it("renders footer with correct page numbers", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Board />
      </QueryClientProvider>,
    );
    expect(screen.getByText("1 / 2")).toBeInTheDocument();
  });
});
