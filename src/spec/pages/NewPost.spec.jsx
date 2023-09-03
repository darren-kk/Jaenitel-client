import { vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { scrollRefAtom, videoRefAtom, titleRefAtom } from "../../atoms/refAtoms";

import NewPost from "../../pages/NewPost";

const mocks = vi.hoisted(() => {
  return {
    setScrollRef: vi.fn(),
    setVideoRef: vi.fn(),
    setTitleRef: vi.fn(),
    setPostInfo: vi.fn(),
    mockUser: { _id: "testId" },
    mockPostInfo: {
      _id: "123",
      index: 1,
      madeBy: { nickname: "darren" },
      createdDate: "2023-09-01T00:00:00",
      title: "test",
      contents: [{ textContent: "" }, { imageContent: "" }, { videoContent: "" }, { null: "" }],
    },
  };
});

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

vi.mock("../../components/PostDos", () => ({
  default: () => {
    return <div data-testid="post-dos">Post Dos</div>;
  },
}));

vi.mock("react-router-dom", () => ({
  useParams: () => ({ boardName: "test" }),
}));

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useAtomValue: () => {
      return mocks.mockUser;
    },
    useSetAtom: (atom) => {
      if (atom === scrollRefAtom) {
        return mocks.setScrollRef;
      }
      if (atom === videoRefAtom) {
        return mocks.setVideoRef;
      }
      if (atom === titleRefAtom) {
        return mocks.setTitleRef;
      }

      return actualJotai.useSetAtom(atom);
    },
    useAtom: () => {
      return [mocks.mockPostInfo, mocks.setPostInfo];
    },
  };
});

URL.createObjectURL = vi.fn(() => "dummyUrl");

describe("NewPost Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("renders header elements correctly", () => {
    render(<NewPost />);

    expect(screen.getByText("게시글 쓰기")).toBeInTheDocument();
  });

  it("renders text content input correctly", async () => {
    render(<NewPost />);

    const textArea = screen.getAllByRole("textbox")[1];
    fireEvent.change(textArea, { target: { value: "Sample text content" } });

    expect(mocks.setPostInfo).toHaveBeenCalledWith({
      _id: "123",
      createdDate: "2023-09-01T00:00:00",
      index: 1,
      madeBy: { nickname: "darren" },
      title: "test",
      contents: [{ textContent: "Sample text content" }, { imageContent: "" }, { videoContent: "" }, { null: "" }],
    });
  });

  it("renders image content input correctly", () => {
    render(<NewPost />);

    const imageInput = screen.getByLabelText(2);
    fireEvent.change(imageInput, { target: { files: ["sample-image.jpg"] } });

    expect(imageInput.files[0]).toBe("sample-image.jpg");
  });

  it("renders video content input correctly", () => {
    render(<NewPost />);

    const videoInput = screen.getByLabelText(3);
    fireEvent.change(videoInput, { target: { files: ["sample-video.mp4"] } });

    expect(videoInput.files[0]).toBe("sample-video.mp4");
  });

  it("renders PostDos component correctly", () => {
    render(<NewPost />);

    expect(screen.getByTestId("post-dos")).toBeInTheDocument();
  });

  it("should focus on the first content reference on 'Enter' key press", () => {
    render(<NewPost />);
    const textArea = screen.getAllByRole("textbox")[1];

    fireEvent.keyDown(textArea, { key: "Enter" });
    expect(mocks.setPostInfo).toHaveBeenCalled();
  });

  it("should validate filesize well", () => {
    render(<NewPost />);

    const imageInput = screen.getByLabelText(2);
    fireEvent.change(imageInput, { target: { files: [{ name: "sample-image.jpg", size: 100 }] } });

    expect(
      screen.getAllByText("파일 크기가 너무 큽니다! 최대 파일 크기(사진: 5mb / 동영상: 50mb)")[0],
    ).toBeInTheDocument();
  });
});
