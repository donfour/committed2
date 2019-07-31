import React from 'react';
import styled from 'styled-components';
import { withContext } from '../../../contexts';

const DaySelectorWrapper = styled.div`
    padding-left: 44px;
`;

const Day = styled.div`
    text-align: center;
    font-size: 16px;
    color: ${({isOnRepeat, theme}) => isOnRepeat ? theme.icon.selected : theme.icon.default};
    position: relative;
    display: inline-block;
    margin: 7px;

    &:hover{
        cursor: pointer;
        color: ${({theme}) => theme.icon.hover}
    }
`;

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const DaySelector = ({ id, daysOfWeek, toggleTodoDayOfWeek, theme }) => (
    <DaySelectorWrapper>
        {
            daysOfWeek.map((isOnRepeat, index) => (
                <Day
                    key={index}
                    isOnRepeat={isOnRepeat}
                    theme={theme}
                    onClick={() => toggleTodoDayOfWeek(id, index)}
                >
                    {DAYS_OF_WEEK[index]}
                </Day>
            ))
        }
    </DaySelectorWrapper>
)

export default withContext(DaySelector);