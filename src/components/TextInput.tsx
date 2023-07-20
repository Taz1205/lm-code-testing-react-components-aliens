import { useState } from "react";

export interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate: (value: string) => boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  validate,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const error = validate(value);
    setErrorMessage(error ? "Invalid input" : undefined);
    onChange(e);
  };

  return (
    <div>
      <label>
        {label}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          aria-label={label}
        />
      </label>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default TextInput;
