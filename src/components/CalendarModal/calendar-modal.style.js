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
    background-color: ${({buttonColor}) => buttonColor};
    color: ${({fontColor}) => fontColor};
    text-transform: uppercase;
    letter-spacing: 1px;
    width: 100%;
    height: 30px;
    transition: all 0.2s;
    
    &:hover{
        cursor: pointer;
        background-color: ${({fontColor}) => fontColor};
        color: ${({buttonColor}) => buttonColor};
    }
      
    &:focus{
        outline: none;
    }
`;

export const getModalStyles = (backgroundColor) => ({
    overlay: {
        backgroundColor: ''
    },
    content : {
        alignItems: 'center',
        backgroundColor,
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        top: 0, right: 0, left: 0, bottom: 0,
    }
})