import React, { useState } from "react";
import "../App.css";

export interface ReasonForSparingProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ReasonForSparing: React.FC<ReasonForSparingProps> = ({
  value,
  onChange,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const validate = (value: string) => {
    if (value.length < 17 || value.length > 153) {
      return "Reason must be between 17 and 153 characters";
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrorMessage(validate(e.target.value));
    onChange(e);
  };

  return (
    <div className="form_input">
      <label className="form_label" htmlFor="reasonForSparing">
        Reason for sparing:
        <textarea id="reasonForSparing" value={value} onChange={handleChange} />
      </label>
      {errorMessage && <span className="error_message">{errorMessage}</span>}
    </div>
  );
};

export default ReasonForSparing;
