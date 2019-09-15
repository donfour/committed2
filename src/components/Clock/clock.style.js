import styled from 'styled-components';

export const Clock = styled.div`
    border: none;
    padding: 0 0 2px;
    color: ${({textColor}) => textColor};
    border-bottom: 2px solid ${({borderColor}) => borderColor};
    width: 100%;
    font-size: 36px;
    letter-spacing: 1px;
    margin-top: 20%;
    background-color: transparent;
    &:hover{
        cursor: default;
    }
`;