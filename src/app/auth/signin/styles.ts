import styled from "@emotion/styled";

export const Page = styled("div")`
  display: flex;
  height: 100vh;
  align-items: center;
  background-color: #2094c1;
  padding: 0;
  margin: 0;
`;

export const LoginContainer = styled("div")`
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 500px;
  height: 400px;
  background-color: #dfdfdf;
  text-align: center;
  margin: 0 auto;
  align-items: center;
  border-radius: 50px;

  @media (max-width: 550px) {
    width: 90%;
  }
`;

export const Title = styled("p")`
  color: #000;
  font-size: 35px;
`;