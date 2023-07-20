import React, { useState } from "react";
import "../App.css";

export interface SpeciesNameProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SpeciesName: React.FC<SpeciesNameProps> = ({ value, onChange }) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const validate = (value: string) => {
    if (value.length < 3 || value.length > 23 || !/^[a-zA-Z]+$/.test(value)) {
      return "Species name must be between 3 and 23 characters,no numbers or special characters allowed";
    }

    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(validate(e.target.value));

    onChange(e);
  };

  return (
    <div className="form_input">
      <label className="form_label" htmlFor="speciesName">
        Species Name:
        <input
          className="form_text"
          id="speciesName"
          type="text"
          value={value}
          onChange={handleChange}
        />
      </label>
      {errorMessage && <span className="error_message">{errorMessage}</span>}
    </div>
  );
};

export default SpeciesName;
