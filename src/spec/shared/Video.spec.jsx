import { render, fireEvent, screen } from "@testing-library/react";
import Video from "../../components/shared/Video";

describe("Video component", () => {
  it("renders without crashing and has correct source", () => {
    render(<Video src="sample.mp4" />);
    expect(screen.getByTestId("video-element")).toBeInTheDocument();
    expect(screen.getByTestId("video-element")).toHaveAttribute("src", "sample.mp4");
  });

  it("renders well under isPlaying state", () => {
    render(<Video src="sample.mp4" />);

    const playButton = screen.getByText("▶︎");
    const pauseButton = screen.getByText("||");
    const stopButton = screen.getByText("■");

    expect(stopButton).toHaveClass("border-button-pushed");
    expect(pauseButton).not.toHaveClass("border-button-pushed");
    expect(playButton).not.toHaveClass("border-button-pushed");
  });

  it("adjusts volume correctly", () => {
    render(<Video src="sample.mp4" />);

    const volumeSlider = screen.getByRole("slider");

    expect(volumeSlider.value).toBe("0.5");

    fireEvent.change(volumeSlider, { target: { value: "0.8" } });
    expect(volumeSlider.value).toBe("0.8");
  });
});
