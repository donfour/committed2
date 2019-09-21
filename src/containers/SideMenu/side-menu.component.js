import React, { Component } from 'react';
import THEMES from '../../constants/themes';
import { withContext } from '../../contexts';
import { SideMenuWrapper, Header, MenuLabel, MenuItem, ThemesWrapper, ThemeIcon, CustomQuoteInput, CheckboxGroup } from './side-menu.style';
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
        const { setTheme, clockSettings, setClockSettings, checkboxStyles } = this.props;
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
                        THEMES.map((theme, i) => (
                            <ThemeIcon
                                key={i}
                                theme={theme}
                                onClick={() => setTheme(i)}
                            >C</ThemeIcon>
                        ))
                    }
                </ThemesWrapper>

                <MenuLabel>Customize Clock</MenuLabel>

                <MenuItem>
                    {
                        Object.entries(checkboxSettings).map(([key, value]) => (
                            <CheckboxGroup key={key}>
                                <label>
                                    <Checkbox
                                        {...checkboxStyles}
                                        checked={value}
                                        onChange={() => setClockSettings({ ...clockSettings, [key]: !value })}
                                    />
                                    <span style={{ marginLeft: 8 }}>{key.split(/(?=[A-Z2])/).map(s => s.toLowerCase()).join(' ')}</span>
                                </label>
                            </CheckboxGroup>
                        ))
                    }
                    <CheckboxGroup>
                        <label>
                            <Checkbox
                                {...checkboxStyles}
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
                    </CheckboxGroup>
                </MenuItem>

            </SideMenuWrapper>
        )
    }
}
export default withContext(SideMenu);