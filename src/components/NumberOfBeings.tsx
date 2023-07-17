import React from "react";

export interface NumberOfBeingsProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberOfBeings: React.FC<NumberOfBeingsProps> = ({ value, onChange }) => (
  <>
    <div className="form_input">
      <label htmlFor="numberOfBeings" className="form_label">
        Number of beings:
        <input
          className="form_text"
          id="numberOfBeings"
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  </>
);

export default NumberOfBeings;
