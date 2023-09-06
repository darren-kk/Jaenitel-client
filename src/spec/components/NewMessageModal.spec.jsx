import { vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NewMessageModal from "../../components/NewMessageModal";

const mocks = vi.hoisted(() => {
  return {
    setScrollRef: vi.fn(),
    setVideoRef: vi.fn(),
    setTitleRef: vi.fn(),
    postMessage: vi.fn(),
    mockUser: { _id: "testId" },
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  };
});

vi.mock("../../apis/postMessage", () => ({
  default: () => mocks.postMessage,
}));

URL.createObjectURL = vi.fn(() => "dummyUrl");
const queryClient = new QueryClient();

describe("NewMessageModal Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("renders header elements correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewMessageModal />
      </QueryClientProvider>,
    );

    expect(screen.getByText("쪽지 보내기")).toBeInTheDocument();
  });

  it("handles text content input correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewMessageModal />
      </QueryClientProvider>,
    );

    const textArea = screen.getAllByRole("textbox")[1];

    fireEvent.change(textArea, { target: { value: "Sample message content" } });

    expect(textArea.value).toBe("Sample message content");
  });

  it("handles image content input correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewMessageModal />
      </QueryClientProvider>,
    );

    fireEvent.keyDown(window, { metaKey: true, shiftKey: true, key: "." });

    const imageInput = screen.getByLabelText(2);

    fireEvent.change(imageInput, { target: { files: ["sample-image.jpg"] } });

    expect(imageInput.files[0]).toBe("sample-image.jpg");
  });

  it("handles video content input correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewMessageModal />
      </QueryClientProvider>,
    );

    fireEvent.keyDown(window, { metaKey: true, shiftKey: true, key: "," });

    const videoInput = screen.getByLabelText(2);

    fireEvent.change(videoInput, { target: { files: ["sample-video.mp4"] } });

    expect(videoInput.files[0]).toBe("sample-video.mp4");
  });

  it("validates file sizes correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewMessageModal />
      </QueryClientProvider>,
    );
    fireEvent.keyDown(window, { metaKey: true, shiftKey: true, key: "." });

    const imageInput = screen.getByLabelText("2");

    fireEvent.change(imageInput, { target: { files: [{ name: "large-image.jpg", size: 6000000 }] } });

    expect(screen.getByText("파일 크기가 너무 큽니다! 최대 파일 크기(사진: 5mb / 동영상: 100mb)")).toBeInTheDocument();
  });

  it("handles keyboard shortcuts correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewMessageModal />
      </QueryClientProvider>,
    );

    fireEvent.keyDown(window, { metaKey: true, shiftKey: true, key: "o" });

    expect(mocks.postMessage).toHaveBeenCalled();
  });
});
