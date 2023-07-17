import React from "react";

export interface ReasonForSparingProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ReasonForSparing: React.FC<ReasonForSparingProps> = ({
  value,
  onChange,
}) => (
  <>
    <div className="form_input">
      <label htmlFor="reasonForSparing" className="form_label">
        Reason for sparing:
        <textarea
          id="reasonForSparing"
          className="form_text"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  </>
);

export default ReasonForSparing;
