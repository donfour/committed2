import React, { useState } from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { LinkIcon } from '../../Icons';

const Input = styled.input`
    background: transparent;
    color: ${({ tooltipTextColor }) => tooltipTextColor};
    border: none;
    &::-webkit-input-placeholder{
        color: ${({ tooltipPlaceholderColor }) => tooltipPlaceholderColor};
    }
    &:focus{
        outline: none;
    }
`;

const AddLinkButtonWrapper = styled.div`
    padding-top: 4px;
`;

const ToolTip = styled(ReactTooltip)`
    background-color: ${({ tooltipBackgroundColor }) => tooltipBackgroundColor} !important;
    &:after {
        border-top-color: ${({ tooltipBackgroundColor }) => tooltipBackgroundColor} !important;
        border-top-style: solid !important;
        border-top-width: 6px !important;
    }
`

const AddLinkButton = ({ id, link, setTodoLink, ...props }) => {
    const [value, setValue] = useState('');
    console.log(props)
    return (
        <AddLinkButtonWrapper>
            <LinkIcon data-tip data-for={`add-link-${id}`} data-event='click' {...props} />
            <ToolTip
                id={`add-link-${id}`}
                effect='solid'
                clickable
                globalEventOff='click'
                afterShow={() => setValue(link || '')}
                afterHide={() => setTodoLink(id, value)}
                {...props}
            >
                <Input
                    placeholder='Paste or type a link...'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    {...props}
                />
            </ToolTip>
        </AddLinkButtonWrapper>
    )
};

AddLinkButton.propTypes = {
    id: PropTypes.string.isRequired,
    link: PropTypes.string,
    size: PropTypes.number,
    setTodoLink: PropTypes.func.isRequired,
    defaultIconColor: PropTypes.string.isRequired,
    hoverIconColor: PropTypes.string.isRequired,
    tooltipBackgroundColor: PropTypes.string.isRequired,
    tooltipPlaceholderColor: PropTypes.string.isRequired,
    tooltipTextColor: PropTypes.string.isRequired,
};

export default AddLinkButton;