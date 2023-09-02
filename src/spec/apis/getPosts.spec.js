import { vi } from "vitest";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import useGetPosts from "../../apis/getPosts";
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

describe("useGetPosts", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches posts data for a given category, page, and limit", async () => {
    useQuery.mockReturnValue({
      data: {
        data: {
          posts: [
            {
              id: "post1",
              title: "Sample Post 1",
            },
            {
              id: "post2",
              title: "Sample Post 2",
            },
          ],
        },
      },
    });

    mockedFetchData.mockResolvedValue({
      data: {
        posts: [
          {
            id: "post1",
            title: "Sample Post 1",
          },
          {
            id: "post2",
            title: "Sample Post 2",
          },
        ],
      },
    });

    const { result } = renderHook(() => useGetPosts("sample-category", 1, 10));

    expect(result.current.posts).toEqual([
      {
        id: "post1",
        title: "Sample Post 1",
      },
      {
        id: "post2",
        title: "Sample Post 2",
      },
    ]);
  });

  it("handles error when fetching posts data", async () => {
    useAtomValue.mockReturnValue({
      _id: "12345",
    });

    await mockedFetchData.mockRejectedValue(new Error("Fetch error"));

    useQuery.mockReturnValue({
      isError: true,
      error: new Error("Fetch error"),
    });

    const { result } = renderHook(() => useGetPosts("sample-category", 1, 10));

    expect(result.current.posts).toBeUndefined();
    expect(result.current.error).toEqual(new Error("Fetch error"));
  });
});
