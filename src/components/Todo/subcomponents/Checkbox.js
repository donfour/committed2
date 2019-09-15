import React from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  display: flex;
  border: 2px solid ${({color}) => color};
  width: 14px;
  height: 14px;
  border-radius: 2px;
  &:hover{
    cursor: pointer;
  }
`;

const Checkbox = ({isChecked, onClick, ...props}) => (
      <CheckboxContainer onClick={(e) => onClick && onClick(e)} {...props}>
        {
          isChecked &&
          <svg  width="100%" height="100%" viewBox="0 0 200 200">
            <polyline points="25.1,101 76.9,154 177,45.9" style={{ stroke: props.color, fill: 'none', strokeWidth: 25 }}/>
          </svg>
        }
      </CheckboxContainer>
)

export default Checkbox;