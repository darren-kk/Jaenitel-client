import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorPage from "../../pages/ErrorPage";

describe("ErrorPage Component", () => {
  const mockResetErrorBoundary = vi.fn();
  const mockError = {
    response: {
      status: 404,
      statusText: "Not Found",
    },
  };

  beforeEach(() => {
    render(<ErrorPage error={mockError} resetErrorBoundary={mockResetErrorBoundary} />);
  });

  it("renders the error message", () => {
    expect(screen.getByText("통신 장애가 발생 했습니다!")).toBeInTheDocument();
  });

  it("displays the error status and statusText if provided", () => {
    expect(screen.getByText("404 : Not Found")).toBeInTheDocument();
  });

  it("renders the instruction to go back", () => {
    expect(screen.getByText("t를 입력해 처음 화면으로 돌아갈 수 있습니다.")).toBeInTheDocument();
  });

  it("calls resetErrorBoundary when 't' key is pressed", () => {
    fireEvent.keyDown(window, { key: "t", code: "KeyT" });
    expect(mockResetErrorBoundary).toHaveBeenCalled();
  });
});
