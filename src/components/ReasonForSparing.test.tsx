import { render, screen } from "@testing-library/react";
import ReasonForSparing, { ReasonForSparingProps } from "./ReasonForSparing";
import userEvent from "@testing-library/user-event";

test("renders ReasonForSparing component", () => {
  render(<ReasonForSparing value="" onChange={() => {}} />);
  const labelElement = screen.getByText(/Reason for Sparing/i);
  expect(labelElement).toBeInTheDocument();
});
test("renders ReasonForSparing component and checks onChange", async () => {
  let value = "";
  const handleChange = jest.fn((event) => {
    value += event.target.value;
  });

  render(<ReasonForSparing value={value} onChange={handleChange} />);

  const input = screen.getByRole("textbox");

  await userEvent.type(input, "We can help each other");

  expect(handleChange).toHaveBeenCalledTimes(22);
  expect(value).toBe("We can help each other");
});

test("renders ReasonForSparing component with correct value sent via props", () => {
  render(<ReasonForSparing value="I don't want to die!" onChange={() => {}} />);

  const input = screen.getByRole("textbox");
  expect(input).toHaveValue("I don't want to die!");
});

test("does not display error when valid reason is entered", () => {
  const validReason: ReasonForSparingProps = {
    value: "We can help each other in many ways", // A valid reason
    onChange: () => {},
  };

  render(<ReasonForSparing {...validReason} />);

  expect(
    screen.queryByText("Reason must be between 17 and 153 characters")
  ).not.toBeInTheDocument();
});

test("displays error when reason is too short", async () => {
  const handleChange = jest.fn();
  render(<ReasonForSparing value="" onChange={handleChange} />);

  const input = screen.getByRole("textbox");
  await userEvent.type(input, "Short reason");

  expect(
    screen.getByText("Reason must be between 17 and 153 characters")
  ).toBeInTheDocument();
});

test("displays error when reason is too long", async () => {
  const handleChange = jest.fn();
  render(<ReasonForSparing value="" onChange={handleChange} />);

  const input = screen.getByRole("textbox");
  const longReason = "a".repeat(154);
  await userEvent.type(input, longReason);

  expect(
    screen.getByText("Reason must be between 17 and 153 characters")
  ).toBeInTheDocument();
});
