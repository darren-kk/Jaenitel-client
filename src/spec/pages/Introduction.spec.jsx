import { vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { showModalAtom } from "../../atoms/loginAtoms";

import Introduction from "../../pages/Introduction";

const mocks = vi.hoisted(() => {
  return {
    setShowModal: vi.fn(),
  };
});

vi.mock("../../components/ModemModal", () => ({
  default: () => {
    return <div data-testid="modem-modal">Mocked ModemModal</div>;
  },
}));

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useAtom: (atom) => {
      if (atom === showModalAtom) {
        return [false, mocks.setShowModal];
      }

      return actualJotai.useAtom(atom);
    },
  };
});

describe("Introduction Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders without crashing", () => {
    render(<Introduction />);
    expect(screen.getByText("안녕하세요! 재니텔에 방문해 주셔서 감사드립니다.")).toBeInTheDocument();
  });

  it("shows the ModemModal when '접속하기' button is clicked", () => {
    render(<Introduction />);
    const button = screen.getByText("접속하기");
    button.click();

    expect(mocks.setShowModal).toHaveBeenCalledWith(true);
  });

  it("renders the ModemModal when showModal is true", () => {
    vi.mock("jotai", async () => {
      const actualJotai = await vi.importActual("jotai");

      return {
        ...actualJotai,
        useAtom: (atom) => {
          if (atom === showModalAtom) {
            return [true, mocks.setShowModal];
          }

          return actualJotai.useAtom(atom);
        },
      };
    });

    render(<Introduction />);
    expect(screen.getByTestId("modem-modal")).toBeInTheDocument();
  });
});
