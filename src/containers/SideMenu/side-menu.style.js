import styled from 'styled-components';

export const SideMenuWrapper = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    background: white;
    height:100%;
`;

export const Header = styled.div`
    padding: 10px;
    & .extension-name {
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 18px;
    }
    & .extension-version {
        color: lightgray;
        font-size: 15px;
    }
`;

export const MenuLabel = styled.div`
    font-size: 16px;
    margin: 10px 0;
    padding: 0 10px;
`;

export const MenuItem = styled.div`
    font-size: 14px;
    padding: 0 10px;
`;

export const CheckboxGroup = styled.div`
    margin-bottom: 5px;
`;

export const ThemesWrapper = styled.div`
    column-count: 3;
    margin: 0 auto;
`;

export const ThemeIcon = styled.div`
    background: ${({theme}) => theme.background};
    color: ${({theme}) => theme.primary};
    border: ${({theme}) => theme.secondary};
    border-width: 2px;
    border-style: solid;
    height: 24px;
    width: 24px;
    margin: 5px 10px;
    display: inline-block;
    text-align: center;
    line-height: 24px;
    &:hover {
        cursor: pointer;
    }
`;

export const CustomQuoteInput = styled.input`
    box-sizing: border-box;
    width: 100%;
    margin-top: 3px;
    border: lightgray solid 1px;
    border-radius: 4px;
    padding: 5px;
    color: gray;
    &:focus {
        color: black;
    }
    &:disabled {
        background: lightgray;
        cursor: not-allowed;
    }
`;

export const Select = styled.select`
    width: 100%;
`;