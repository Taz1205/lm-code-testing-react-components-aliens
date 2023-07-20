import { W12MForm } from "./W12MForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  validateSpeciesName,
  validatePlanetName,
  validateNumberOfBeings,
  validateReasonForSparing,
} from "./validation";

test("renders form element", () => {
  const mockOnSubmit = jest.fn();

  const { container } = render(<W12MForm onSubmit={mockOnSubmit} />);

  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toHaveClass("w12MForm");
});

test("renders Submit component", () => {
  const mockSubmit = jest.fn();

  render(<W12MForm onSubmit={mockSubmit} />);
  expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
});

test("calls onSubmit prop when form is submitted", async () => {
  const mockSubmit = jest.fn();

  render(<W12MForm onSubmit={mockSubmit} />);

  await userEvent.type(
    screen.getByRole("textbox", { name: /Species Name/i }),
    "Humans"
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: /Planet Name/i }),
    "Earth123"
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: /Number Of Beings/i }),
    "9000000000"
  );
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /What is 2 \+ 2:/i }),
    ["4"]
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: /Reason For Sparing/i }),
    "We can help each other"
  );

  await userEvent.click(screen.getByRole("button", { name: /Submit/i }));

  expect(mockSubmit).toHaveBeenCalledTimes(1);
  expect(mockSubmit).toHaveBeenCalledWith({
    speciesName: "Humans",
    planetName: "Earth123",
    numberOfBeings: "9000000000",
    mathTest: "4",
    reasonForSparing: "We can help each other",
  });
});

test("validateSpeciesName returns true for valid names", () => {
  expect(validateSpeciesName("Humans")).toBe(true);
});
test("validatePlanetName returns true for valid names", () => {
  expect(validatePlanetName("Earth123")).toBe(true);
});
test("validateNumberOfBeings returns true for valid names", () => {
  expect(validateNumberOfBeings("1000000000")).toBe(true);
});
test("validateReasonForSparing returns true for valid names", () => {
  expect(validateReasonForSparing("We are a peaceful bunch of beings")).toBe(
    true
  );
});
