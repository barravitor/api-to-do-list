import styled from "@emotion/styled";

export const NewTaskContainer = styled("div")`
    display: flex;
    flex-direction: row-reverse;
    padding-right: 40px;
`;

export const ClearRow = styled("div")`
    width: 100%;
    background-color: #000;
    height: 1px;
    margin: 10px 0px 10px 0px;
`;

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