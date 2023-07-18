import React, { useState } from "react";
import "../App.css";

export interface PlanetNameProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PlanetName: React.FC<PlanetNameProps> = ({ value, onChange }) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const validate = (value: string) => {
    if (value.length < 2 || value.length > 49) {
      return "Must be between 2 and 49 characters";
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
      return "Numbers are allowed, but no special characters";
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(validate(e.target.value));
    onChange(e);
  };

  return (
    <div className="form_input">
      <label className="form_label" htmlFor="planetName">
        Planet Name:
        <input
          className="form_text"
          id="planetName"
          type="text"
          value={value}
          onChange={handleChange}
        />
      </label>
      {errorMessage && <span className="error_message">{errorMessage}</span>}
    </div>
  );
};

export default PlanetName;
