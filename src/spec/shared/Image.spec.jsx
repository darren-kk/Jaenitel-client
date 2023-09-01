import { render, screen } from "@testing-library/react";

import Image from "../../components/shared/Image";

describe("Image component", () => {
  it("renders without crashing", () => {
    render(<Image src="sample.jpg" alt="sample description" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("applies custom class", () => {
    render(<Image className="custom-class" type="text" />);
    expect(screen.getByRole("img")).toHaveClass("custom-class");
  });

  it("has correct src", () => {
    render(<Image src="sample.jpg" alt="sample description" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", "sample.jpg");
  });
});
