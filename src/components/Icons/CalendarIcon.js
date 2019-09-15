import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CalendarIconWrapper = styled.div`
  width: ${({size}) => size || 20}px;
  height: ${({size}) => size || 20}px;
  &:hover {
    cursor: pointer;
  }
  &:hover svg{
    fill: ${({hoverIconColor}) => hoverIconColor}
  }
  & svg {
    fill: ${({defaultIconColor}) => defaultIconColor}
  }
`;

const CalendarIcon = ({onClick, ...props}) => (
  <CalendarIconWrapper onClick={() => onClick && onClick()} {...props}>
    <svg width="100%" height="100%" viewBox="0 0 150 150">
        <path d="M13.3,126.4V37.4c0-2.4,0.9-4.5,2.6-6.3c1.7-1.8,3.8-2.6,6.2-2.6h8.8v-6.7c0-3.1,1.1-5.7,3.2-7.9
          c2.2-2.2,4.7-3.3,7.8-3.3h4.4c3,0,5.6,1.1,7.8,3.3c2.2,2.2,3.2,4.8,3.2,7.9v6.7h26.4v-6.7c0-3.1,1.1-5.7,3.2-7.9
          c2.2-2.2,4.7-3.3,7.8-3.3h4.4c3,0,5.6,1.1,7.8,3.3c2.2,2.2,3.2,4.8,3.2,7.9v6.7h8.8c2.4,0,4.4,0.9,6.2,2.6
          c1.7,1.8,2.6,3.8,2.6,6.3v88.9c0,2.4-0.9,4.5-2.6,6.3c-1.7,1.8-3.8,2.6-6.2,2.6H22.1c-2.4,0-4.4-0.9-6.2-2.6
          C14.2,130.8,13.3,128.8,13.3,126.4z M22.1,126.4h96.8V55.2H22.1V126.4z M39.7,41.9c0,0.6,0.2,1.2,0.6,1.6
          c0.4,0.4,0.9,0.6,1.6,0.6h4.4c0.6,0,1.2-0.2,1.6-0.6c0.4-0.4,0.6-0.9,0.6-1.6v-20c0-0.6-0.2-1.2-0.6-1.6
          c-0.4-0.4-0.9-0.6-1.6-0.6h-4.4c-0.6,0-1.2,0.2-1.6,0.6c-0.4,0.4-0.6,1-0.6,1.6V41.9z M92.5,41.9c0,0.6,0.2,1.2,0.6,1.6
          c0.4,0.4,0.9,0.6,1.6,0.6h4.4c0.6,0,1.2-0.2,1.6-0.6c0.4-0.4,0.6-0.9,0.6-1.6v-20c0-0.6-0.2-1.2-0.6-1.6
          c-0.4-0.4-0.9-0.6-1.6-0.6h-4.4c-0.6,0-1.2,0.2-1.6,0.6c-0.4,0.4-0.6,1-0.6,1.6V41.9z"/>
    </svg>
  </CalendarIconWrapper>
)

CalendarIcon.propTypes = {
  onClick: PropTypes.func,
  size: PropTypes.number,
  defaultIconColor: PropTypes.string.isRequired,
  hoverIconColor: PropTypes.string.isRequired,
};

export default CalendarIcon;