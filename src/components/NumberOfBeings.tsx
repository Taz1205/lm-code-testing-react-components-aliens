import React, { useState } from "react";
import "../App.css";

export interface NumberOfBeingsProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberOfBeings: React.FC<NumberOfBeingsProps> = ({ value, onChange }) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const validate = (value: string) => {
    if (!/^\d+$/.test(value) || Number(value) < 1000000000) {
      return "Numbers ONLY. Must be at least 1,000,000,000";
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(validate(e.target.value));
    onChange(e);
  };

  return (
    <div className="form_input">
      <label className="form_label" htmlFor="numberOfBeings">
        Number of beings:
        <input
          className="form_text"
          id="numberOfBeings"
          type="text"
          value={value}
          onChange={handleChange}
        />
      </label>
      {errorMessage && <span className="error_message">{errorMessage}</span>}
    </div>
  );
};

export default NumberOfBeings;
