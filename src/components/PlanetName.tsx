import React from "react";

export interface PlanetNameProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PlanetName: React.FC<PlanetNameProps> = ({ value, onChange }) => (
  <>
    <div className="form_input">
      <label htmlFor="planetName" className="form_label">
        Planet Name:
        <input
          className="form_text"
          id="planetName"
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  </>
);

export default PlanetName;
