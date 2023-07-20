import React, { useState } from "react";
import W12MHeader from "./W12MHeader";
import "./W12MForm.css";
import SpeciesName from "./SpeciesName";
import PlanetName from "./PlanetName";
import NumberOfBeings from "./NumberOfBeings";
import MathTest from "./MathTest";
import ReasonForSparing from "./ReasonForSparing";

interface FormData {
  speciesName: string;
  planetName: string;
  numberOfBeings: string;
  mathTest: string;
  reasonForSparing: string;
}

const FormDataDisplay: React.FC<{ data: FormData; show: boolean }> = ({
  data,
  show,
}) => {
  return show ? (
    <div className="form_data_display">
      <h2>Form Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  ) : null;
};

export const W12MForm: React.FC<{ onSubmit: (data: FormData) => void }> = ({
  onSubmit,
}) => {
  const [speciesName, setSpeciesName] = useState<string>("");
  const [planetName, setPlanetName] = useState<string>("");
  const [numberOfBeings, setNumberOfBeings] = useState<string>("");
  const [mathTest, setMathTest] = useState<string>("4");
  const [reasonForSparing, setReasonForSparing] = useState<string>("");

  const [isSpeciesNameValid, setIsSpeciesNameValid] = useState<boolean>(false);
  const [isPlanetNameValid, setIsPlanetNameValid] = useState<boolean>(false);
  const [isNumberOfBeingsValid, setIsNumberOfBeingsValid] =
    useState<boolean>(false);
  const [isMathTestValid, setIsMathTestValid] = useState<boolean>(false);
  const [isReasonForSparingValid, setIsReasonForSparingValid] =
    useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      speciesName,
      planetName,
      numberOfBeings,
      mathTest,
      reasonForSparing,
    });
    if (
      isSpeciesNameValid &&
      isPlanetNameValid &&
      isNumberOfBeingsValid &&
      isMathTestValid &&
      isReasonForSparingValid
    ) {
      onSubmit({
        speciesName,
        planetName,
        numberOfBeings,
        mathTest,
        reasonForSparing,
      });
    }
  };

  const handleSpeciesNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsSpeciesNameValid(
      value !== "" &&
        value.length >= 3 &&
        value.length <= 23 &&
        /^[a-zA-Z]+$/.test(value)
    );
    setSpeciesName(value);
  };

  const handlePlanetNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsPlanetNameValid(
      value !== "" &&
        value.length >= 2 &&
        value.length <= 49 &&
        /^[a-zA-Z0-9 ]+$/.test(value)
    );
    setPlanetName(value);
  };

  const handleNumberOfBeingsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setIsNumberOfBeingsValid(
      value !== "" && /^\d+$/.test(value) && Number(value) >= 1000000000
    );
    setNumberOfBeings(value);
  };

  const handleMathTestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setIsMathTestValid(value === "4");
    setMathTest(value);
  };

  const handleReasonForSparingChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setIsReasonForSparingValid(
      value !== "" && value.length >= 17 && value.length <= 153
    );
    setReasonForSparing(value);
  };

  return (
    <section className="w12MForm">
      <W12MHeader />
      <div className="form_wrapper">
        <form onSubmit={handleSubmit}>
          <SpeciesName value={speciesName} onChange={handleSpeciesNameChange} />
          <PlanetName value={planetName} onChange={handlePlanetNameChange} />
          <NumberOfBeings
            value={numberOfBeings}
            onChange={handleNumberOfBeingsChange}
          />
          <MathTest value={mathTest} onChange={handleMathTestChange} />
          <ReasonForSparing
            value={reasonForSparing}
            onChange={handleReasonForSparingChange}
          />

          <input
            className="submit_button"
            type="submit"
            value="Submit"
            disabled={
              !isSpeciesNameValid ||
              !isPlanetNameValid ||
              !isNumberOfBeingsValid ||
              !isMathTestValid ||
              !isReasonForSparingValid
            }
          />
        </form>
      </div>
    </section>
  );
};

const W12MFormContainer: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    speciesName: "",
    planetName: "",
    numberOfBeings: "",
    mathTest: "",
    reasonForSparing: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (data: FormData) => {
    setFormData(data);
    setSubmitted(true);
  };

  return (
    <div>
      <W12MForm onSubmit={handleSubmit} />
      <FormDataDisplay data={formData} show={submitted} />
    </div>
  );
};

export default W12MFormContainer;
