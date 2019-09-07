import styled from 'styled-components';

export const Body = styled.div`
  display: flex;
  font-size: 20px;
  letter-spacing: 1px;
  overflow: scroll;
`;

export const ButtonsWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-basis: 12%;
  justify-content: space-between;
`;

export const CheckboxWrapper = styled.div`
  flex: 0 0 30px;
  padding-top: 23px
`;

export const DragHandleWrapper = styled.div`
  flex: 0 0 30px;
  padding-top: 23px
`;

export const DuedateWrapper = styled.span`
  color: ${({ theme }) => theme.secondary};
  display: inline-block;
  font-size: 17px;
  margin-left: 5px;
`;

export const TodoFooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TodoInput = styled.input`
  background: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  border: none;
  color: ${({ theme }) => theme.primary};
  font-size: 20px;
  letter-spacing: 1px;
  outline: none;
  padding: 0;
  width: 100%;
`;

export const TodoText = styled.span`
  color: ${({ theme }) => theme.primary};
  &:hover {
    cursor: text;
  }
`;

export const TodoWrapper = styled.div`
  flex: 1;
  min-height: 25px;
  overflow: scroll;
  padding: 20px;
`;