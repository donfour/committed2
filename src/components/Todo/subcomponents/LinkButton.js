import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { LinkIcon } from '../../Icons';

const LinkButtonWrapper = styled.div`
  margin-left: 10px;
  display: inline-block;
  height: 15px;
  width: 15px;
  & svg {
    fill: lightgray
  }
`;

const LinkButton = ({id, link, theme}) => (
    <LinkButtonWrapper>
        <LinkIcon data-tip data-for={`link-${id}`} theme={theme} onClick={()=> window.open(link, "_blank")}/>
        <ReactTooltip id={`link-${id}`} effect='solid'>
            <span>{link}</span>
        </ReactTooltip>
    </LinkButtonWrapper>
);

export default LinkButton;