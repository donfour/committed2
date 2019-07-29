import styled from 'styled-components';

export const SideMenuWrapper = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    background: white;
    height:100%;
`;

export const Header = styled.div`
    margin-bottom: 10px;
    padding: 10px;
    & .extension-name {
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 18px;
    }
    & .extension-version {
        color: lightgray;
        font-size: 15px;
    }
`;

export const MenuItem = styled.div`
    padding: 10px;
    font-size: 16px;
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