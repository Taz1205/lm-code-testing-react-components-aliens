import React, { useState } from "react";
import W12MHeader from "./W12MHeader";
import "./W12MForm.css";

interface FormData {
  species: string;
  planet: string;
  beings: string;
  answer: string;
  reason: string;
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

const W12MForm: React.FC<{ onSubmit: (data: FormData) => void }> = ({
  onSubmit,
}) => {
  const [species, setSpecies] = useState("");
  const [planet, setPlanet] = useState("");
  const [beings, setBeings] = useState("");
  const [answer, setAnswer] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ species, planet, beings, answer, reason });
    onSubmit({ species, planet, beings, answer, reason });
  };

  return (
    <section className="w12MForm">
      <W12MHeader />
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form_input">
            <label className="form_label">
              Species Name:
              <input
                className="form_text"
                type="text"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              />
            </label>
          </div>

          <div className="form_input">
            <label className="form_label">
              Planet Name:
              <input
                className="form_text"
                type="text"
                value={planet}
                onChange={(e) => setPlanet(e.target.value)}
              />
            </label>
          </div>

          <div className="form_input">
            <label className="form_label">
              Number of beings:
              <input
                className="form_text"
                type="text"
                value={beings}
                onChange={(e) => setBeings(e.target.value)}
              />
            </label>
          </div>

          <div className="form_input">
            <label className="form_label">
              What is 2 + 2:
              <select
                className="form_text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              >
                <option value="4">4</option>
                <option value="Not 4">Not 4</option>
              </select>
            </label>
          </div>

          <div className="form_input">
            <label className="form_label">
              Reason for sparing:
              <textarea
                className="form_text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </label>
          </div>

          <input className="submit_button" type="submit" value="Submit" />
        </form>
      </div>
    </section>
  );
};

const W12MFormContainer: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    species: "",
    planet: "",
    beings: "",
    answer: "",
    reason: "",
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
