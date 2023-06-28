import styled from "styled-components";
import SignIn from "./Page/SignIn";
import SignUp from "./Page/SignUp";
import AllToDo from "./Page/AllToDo";
import { useEffect } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: auto;
  position: relative;
`;

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 50px;
  margin: 0 auto;
  width: 500px;
  height: 500px;
  border: 2px solid black;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
`;

const PageBtn = styled.div`
  width: 300px;
  height: 100px;
  border-radius: 20px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;

  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

function App() {
  const path = window.location.pathname;

  console.log(path);

  const goToSignIn = () => {
    window.location.href = "/signin";
  };

  const goToSignUp = () => {
    window.location.href = "/signup";
  };

  const goToToDo = () => {
    window.location.href = "/todo";
  };

  useEffect(() => {
    if (
      path !== "/signup" &&
      path !== "/signin" &&
      path !== "/todo" &&
      path !== "/"
    ) {
      alert("잚못된 접근입니다.");
      window.location.href = "/";
    }
  }, []);

  return (
    <Wrapper>
      {path === "/signin" && <SignIn />}
      {path === "/signup" && <SignUp />}
      {path === "/todo" && <AllToDo />}
      {path === "/" && (
        <Container>
          <PageBtn onClick={goToSignUp}>회원가입</PageBtn>
          <PageBtn onClick={goToSignIn}>로그인</PageBtn>
          <PageBtn onClick={goToToDo}>ToDo</PageBtn>
        </Container>
      )}
    </Wrapper>
  );
}

export default App;
