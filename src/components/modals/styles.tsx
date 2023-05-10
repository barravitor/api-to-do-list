import styled from "@emotion/styled";

export const Style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

export const Container = {
    display: 'flex',
    width: '100%',
    "@media (max-width: 840px)": {
      flexDirection: 'column',
    }
};

export const BoxLeft = {
    width: '25%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',

    "@media (max-width: 840px)": {
      width: '100%',
      height: '250px'
    }
};

export const BoxRigth = {
    width: '75%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',

    "@media (max-width: 840px)": {
      width: '100%',
    }
};

export const MessageErrorContainer = styled("p")`
  padding-top: 5px;
  margin: 0;
`;

export const MessageError = styled("p")`
  padding: 0;
  margin: 0;
  color: red;
`;