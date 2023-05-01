import styled from "@emotion/styled";

export const LoginContainer = styled("div")`
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 500px;
  height: 600px;
  background-color: #dfdfdf;
  text-align: center;
  margin: 0 auto;
  align-items: center;
  border-radius: 50px;

  @media (max-width: 550px) {
    width: 90%;
  }
`;