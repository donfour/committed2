import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* code borrowed from https://medium.com/@colebemis/building-a-checkbox-component-with-react-and-styled-components-8d3aa1d826dd */

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  &:hover {
    cursor: pointer;
  }
`

const Icon = styled.svg`
  fill: none;
  stroke: ${({tickColor}) => tickColor};
  stroke-width: 2px;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${({checked, checkboxColor}) => (checked ? checkboxColor : 'lightgray')}
  border-radius: 3px;
  transition: all 150ms;

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`

const Checkbox = ({ className, checked, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked} {...props}>
      <Icon {...props} viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

Checkbox.propTypes = {
  checkboxColor: PropTypes.string.isRequired,
  tickColor: PropTypes.string.isRequired,
};

export default Checkbox;