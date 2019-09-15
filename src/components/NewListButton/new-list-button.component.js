import React from 'react';
import PropTypes from 'prop-types';
import { NewListButtonWrapper } from './new-list-button.style';

const NewListButton = ({onClick, ...props}) => (
    <NewListButtonWrapper
        onClick={(e)=>onClick && onClick(e)}
        {...props}
    >
        + New List...
    </NewListButtonWrapper>
);

NewListButton.propTypes = {
    onClick: PropTypes.func,
    textColor: PropTypes.string.isRequired
};

export default NewListButton;