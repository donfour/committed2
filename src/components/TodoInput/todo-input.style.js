import styled from 'styled-components';

export const TodoInputWrapper = styled.input`
    border: none;
    padding: 0 0 2px;
    color: ${({theme}) => theme.primary};
    border-bottom: 2px solid ${({theme}) => theme.primary};
    width: 100%;
    font-size: 36px;
    letter-spacing: 1px;
    margin-top: 200px;
    &:focus{
        outline: none;
    }
    &::-webkit-input-placeholder{
        color: ${({theme}) => theme.inputPlaceholder};
    }
    background-color: transparent;
`;