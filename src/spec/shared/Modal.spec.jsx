import { render, screen } from "@testing-library/react";
import Modal from "../../components/shared/Modal";

describe("Modal component", () => {
  it("renders modal with given title", () => {
    render(<Modal title="Test Title">Modal Content</Modal>);

    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders modal with close button", () => {
    render(<Modal title="Test Title">Modal Content</Modal>);

    const closeButton = screen.getByText("X");
    expect(closeButton).toBeInTheDocument();
  });

  it("renders children content inside the modal", () => {
    render(<Modal title="Test Title">Modal Content</Modal>);

    const modalContent = screen.getByText("Modal Content");
    expect(modalContent).toBeInTheDocument();
  });
});
