import styled from 'styled-components';

export const Body = styled.div`
  display: flex;
  overflow: scroll;
  padding: 16px 0;
  font-size: 18px;
`;

export const ButtonsWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-basis: 12%;
  justify-content: space-between;
`;

export const CheckboxWrapper = styled.div`
  flex: 0 0 30px;
  padding-top: 2px;
`;

export const ArrowIconWrapper = styled.div`
  flex: 0 0 10px;
`;

export const DuedateWrapper = styled.span`
  color: ${({ theme }) => theme.secondary};
  display: inline-block;
  margin-left: 5px;
  font-size: 16px;
`;

export const TodoFooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TodoInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  outline: none;
  padding: 0;
  width: 100%;
  font-size: 18px;
  letter-spacing: 1px;
`;

export const TodoText = styled.span`
  color: ${({ theme }) => theme.primary};
  letter-spacing: 1px;
  &:hover {
    cursor: text;
  }
`;

export const TodoWrapper = styled.div`
  flex: 1;
  min-height: 25px;
  overflow: scroll;
`;