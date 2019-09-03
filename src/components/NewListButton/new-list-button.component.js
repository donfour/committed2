import React from 'react';
import PropTypes from 'prop-types';
import { NewListButtonWrapper } from './new-list-button.style';

const NewListButton = ({onClick, ...props}) => (
    <NewListButtonWrapper
        onClick={()=>onClick && onClick()}
        {...props}
    >
        + New List...
    </NewListButtonWrapper>
);

NewListButton.propTypes = {
    onClick: PropTypes.func
};

export default NewListButton;