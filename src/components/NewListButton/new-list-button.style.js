import styled from 'styled-components';

export const NewListButtonWrapper = styled.div`
    &:hover {
        cursor: pointer;
    }
    color: ${({textColor}) => textColor};
    margin-top: 10px;
    font-size: 16px;
`;