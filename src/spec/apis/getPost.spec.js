import { vi } from "vitest";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import useGetPost from "../../apis/getPost";
import { renderHook } from "@testing-library/react";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("jotai", async () => {
  const actual = await vi.importActual("jotai");
  return {
    ...actual,
    useAtomValue: vi.fn().mockReturnValue({
      _id: "12345",
    }),
  };
});

const mockedFetchData = vi.fn();

vi.mock("../../axios", () => mockedFetchData);

describe("useGetPost", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches post data for a given postId", async () => {
    useAtomValue.mockReturnValue({
      _id: "12345",
    });

    useQuery.mockReturnValue({
      data: {
        data: {
          post: {
            id: "post1",
            title: "Sample Post",
          },
        },
      },
    });

    mockedFetchData.mockResolvedValue({
      data: {
        post: {
          id: "post1",
          title: "Sample Post",
        },
      },
    });

    const { result } = renderHook(() => useGetPost("post1"));

    expect(result.current.post).toEqual({
      id: "post1",
      title: "Sample Post",
    });
  });

  it("handles error when fetching post data", async () => {
    useAtomValue.mockReturnValue({
      _id: "12345",
    });

    await mockedFetchData.mockRejectedValue(new Error("Fetch error"));

    useQuery.mockReturnValue({
      isError: true,
      error: new Error("Fetch error"),
    });

    const { result } = renderHook(() => useGetPost("post1"));

    expect(result.current.post).toBeUndefined();
    expect(result.current.error).toEqual(new Error("Fetch error"));
  });
});
