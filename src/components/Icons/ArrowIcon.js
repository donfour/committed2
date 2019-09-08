import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Arrow = styled.div`
    width: ${({ size }) => size || 8}px;
    height: ${({ size }) => size || 8}px;

    border-right: 2px solid ${({defaultIconColor}) => defaultIconColor};
    border-bottom: 2px solid ${({defaultIconColor}) => defaultIconColor};

    transform: ${({ active }) => active ? 'rotate(-135deg)' : 'rotate(45deg)'};
    transition: transform 0.2s ease-in-out;
`;

const ArrowIconWrapper = styled.div`
    padding-top: 2px;
    margin: 0 4px;
    &:hover ${Arrow}{
        cursor: pointer;
        border-right: 2px solid ${({hoverIconColor}) => hoverIconColor};
        border-bottom: 2px solid ${({hoverIconColor}) => hoverIconColor};
    }
`;

const ArrowIcon = ({ onClick, active, ...props }) => {
    return (
        <ArrowIconWrapper>
            <Arrow
                {...props}
                onClick={() => onClick && onClick()}
                active={active}
            />
        </ArrowIconWrapper>
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