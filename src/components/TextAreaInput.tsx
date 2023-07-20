import { useState } from "react";

export interface TextAreaInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  validate: (value: string) => boolean;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  value,
  onChange,
  validate,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    const error = validate(value);
    setErrorMessage(error ? "Invalid input" : undefined);
    onChange(e);
  };

  return (
    <div>
      <label>
        {label}
        <textarea value={value} onChange={handleChange} aria-label={label} />
      </label>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default TextAreaInput;
