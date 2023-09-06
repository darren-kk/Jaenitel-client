import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";

import LoginDos from "../../components/LoginDos";
import { isSignupAtom } from "../../atoms/loginAtoms";

const mocks = {
  setIsSignup: vi.fn(),
  fetchLogin: vi.fn(),
  navigate: vi.fn(),
};

vi.mock("../../apis/postLogin", () => ({
  default: () => mocks.fetchLogin,
}));

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useSetAtom: (atom) => {
      if (atom === isSignupAtom) {
        return mocks.setIsSignup;
      }
      return vi.fn();
    },
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  };
});

const queryClient = new QueryClient();

describe("LoginDos Component", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider>
          <LoginDos />
        </Provider>
      </QueryClientProvider>,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders email input correctly", () => {
    expect(screen.getByLabelText(/이용자 E-mail :/i)).toBeInTheDocument();
  });

  it("shows password input on email input Enter", () => {
    const emailInput = screen.getByLabelText(/이용자 E-mail :/i);
    fireEvent.keyDown(emailInput, { key: "Enter" });

    expect(screen.getByLabelText(/비밀번호 :/i)).toBeInTheDocument();
  });

  it("calls setIsSignup when email is 'guest'", () => {
    const emailInput = screen.getByLabelText(/이용자 E-mail :/i);
    fireEvent.change(emailInput, { target: { value: "guest" } });
    fireEvent.keyDown(emailInput, { key: "Enter" });

    expect(mocks.setIsSignup).toHaveBeenCalledWith(true);
  });

  it("calls fetchLogin on password input Enter", () => {
    const emailInput = screen.getByLabelText(/이용자 E-mail :/i);
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.keyDown(emailInput, { key: "Enter" });

    const passwordInput = screen.getByLabelText(/비밀번호 :/i);
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.keyDown(passwordInput, { key: "Enter" });

    expect(mocks.fetchLogin).toHaveBeenCalled();
  });
});
