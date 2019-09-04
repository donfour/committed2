import React from 'react';
import styled from 'styled-components';

const DaySelectorWrapper = styled.div`
    padding-left: 44px;
`;

const Day = styled.div`
    text-align: center;
    font-size: 16px;
    color: ${({defaultIconColor, selectedIconColor, isOnRepeat}) => isOnRepeat ? selectedIconColor : defaultIconColor};
    position: relative;
    display: inline-block;
    margin: 7px;

    &:hover{
        cursor: pointer;
        color: ${({hoverIconColor}) => hoverIconColor}
    }
`;

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const DaySelector = ({ id, daysOfWeek, toggleTodoDayOfWeek, ...props }) => (
    <DaySelectorWrapper>
        {
            daysOfWeek.map((isOnRepeat, index) => (
                <Day
                    key={index}
                    isOnRepeat={isOnRepeat}
                    onClick={() => toggleTodoDayOfWeek(id, index)}
                    {...props}
                >
                    {DAYS_OF_WEEK[index]}
                </Day>
            ))
        }
    </DaySelectorWrapper>
)

export default DaySelector;