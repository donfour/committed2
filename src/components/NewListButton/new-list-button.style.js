import styled from 'styled-components';

export const NewListButtonWrapper = styled.div`
    &:hover {
        cursor: pointer;
    }
    color: ${({textColor}) => textColor};
    margin: 10px 0;
    font-size: 16px;
`;