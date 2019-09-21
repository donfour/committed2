// external dependencies
import React from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import Modal from 'react-modal';
// styled components
import { CalendarContainer, RemoveDuedateButton } from './calendar-modal.style';
// styles
import 'react-day-picker/lib/style.css';
import { getModalStyles } from './calendar-modal.style';

// Accessibility. More info: http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root')

const CalendarModal = ({isOpen, onDayClick, handleCloseModal, overlayColor, buttonColor, fontColor}) => (
    <Modal
      isOpen={isOpen}
      style={getModalStyles(overlayColor || 'black')}
      contentLabel="Calendar Modal"
      closeTimeoutMS={200}
      onRequestClose={handleCloseModal}
    >
        <CalendarContainer>
          <DayPicker
            onDayClick={day => {
                onDayClick(day);
                handleCloseModal();
            }}
          />
          <RemoveDuedateButton
            buttonColor={buttonColor}
            fontColor={fontColor}
            onClick={() => {
                onDayClick(null);
                handleCloseModal();
            }}
          >
            remove duedate
          </RemoveDuedateButton>
        </CalendarContainer>
    </Modal>
);

CalendarModal.propTypes = {
  overlayColor: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
};

export default CalendarModal;