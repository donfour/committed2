import React from 'react';
import PropTypes from 'prop-types';
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

const ToolTip = styled(ReactTooltip)`
    & span{
        color: ${({ tooltipTextColor }) => tooltipTextColor};
    }
    background-color: ${({ tooltipBackgroundColor }) => tooltipBackgroundColor} !important;
    &:after {
        border-top-color: ${({ tooltipBackgroundColor }) => tooltipBackgroundColor} !important;
        border-top-style: solid !important;
        border-top-width: 6px !important;
    }
`

const parseUrl = url => {
    if(url.startsWith('http://') || url.startsWith('https://')){
        return url;
    } else {
        return `https://${url}`;
    }
}

const LinkButton = ({id, link, ...props}) => (
    <LinkButtonWrapper>
        <LinkIcon data-tip data-for={`link-${id}`} onClick={()=> window.open(parseUrl(link), "_blank")} {...props} />
        <ToolTip id={`link-${id}`} effect='solid' {...props}>
            <span>{link}</span>
        </ToolTip>
    </LinkButtonWrapper>
);

LinkButton.propTypes = {
    tooltipBackgroundColor: PropTypes.string.isRequired,
    tooltipTextColor: PropTypes.string.isRequired,
};

export default LinkButton;