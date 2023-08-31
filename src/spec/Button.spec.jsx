import { render } from "@testing-library/react";
import Button from "../components/shared/Button";

describe("Button component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Button>Click me!</Button>);
    expect(getByText("Click me!")).toBeInTheDocument();
  });

  it("applies custom class", () => {
    const { getByText } = render(<Button className="custom-class">Click me!</Button>);
    expect(getByText("Click me!")).toHaveClass("custom-class");
  });

  it("applies button type", () => {
    const { getByText } = render(<Button type="submit">Submit</Button>);
    const button = getByText("Submit");
    expect(button.type).toBe("submit");
  });
});
