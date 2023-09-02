import { vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import Login from "../../pages/Login";

const mocks = vi.hoisted(() => {
  return {
    mockIsSignupValue: false,
  };
});

vi.mock("../../components/SignupDos", () => ({
  default: () => {
    return <div data-testid="signup-dos">Signup Dos</div>;
  },
}));

vi.mock("../../components/LoginDos", () => ({
  default: () => {
    return <div data-testid="login-dos">Login Dos</div>;
  },
}));

describe("Login Component", () => {
  beforeEach(() => {
    vi.mock("jotai", async () => {
      const actualJotai = await vi.importActual("jotai");

      return {
        ...actualJotai,
        useAtomValue: () => {
          return mocks.mockIsSignupValue;
        },
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("renders without crashing", () => {
    render(<Login />);
    expect(screen.getByText("WELCOME!!")).toBeInTheDocument();
  });

  it("renders the SignupDos when isSignup is true", () => {
    mocks.mockIsSignupValue = true;

    render(<Login />);
    expect(screen.getByTestId("signup-dos")).toBeInTheDocument();
  });

  it("renders the LoginDos when isSignup is false", () => {
    mocks.mockIsSignupValue = false;

    render(<Login />);
    expect(screen.getByTestId("login-dos")).toBeInTheDocument();
  });
});
