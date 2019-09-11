import styled from 'styled-components';

export const ListWrapper = styled.div`
    border-bottom: 1px solid darkgray;  
`;

export const ListHeader = styled.div`
    display: flex;
    padding: 10px 0;
`;

export const ListNameWrapper = styled.span`
    flex: 1;
`;

export const ListText = styled.span`
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

//TODO: connect to theme object
export const ListInput = styled.input`
    color: black;
    border-bottom: 1px solid black;
    font-size: 16px;
    background: transparent;
    letter-spacing: 1px;
    padding: 0;
    width: 100%;
    outline: none;
    border: none;
    &::-webkit-input-placeholder{
        color: lightgray;
    }
`;

// export const ProgressWrapper = styled.span`
//     flex: 1;
//     margin-left: 10px;
// `;