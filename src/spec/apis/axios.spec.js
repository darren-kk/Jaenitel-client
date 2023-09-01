import axios from "axios";
import fetchData from "../../apis/axios";
import { vi } from "vitest";

vi.mock("axios");

describe("fetchData", () => {
  it("fetches successfully data from an API", async () => {
    axios.mockResolvedValue({ data: "Some data" });

    const result = await fetchData("get", "/test");
    expect(result.data).toBe("Some data");
  });

  it("throw error from an API", async () => {
    axios.mockRejectedValue(new Error("An error occurred"));

    await expect(fetchData("get", "/test-error")).rejects.toThrow("An error occurred");
  });
});
