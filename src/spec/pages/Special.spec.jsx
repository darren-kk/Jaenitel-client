import { render, screen } from "@testing-library/react";
import Special from "../../pages/Special";

describe("Special Component", () => {
  beforeEach(() => {
    render(<Special />);
  });

  it("renders the header with the name", () => {
    expect(screen.getByText("안녕하세요, 김재환입니다.")).toBeInTheDocument();
  });

  it("renders the contact details", () => {
    expect(screen.getByText("연락처")).toBeInTheDocument();
    expect(screen.getByText("전화번호: +82 010 2702 8138")).toBeInTheDocument();
    expect(screen.getByText("이-메일: rlawoghks10@gmail.com")).toBeInTheDocument();
  });

  it("renders the GitHub details", () => {
    expect(screen.getByText("깃-허브")).toBeInTheDocument();
    expect(screen.getByText("주소: https://github.com/darren-kk")).toBeInTheDocument();
    expect(screen.getByText("클라이언트: https://github.com/darren-kk/Jaenitel-client")).toBeInTheDocument();
    expect(screen.getByText("써버: https://github.com/darren-kk/Jaenitel-server")).toBeInTheDocument();
  });

  it("renders the motivation for the project", () => {
    expect(screen.getByText("제작 동기")).toBeInTheDocument();
    expect(screen.getByText(/저는 평소에 음악을 굉장히 좋아합니다./)).toBeInTheDocument();
    expect(screen.getByText(/제 프로젝트는 이 불편한 과정에서 시작 되었습니다./)).toBeInTheDocument();
  });
});
