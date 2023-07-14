import React from "react";

interface MathTestProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MathTest: React.FC<MathTestProps> = ({ value, onChange }) => (
  <>
    <div className="form_input">
      <label htmlFor="mathTest" className="form_label">
        What is 2 + 2:
        <select
          id="mathTest"
          className="form_text"
          value={value}
          onChange={onChange}
        >
          <option value="4">4</option>
          <option value="Not 4">Not 4</option>
        </select>
      </label>
    </div>
  </>
);

export default MathTest;
