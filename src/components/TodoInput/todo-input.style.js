import styled from 'styled-components';

export const TodoInputWrapper = styled.input`
    border: none;
    border-bottom: 2px solid #4B4B4B;
    width: 100%;
    font-size: 36px;
    letter-spacing: 1px;
    margin-top: 200px;
    padding-left: 5px;
    &:focus{
        outline: none;
    }
    &::-webkit-input-placeholder{
        color: lightgray;
    }
`;