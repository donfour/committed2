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

export const TodoInput = styled.input`
  font-size: 20px;
  padding: 0;
  outline: none;
  width: 100%;
  border: none;
  letter-spacing: 1px;
  border-bottom: 1px solid ${({theme}) => theme.primary};
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