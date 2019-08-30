import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

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
  padding-top: 8px;
  padding-right: 20px;
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
  height: 3px;
  width: 17px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  transition: all ease 0.4s, background-color 0;
`;

const Can = styled.span`
  background-color: ${({defaultIconColor}) => defaultIconColor};
  display: block;
  margin-top: 1px;
  margin-left: auto;
  margin-right: auto;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  height: 15px;
  width: 13px;
`;

const DeleteIcon = ({onClick, ...props}) => (
  <DeleteIconWrapper onClick={() => onClick && onClick()} {...props}>
    <Lib id='lib' {...props}/>
    <Can id='can' {...props}/>
  </DeleteIconWrapper>
)

DeleteIcon.propTypes = {
  onClick: PropTypes.func,
  defaultIconColor: PropTypes.string.isRequired,
  hoverIconColor: PropTypes.string.isRequired,
};

export default DeleteIcon;