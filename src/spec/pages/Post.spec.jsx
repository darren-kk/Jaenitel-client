import { vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { scrollRefAtom, videoRefAtom } from "../../atoms/refAtoms";

import Post from "../../pages/Post";

const mocks = vi.hoisted(() => {
  return {
    setScrollRef: vi.fn(),
    setVideoRef: vi.fn(),
    mockPost: {
      _id: "123",
      index: 1,
      madeBy: { nickname: "darren" },
      createdDate: "2023-09-01T00:00:00",
      title: "test",
      contents: [],
    },
  };
});

vi.mock("react-router-dom", () => ({
  useParams: () => ({ boardName: "test", postId: "testId" }),
}));

vi.mock("../../apis/getPost", () => ({
  default: () => ({
    error: null,
    post: mocks.mockPost,
  }),
}));

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useSetAtom: (atom) => {
      if (atom === scrollRefAtom) {
        return mocks.setScrollRef;
      }
      if (atom === videoRefAtom) {
        return mocks.setVideoRef;
      }

      return actualJotai.useSetAtom(atom);
    },
  };
});

const queryClient = new QueryClient();

describe("Post Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("renders header elements correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Post />
      </QueryClientProvider>,
    );

    expect(screen.getByText("제목: test")).toBeInTheDocument();
    expect(screen.getByText("작성자: darren")).toBeInTheDocument();
    expect(screen.getByText("작성일: 2023-09-01")).toBeInTheDocument();
  });

  it("renders text content correctly", () => {
    mocks.mockPost.contents = [{ _id: "text1", textContent: "Sample text content" }];

    render(
      <QueryClientProvider client={queryClient}>
        <Post />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Sample text content")).toBeInTheDocument();
  });

  it("renders image content correctly", () => {
    mocks.mockPost.contents = [{ _id: "sampleImage", imageContent: "sample-image.jpg" }];

    render(
      <QueryClientProvider client={queryClient}>
        <Post />
      </QueryClientProvider>,
    );

    expect(screen.getByAltText("Content 0")).toHaveAttribute("src", "sample-image.jpg");
  });

  it("renders video content correctly", () => {
    mocks.mockPost.contents = [{ _id: "sampleVideo", videoContent: "sample-video.mp4" }];

    render(
      <QueryClientProvider client={queryClient}>
        <Post />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId("video-element")).toHaveAttribute("src", "sample-video.mp4");
  });
});
