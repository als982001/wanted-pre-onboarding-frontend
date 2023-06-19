import { useEffect, useState } from "react";
import styled from "styled-components";
import { validEmail, validPassword } from "../Utils/Functions";
import { postNewAccount } from "../Utils/UserFunctions";

const Wrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  margin-top: 50px;
  width: 500px;
  height: 500px;
  border: 2px solid black;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & a {
    font-size: 20px;
    font-weight: bold;
    margin-top: 50px;
  }
`;

const Title = styled.h2`
  font-size: 50px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 80%;
  height: 60px;
  padding-left: 20px;
`;

const Button = styled.button`
  width: 200px;
  height: 60px;
`;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleStartSignUp = async (event) => {
    event.preventDefault();

    const result = await postNewAccount(email, password);

    if (result === true) {
      window.location.href = "/signin";
    } else {
      alert("회원가입이 실패했습니다.");
    }

    return;
  };

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));

    if (accessToken) {
      window.location.href = "/todo";
    }
  }, []);

  return (
    <Wrapper>
      <Form onSubmit={handleStartSignUp}>
        <Title>회원가입</Title>
        <Input
          value={email}
          onChange={(event) => setEmail((prev) => event.target.value)}
          data-testid="email-input"
          placeholder="Email을 입력해주세요."
          type="email"
        />
        <Input
          value={password}
          onChange={(event) => setPassword((prev) => event.target.value)}
          data-testid="password-input"
          placeholder="비밀번호를 입력해주세요."
          type="password"
        />
        <Button
          disabled={!(validEmail(email) && validPassword(password))}
          data-testid="signup-button"
        >
          회원가입
        </Button>
        <a href="/signin">로그인하기...</a>
      </Form>
    </Wrapper>
  );
}
