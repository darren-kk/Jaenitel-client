import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import EditPost from "../../pages/EditPost";

const mocks = vi.hoisted(() => {
  return {
    setScrollRef: vi.fn(),
    setVideoRef: vi.fn(),
    setTitleRef: vi.fn(),
    setPostInfo: vi.fn(),
    mockPost: {
      title: "Sample Title",
      category: "Sample Category",
      madeBy: "Sample User",
      contents: [
        { textContent: "Sample Content" },
        { imageContent: { name: "original-image.jpg", size: 5 } },
        { videoContent: { name: "original-video.mp4", size: 5 } },
      ],
    },
  };
});

vi.mock("../../apis/getPost", () => ({
  default: () => ({
    error: null,
    post: mocks.mockPost,
  }),
}));

vi.mock("../../constants", async () => {
  const actual = await vi.importActual("../../constants");

  return {
    ...actual,
    maxfileSizes: {
      imageContent: 5,
      videoContent: 50,
    },
  };
});

vi.mock("react-router-dom", () => ({
  useParams: () => ({ boardName: "test", postId: "123" }),
}));

vi.mock("../../components/PostDos", () => ({
  default: () => {
    return <div data-testid="post-dos">Post Dos</div>;
  },
}));

const queryClient = new QueryClient();
URL.createObjectURL = vi.fn(() => "dummyUrl");

describe("EditPost Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should populate the post data for editing", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EditPost />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue("Sample Title")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Sample Content")).toBeInTheDocument();
    });
  });

  it("should update the post title", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EditPost />
      </QueryClientProvider>,
    );

    const titleInput = screen.getByDisplayValue("Sample Title");
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });

    expect(titleInput.value).toBe("Updated Title");
  });

  it("should update the post content", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EditPost />
      </QueryClientProvider>,
    );

    const contentTextarea = screen.getByDisplayValue("Sample Content");
    fireEvent.change(contentTextarea, { target: { value: "Updated Content" } });

    expect(contentTextarea.value).toBe("Updated Content");
  });

  it("should validate filesize well", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EditPost />
      </QueryClientProvider>,
    );

    const imageInput = screen.getByLabelText(2);
    fireEvent.change(imageInput, { target: { files: [{ name: "changed-image.jpg", size: 100 }] } });

    expect(
      screen.getAllByText("파일 크기가 너무 큽니다! 최대 파일 크기(사진: 5mb / 동영상: 50mb)")[0],
    ).toBeInTheDocument();
  });
});
