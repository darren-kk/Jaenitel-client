import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import Input from "../../components/shared/Input";

describe("Input component", () => {
  it("renders without crashing", () => {
    render(<Input type="text" />);
    expect(screen.getByRole("textbox")).toBeVisible();
  });

  it("applies custom class", () => {
    render(<Input className="custom-class" type="text" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-class");
  });

  it("calls onChange handler", async () => {
    const handleChange = vi.fn();
    render(<Input type="text" onChange={handleChange} />);
    await fireEvent.input(screen.getByRole("textbox"), { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("calls onKeyDown handler", async () => {
    const handleKeyDown = vi.fn();
    render(<Input type="text" onKeyDown={handleKeyDown} />);
    await fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter", code: "Enter" });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });
});
