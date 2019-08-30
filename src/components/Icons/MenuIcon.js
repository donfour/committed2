import React from 'react';
import styled from 'styled-components';

const MenuIconWrapper = styled.div`
  height: 20px;
`;

/**
 * Icon credits to SimpleIcon (https://www.flaticon.com/authors/those-icons)
 * */
const MenuIcon = ({onClick, ...props}) => (
  <MenuIconWrapper onClick={() => onClick && onClick()} {...props}>
    <svg width="100%" height="100%" viewBox="0 0 512 512">
      <g>
        <circle cx="256" cy="256" r="64"/>
        <circle cx="256" cy="448" r="64"/>
        <circle cx="256" cy="64" r="64"/>
      </g>
    </svg>
  </MenuIconWrapper>
)


export default MenuIcon;