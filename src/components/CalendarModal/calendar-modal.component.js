// external dependencies
import React from 'react';
import DayPicker from 'react-day-picker';
import Modal from 'react-modal';
// styled components
import { CalendarContainer, RemoveDuedateButton } from './calendar-modal.style';
// styles
import 'react-day-picker/lib/style.css';
import { MODAL_STYLES } from './calendar-modal.style';

// Accessibility. More info: http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root')

const CalendarModal = ({isOpen, onDayClick, handleCloseModal}) => (
    <Modal
      isOpen={isOpen}
      style={MODAL_STYLES}
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
            onClick={() => {
                onDayClick(null);
                handleCloseModal();
            }}
          >
            remove duedate
          </RemoveDuedateButton>
        </CalendarContainer>
    </Modal>
)

export default CalendarModal;