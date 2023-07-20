import React, { useState } from "react";
import "../App.css";

export interface MathTestProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MathTest: React.FC<MathTestProps> = ({ value, onChange }) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const validate = (value: string) => {
    if (value !== "4") {
      return "Incorrect answer,2 + 2 equals 4";
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setErrorMessage(validate(e.target.value));
    onChange(e);
  };

  return (
    <div className="form_input">
      <label className="form_label" htmlFor="mathTest">
        What is 2 + 2:
        <select id="mathTest" value={value} onChange={handleChange}>
          <option value="4">4</option>
          <option value="Not 4">Not 4</option>
        </select>
      </label>
      {errorMessage && <span className="error_message">{errorMessage}</span>}
    </div>
  );
};

export default MathTest;
