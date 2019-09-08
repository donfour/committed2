import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ArrowIconWrapper = styled.div`
    width: ${({ size }) => size || 8}px;
    height: ${({ size }) => size || 8}px;
    border-right: 2px solid lightgray;
    border-bottom: 2px solid lightgray;
    transform: ${({ active }) => active ? 'rotate(-135deg)' : 'rotate(45deg)'};
    transition: all 0.2s ease-in-out;
`;

const ArrowIcon = ({ onClick, active, ...props }) => {
    return (
        <ArrowIconWrapper
            {...props}
            onClick={() => onClick && onClick()}
            active={active}
        />
    )
};

ArrowIcon.propTypes = {
    active: PropTypes.bool,
    defaultIconColor: PropTypes.string.isRequired,
    hoverIconColor: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    size: PropTypes.number,
};

export default ArrowIcon;