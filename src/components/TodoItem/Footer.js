import React from 'react';
import styled from 'styled-components';
import { CalendarIcon, DeleteIcon } from '../Icons';

const TodoFooterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Footer = () => (
    <TodoFooterWrapper>
        <div>Day of week list</div>
        <ButtonsWrapper>
            <CalendarIcon/>
            <DeleteIcon/>
        </ButtonsWrapper>
    </TodoFooterWrapper>
)

export default Footer;