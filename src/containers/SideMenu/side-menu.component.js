import React, { Component } from 'react';
import THEMES from '../../constants/themes';
import { withContext } from '../../contexts';
import {
    CheckboxGroup,
    CustomQuoteInput,
    Header,
    MenuItem,
    MenuLabel,
    Select,
    SideMenuWrapper,
    ThemeIcon,
    ThemesWrapper,
} from './side-menu.style';
import Checkbox from './checkbox';
import { FILTER_OPTIONS } from '../../constants/enums';
class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.quoteInput = React.createRef();
    }

    componentDidUpdate() {
        const { open, clockSettings } = this.props;
        if (open && clockSettings.customQuote.value) {
            this.quoteInput.current.focus();
        }
    }

    render() {
        const { setTheme, clockSettings, setClockSettings, todoSettings, setTodoSettings, checkboxStyles } = this.props;
        const { customQuote, ...checkboxSettings } = clockSettings;
        const { hideCompleted, filterByDuedate } = todoSettings;

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

                <MenuLabel>Clock Settings</MenuLabel>

                <MenuItem>
                    {
                        Object.entries(checkboxSettings).map(([key, { label, value }]) => (
                            <CheckboxGroup key={key}>
                                <label>
                                    <Checkbox
                                        {...checkboxStyles}
                                        checked={value}
                                        onChange={() => setClockSettings({ [key]: !value })}
                                    />
                                    <span style={{ marginLeft: 8 }}>{label}</span>
                                </label>
                            </CheckboxGroup>
                        ))
                    }
                    <CheckboxGroup>
                        <label>
                            <Checkbox
                                {...checkboxStyles}
                                checked={!!customQuote.value}
                                onChange={() => setClockSettings({ customQuote: !!customQuote.value ? null : 'your quote here...' })}
                            />
                            <span style={{ marginLeft: 8 }}>Show custom quote</span>
                        </label>
                        <CustomQuoteInput
                            ref={this.quoteInput}
                            value={customQuote.value || 'your quote here...'}
                            disabled={!customQuote.value}
                            onChange={e => setClockSettings({ customQuote: e.target.value })}
                        />
                    </CheckboxGroup>
                </MenuItem>

                <MenuLabel>Filter Todos</MenuLabel>

                <MenuItem>

                    <CheckboxGroup>
                        <label>
                            <Checkbox
                                {...checkboxStyles}
                                checked={hideCompleted.value}
                                onChange={() => setTodoSettings({ hideCompleted: !hideCompleted.value })}
                            />
                            <span style={{ marginLeft: 8 }}>{hideCompleted.label}</span>
                        </label>
                    </CheckboxGroup>

                    <CheckboxGroup>
                        <Select
                            value={filterByDuedate.value}
                            onChange={e => setTodoSettings({ filterByDuedate: e.target.value })}
                        >
                            {
                                Object.entries(FILTER_OPTIONS).map(([key, value]) => (
                                    <option
                                        key={key}
                                        value={value}
                                    >
                                        {value}
                                    </option>
                                ))
                            }
                        </Select>
                    </CheckboxGroup>

                </MenuItem>

            </SideMenuWrapper>
        )
    }
}
export default withContext(SideMenu);