import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PlusIconWrapper = styled.div`
    font-size: 24px;
    line-height: 15px;
    color: ${({defaultIconColor}) => defaultIconColor};
    &:hover {
        color: ${({hoverIconColor}) => hoverIconColor};
        cursor: pointer;
    }
`;

const PlusIcon = ({ onClick, ...props }) => (
    <PlusIconWrapper {...props}>+</PlusIconWrapper>
);

PlusIcon.propTypes = {
    onClick: PropTypes.func,
    size: PropTypes.number,
    defaultIconColor: PropTypes.string.isRequired,
    hoverIconColor: PropTypes.string.isRequired,
};

export default PlusIcon;