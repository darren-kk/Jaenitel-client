import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Boards from "../../pages/Boards";
import { currentPageAtom, totalPageAtom } from "../../atoms/pageAtoms";

const mocks = vi.hoisted(() => {
  return {
    setCurrentPage: vi.fn(),
    setTotalPage: vi.fn(),
  };
});

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useSetAtom: (atom) => {
      if (atom === currentPageAtom) {
        return mocks.setCurrentPage;
      }
      if (atom === totalPageAtom) {
        return mocks.setTotalPage;
      }

      return actualJotai.useSetAtom(atom);
    },
  };
});

describe("Boards Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders without crashing", () => {
    render(<Boards />);
    expect(screen.getByText("메인 메뉴")).toBeInTheDocument();
  });

  it("sets current page and total page on mount", () => {
    render(<Boards />);
    expect(mocks.setCurrentPage).toHaveBeenCalledWith(1);
    expect(mocks.setTotalPage).toHaveBeenCalledWith(1);
  });

  it("renders main sections correctly", () => {
    render(<Boards />);
    expect(screen.getByText("Communication")).toBeInTheDocument();
    expect(screen.getByText("Contents")).toBeInTheDocument();
    expect(screen.getByText("Special")).toBeInTheDocument();
  });
});
