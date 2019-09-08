import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const SIZES = {
  small: {
    lib: { height: 2,   width: 12, borderRadius: 2 },
    can: { height: 12,  width: 10, borderRadius: 3 }
  },
  medium: {
    lib: { height: 3,   width: 17, borderRadius: 3 },
    can: { height: 15,  width: 13, borderRadius: 4 }
  },
  large : {
    lib: { height: 4,   width: 22, borderRadius: 4 },
    can: { height: 18,  width: 16, borderRadius: 5 }
  }
}

const LibAnimation = keyframes`
  0%,
  100% {
    transform: translateY(0) skewY(0);
  }
  20% {
    transform: translateY(-5px) skewY(-10deg);
  }
  40% {
    transform: translateY(-5px) skewY(10deg);
  }
  80% {
    transform: translateY(-5px) skewY(-10deg);
  }
`;

const DeleteIconWrapper = styled.div`
  display: inline-block;
  &:hover {
    cursor: pointer;
  }
  &:hover span#lib {
    animation: ${LibAnimation} .4s;
    -webkit-animation: ${LibAnimation} .4s;
    -ms-animation: ${LibAnimation} .4s;
    -moz-animation: ${LibAnimation} .4s;
    -o-animation: ${LibAnimation} .4s;
  }
  &:hover span{
    background-color: ${({hoverIconColor}) => hoverIconColor};
  }
`;

const Lib = styled.span`
  background-color: ${({defaultIconColor}) => defaultIconColor};
  display: block;
  height: ${({style}) => style.lib.height}px;
  width: ${({style}) => style.lib.width}px;
  border-top-left-radius: ${({style}) => style.lib.borderRadius}px;
  border-top-right-radius: ${({style}) => style.lib.borderRadius}px;
  transition: all ease 0.4s, background-color 0;
`;

const Can = styled.span`
  background-color: ${({defaultIconColor}) => defaultIconColor};
  display: block;
  margin-top: 1px;
  margin-left: auto;
  margin-right: auto;
  border-bottom-left-radius: ${({style}) => style.can.borderRadius}px;
  border-bottom-right-radius: ${({style}) => style.can.borderRadius}px;
  height: ${({style}) => style.can.height}px;
  width: ${({style}) => style.can.width}px;
`;

const DeleteIcon = ({onClick, small, medium, large, ...props}) => {
  // size defaults to medium
  const style = small ? SIZES.small : medium ? SIZES.medium : large ? SIZES.large : SIZES.medium;
  return (
    <DeleteIconWrapper onClick={(...args) => onClick && onClick(...args)} {...props}>
      <Lib id='lib' {...props} style={style}/>
      <Can id='can' {...props} style={style}/>
    </DeleteIconWrapper>
  )
}

DeleteIcon.propTypes = {
  onClick: PropTypes.func,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  defaultIconColor: PropTypes.string.isRequired,
  hoverIconColor: PropTypes.string.isRequired,
};

export default DeleteIcon;