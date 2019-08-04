import styled from 'styled-components';

export const Todo = styled.div`
  border-bottom: 1px solid ${({theme}) => theme.todoBorder};
`;

export const Body = styled.div`
  display: flex;
  font-size: 20px;
  letter-spacing: 1px;
  overflow: scroll;
`;

export const CheckboxWrapper = styled.div`
  flex: 0 0 30px;
  padding-top: 23px
`;

export const TodoWrapper = styled.div`
  flex: 1;
  padding: 20px;
  min-height: 25px;
  overflow: scroll;
`;

export const TodoText = styled.span`
  color: ${({theme}) => theme.primary};
  &:hover {
    cursor: text;
  }
`;

export const TodoInput = styled.input`
  color: ${({theme}) => theme.primary};
  border-bottom: 1px solid ${({theme}) => theme.primary};
  background: transparent;

  font-size: 20px;
  letter-spacing: 1px;

  padding: 0;
  width: 100%;
  outline: none;
  border: none;
`;

export const DuedateWrapper = styled.span`
  display: inline-block;
  color: ${({theme}) => theme.secondary};
  font-size: 17px;
  margin-left: 5px;
`;

export const TodoFooterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;