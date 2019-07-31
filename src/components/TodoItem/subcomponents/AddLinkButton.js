import React, { useState } from 'react';
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
    padding-top: 12px;
`;

const AddLinkButton = ({id, size, theme, link, setTodoLink}) => {
    const [value, setValue] = useState('');

    return (
        <AddLinkButtonWrapper>
            <LinkIcon data-tip data-for={`add-link-${id}`} data-event='click' size={size} theme={theme}/>
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

export default AddLinkButton;