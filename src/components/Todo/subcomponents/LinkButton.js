import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { LinkIcon } from '../../Icons';

const LinkButtonWrapper = styled.div`
  height: 18px;
  width: 18px;
  margin-left: 10px;

  display: inline-block;
  vertical-align: middle;
`;

const LinkButton = ({id, link, ...props}) => (
    <LinkButtonWrapper>
        <LinkIcon data-tip data-for={`link-${id}`} onClick={()=> window.open(link, "_blank")} {...props} />
        <ReactTooltip id={`link-${id}`} effect='solid'>
            <span>{link}</span>
        </ReactTooltip>
    </LinkButtonWrapper>
);

export default LinkButton;