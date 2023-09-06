import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";

import SignupDos from "../../components/SignupDos";
import { isSignupAtom } from "../../atoms/loginAtoms";

const mocks = {
  setIsSignup: vi.fn(),
  fetchSignup: vi.fn(),
  navigate: vi.fn(),
};

vi.mock("../../apis/postSignup", () => ({
  default: () => mocks.fetchSignup,
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

describe("SignupDos Component", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider>
          <SignupDos />
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

  it("renders password input correctly", () => {
    expect(screen.getByLabelText(/비밀번호 :/i)).toBeInTheDocument();
  });

  it("renders password confirmation input correctly", () => {
    expect(screen.getByLabelText(/비밀번호 확인 :/i)).toBeInTheDocument();
  });

  it("renders nickname input correctly", () => {
    expect(screen.getByLabelText(/닉네임 :/i)).toBeInTheDocument();
  });

  it("calls fetchSignup on nickname input Enter", async () => {
    const emailInput = screen.getByLabelText(/이용자 E-mail :/i);
    const passwordInput = screen.getByLabelText(/비밀번호 :/i);
    const reWrittenPasswordInput = screen.getByLabelText(/비밀번호 확인 :/i);
    const nicknameInput = screen.getByLabelText(/닉네임 :/i);

    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.change(reWrittenPasswordInput, { target: { value: "123456" } });
    fireEvent.change(nicknameInput, { target: { value: "testNick" } });

    nicknameInput.focus();

    fireEvent.keyDown(nicknameInput, { key: "Enter" });

    expect(mocks.fetchSignup).toHaveBeenCalled();
  });
});
