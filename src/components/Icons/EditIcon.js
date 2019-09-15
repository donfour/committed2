import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const EditIconWrapper = styled.div`
  margin-left: 8px;
  display: inline-block;
  height: ${({size}) => size || 14}px;
  width: ${({size}) => size || 14}px;
  & svg {
    fill: lightgray
  }
`;

const EditIcon = (props) => (
    <EditIconWrapper {...props}>
        <svg width="100%" height="100%" viewBox="0 0 528.899 528.899">
            <g>
            <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z" />
            </g>
        </svg>
    </EditIconWrapper>
);

EditIcon.propTypes = {
  size: PropTypes.number,
};

export default EditIcon;