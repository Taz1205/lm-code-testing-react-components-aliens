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
  const [mathTest, setMathTest] = useState<string>("");
  const [reasonForSparing, setReasonForSparing] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      speciesName,
      planetName,
      numberOfBeings,
      mathTest,
      reasonForSparing,
    });
    onSubmit({
      speciesName,
      planetName,
      numberOfBeings,
      mathTest,
      reasonForSparing,
    });
  };

  return (
    <section className="w12MForm">
      <W12MHeader />
      <div className="form_wrapper">
        <form onSubmit={handleSubmit}>
          <SpeciesName
            value={speciesName}
            onChange={(e: any) => setSpeciesName(e.target.value)}
          />
          <PlanetName
            value={planetName}
            onChange={(e: any) => setPlanetName(e.target.value)}
          />
          <NumberOfBeings
            value={numberOfBeings}
            onChange={(e: any) => setNumberOfBeings(e.target.value)}
          />
          <MathTest
            value={mathTest}
            onChange={(e: any) => setMathTest(e.target.value)}
          />
          <ReasonForSparing
            value={reasonForSparing}
            onChange={(e: any) => setReasonForSparing(e.target.value)}
          />

          <input className="submit_button" type="submit" value="Submit" />
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
