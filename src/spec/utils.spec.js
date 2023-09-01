import { checkInputValidation } from "../utils/utils";

describe("checkInputValidation", () => {
  it("returns error if email format is invalid", () => {
    const loginInfo = {
      email: "1234",
      password: "123456",
      reWrittenPassword: "123456",
      nickname: "darren",
    };
    expect(checkInputValidation(loginInfo)).toBe("이메일 형식이 올바르지 않습니다.");
  });

  it("returns error if password length is not between 6 and 20", () => {
    const loginInfo = {
      email: "test@email.com",
      password: "1234",
      reWrittenPassword: "1234",
      nickname: "darren",
    };
    expect(checkInputValidation(loginInfo)).toBe("비밀번호는 6자 이상 20자 이하이어야 합니다.");
  });

  it("returns error if password and reWrittenPassword do not match", () => {
    const loginInfo = {
      email: "test@email.com",
      password: "123456",
      reWrittenPassword: "654321",
      nickname: "darren",
    };
    expect(checkInputValidation(loginInfo)).toBe("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
  });

  it("returns error if nickname length is not between 2 and 8", () => {
    const loginInfo = {
      email: "test@email.com",
      password: "123456",
      reWrittenPassword: "123456",
      nickname: "darren123456",
    };
    expect(checkInputValidation(loginInfo)).toBe("닉네임은 2자 이상 8자 이하이어야 합니다.");
  });

  it("returns error if any of the fields are empty", () => {
    const loginInfo = {
      email: "",
      password: "",
      reWrittenPassword: "",
      nickname: "",
    };
    expect(checkInputValidation(loginInfo)).toBe("모든 입력 필드를 채워주세요.");
  });

  it("returns true if all conditions are satisfied", () => {
    const loginInfo = {
      email: "test@email.com",
      password: "123456",
      reWrittenPassword: "123456",
      nickname: "darren",
    };
    expect(checkInputValidation(loginInfo)).toBe(true);
  });
});
