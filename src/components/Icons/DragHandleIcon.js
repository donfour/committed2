import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DragHandleIconWrapper = styled.div`
  height: ${({size}) => size || '18'}px;
  & svg {
      fill: ${({defaultIconColor}) => defaultIconColor}
  }
`;

/**
 * Icon credits to SimpleIcon (https://www.flaticon.com/authors/those-icons)
 * */
const DragHandleIcon = ({onClick, ...props}) => (
  <DragHandleIconWrapper onClick={() => onClick && onClick()} {...props}>
    <svg width="100%" height="100%" viewBox="0 0 512 512">
      <g>
        <circle cx="256" cy="256" r="64"/>
        <circle cx="256" cy="448" r="64"/>
        <circle cx="256" cy="64" r="64"/>
      </g>
    </svg>
  </DragHandleIconWrapper>
)

DragHandleIcon.propTypes = {
  onClick: PropTypes.func,
  size: PropTypes.number,
  defaultIconColor: PropTypes.string.isRequired
};

export default DragHandleIcon;