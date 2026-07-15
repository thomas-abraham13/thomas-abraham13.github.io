import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function AnalyticsConsent({ consent, onChange }) {
  const [isOpen, setIsOpen] = useState(consent === null);

  const handleChoice = (choice) => {
    onChange(choice);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        className="analytics-settings-button"
        variant="secondary"
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        Analytics settings
      </Button>
    );
  }

  return (
    <section
      className="analytics-consent"
      role="dialog"
      aria-label="Analytics preferences"
      aria-live="polite"
    >
      <p>
        This site uses Google Analytics to understand page visits, link clicks,
        and performance. Analytics starts only if you allow it.
      </p>
      <div className="analytics-consent__actions">
        <Button variant="light" onClick={() => handleChoice('granted')}>
          Allow analytics
        </Button>
        <Button variant="outline-light" onClick={() => handleChoice('denied')}>
          Reject analytics
        </Button>
      </div>
    </section>
  );
}

AnalyticsConsent.propTypes = {
  consent: PropTypes.oneOf(['granted', 'denied']),
  onChange: PropTypes.func.isRequired,
};

AnalyticsConsent.defaultProps = {
  consent: null,
};

export default AnalyticsConsent;
