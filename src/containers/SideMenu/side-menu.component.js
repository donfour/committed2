import React from 'react';
import THEMES from '../../constants/themes';
import { withContext } from '../../contexts';
import { SideMenuWrapper, Header, MenuItem, ThemesWrapper, ThemeIcon } from './side-menu.style';

const SideMenu = ({ setTheme }) => (
    <SideMenuWrapper>

        <Header>
            <div className="extension-name">committed</div>
            <div className="extension-version">v3.0.0</div>
        </Header>

        <MenuItem>Customize theme</MenuItem>
        <ThemesWrapper>
            {
                THEMES.map(theme => (
                    <ThemeIcon
                        key={theme.id}
                        theme={theme}
                        onClick={() => setTheme(theme.id)}
                    >C</ThemeIcon>
                ))
            }
        </ThemesWrapper>

        <MenuItem>Customize clock</MenuItem>

    </SideMenuWrapper>
)

export default withContext(SideMenu);