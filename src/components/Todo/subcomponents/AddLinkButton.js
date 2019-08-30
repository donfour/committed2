import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { LinkIcon } from '../../Icons';

const Input = styled.input`
    background: transparent;
    color: lightgray;
    border: none;
    &::-webkit-input-placeholder{
        color: gray;
    }
    &:focus{
        outline: none;
    }
`;

const AddLinkButtonWrapper = styled.div`
    padding-top: 4px;
`;

const AddLinkButton = ({ id, link, setTodoLink, ...props }) => {
    const [value, setValue] = useState('');
    return (
        <AddLinkButtonWrapper>
            <LinkIcon data-tip data-for={`add-link-${id}`} data-event='click' {...props} />
            <ReactTooltip
                id={`add-link-${id}`}
                effect='solid'
                clickable
                globalEventOff='click'
                afterShow={() => setValue(link || '')}
                afterHide={() => setTodoLink(id, value)}
            >
                <Input
                    placeholder='Paste or type a link...'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                />
            </ReactTooltip>
        </AddLinkButtonWrapper>
    )
};

AddLinkButton.propTypes = {
    id: PropTypes.string.isRequired,
    link: PropTypes.string,
    size: PropTypes.number,
    defaultIconColor: PropTypes.string.isRequired,
    hoverIconColor: PropTypes.string.isRequired,
    setTodoLink: PropTypes.func.isRequired
};

export default AddLinkButton;