import styled from 'styled-components';

export const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    pointer-events: auto;
    & .DayPicker *:focus{
        outline: 0;
    }
`;

export const RemoveDuedateButton = styled.button`
    border: none;
    background-color: salmon;
    color: white;
    text-transform: uppercase;
    margin-top: 5px;
    letter-spacing: 2px;
    width: 100%;
    height: 22px;
    transition: all 0.2s;
    
    &:hover{
        cursor: pointer;
        background-color: white;
        color: gray;
      }
      
    &:focus{
    outline: none;
    }
`;

export const MODAL_STYLES = {
    content : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        background: 'transparent',
        border: 'none'
    }
};