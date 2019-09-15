import React, { Component } from 'react';
import THEMES from '../../constants/themes';
import { withContext } from '../../contexts';
import { SideMenuWrapper, Header, MenuLabel, MenuItem, ThemesWrapper, ThemeIcon, CustomQuoteInput } from './side-menu.style';
import Checkbox from './checkbox';

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.quoteInput = React.createRef();
    }

    componentDidUpdate() {
        const { open, clockSettings } = this.props;
        if (open && clockSettings.customQuote) {
            this.quoteInput.current.focus();
        }
    }

    render() {
        const { setTheme, clockSettings, setClockSettings } = this.props;
        const { customQuote, ...checkboxSettings } = clockSettings;

        return (
            <SideMenuWrapper>

                <Header>
                    <div className="extension-name">committed</div>
                    <div className="extension-version">v3.0.0</div>
                </Header>

                <MenuLabel>Choose Theme</MenuLabel>

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

                <MenuLabel>Customize Input Field</MenuLabel>

                <MenuItem>
                    {
                        Object.entries(checkboxSettings).map(([key, value]) => (
                            <div key={key}>
                                <label>
                                    <Checkbox
                                        checked={value}
                                        onChange={() => setClockSettings({ ...clockSettings, [key]: !value })}
                                    />
                                    <span style={{ marginLeft: 8 }}>{key.split(/(?=[A-Z2])/).map(s => s.toLowerCase()).join(' ')}</span>
                                </label>
                            </div>
                        ))
                    }

                    <div>
                        <label>
                            <Checkbox
                                checked={!!customQuote}
                                onChange={() => setClockSettings({ ...clockSettings, customQuote: !!customQuote ? null : 'your quote here...' })}
                            />
                            <span style={{ marginLeft: 8 }}>show custom quote</span>
                        </label>
                        <CustomQuoteInput
                            ref={this.quoteInput}
                            value={customQuote || 'your quote here...'}
                            disabled={!customQuote}
                            onChange={e => setClockSettings({ ...clockSettings, customQuote: e.target.value })}
                        />
                    </div>
                </MenuItem>

            </SideMenuWrapper>
        )
    }
}
export default withContext(SideMenu);