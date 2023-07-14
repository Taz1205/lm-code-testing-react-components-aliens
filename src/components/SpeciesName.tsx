import React from "react";

interface SpeciesNameProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SpeciesName: React.FC<SpeciesNameProps> = ({ value, onChange }) => (
  <>
    <div className="form_input">
      <label className="form_label" htmlFor="speciesName">
        Species Name:
        <input
          className="form_text"
          id="speciesName"
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  </>
);

export default SpeciesName;
