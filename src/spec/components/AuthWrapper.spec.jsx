import { render } from "@testing-library/react";
import { useAtomValue } from "jotai";
import AuthWrapper from "../../components/AuthWrapper";
import useGetAuthCheck from "../../apis/getAuthCheck";
import { vi } from "vitest";

vi.mock("jotai");
vi.mock("../../apis/getAuthCheck");

describe("AuthWrapper Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders children when user is authenticated", () => {
    useAtomValue.mockReturnValue({ id: "testUserId", name: "Test User" });
    useGetAuthCheck.mockReturnValue(null);

    const { getByText } = render(
      <AuthWrapper>
        <div>Child Component</div>
      </AuthWrapper>,
    );

    expect(getByText("Child Component")).toBeInTheDocument();
  });

  it("does not render children when user is not authenticated", () => {
    useAtomValue.mockReturnValue(null);
    useGetAuthCheck.mockReturnValue(null);

    const { queryByText } = render(
      <AuthWrapper>
        <div>Child Component</div>
      </AuthWrapper>,
    );

    expect(queryByText("Child Component")).toBeNull();
  });

  it("calls useGetAuthCheck hook", () => {
    useAtomValue.mockReturnValue({ id: "testUserId", name: "Test User" });
    useGetAuthCheck.mockReturnValue(null);

    render(
      <AuthWrapper>
        <div>Child Component</div>
      </AuthWrapper>,
    );

    expect(useGetAuthCheck).toHaveBeenCalled();
  });
});
