import styled from 'styled-components';

export const ListWrapper = styled.div`
    border-bottom: 1px solid ${({borderColor}) => borderColor};  
`;

export const ListHeader = styled.div`
    display: flex;
    padding: 20px 0;
`;

export const ListNameWrapper = styled.span`
    flex: 1;
`;

export const ListText = styled.span`
    color: ${({textColor}) => textColor};
    font-size: 16px;
    letter-spacing: 1px;
    &:hover {
        cursor: text;
    }
`;

export const SideMenu = styled.div`
    display: flex;
    flex-basis: 10%;
    justify-content: space-between;
`;


export const ListInput = styled.input`
    color: ${({textColor}) => textColor};
    border: none;
    font-size: 16px;
    background: transparent;
    letter-spacing: 1px;
    padding: 0;
    width: 100%;
    outline: none;
    &::-webkit-input-placeholder{
        color: lightgray;
    }
`;