import { W12MForm } from "./W12MForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

  userEvent.type(screen.getByLabelText(/Species Name/i), "Humans");
  userEvent.type(screen.getByLabelText(/Planet Name/i), "Earth");
  userEvent.type(screen.getByLabelText(/Number of beings/i), "8 billion");
  userEvent.selectOptions(screen.getByLabelText(/What is 2 \+ 2/i), "4");
  userEvent.type(
    screen.getByLabelText(/Reason for sparing/i),
    "Peaceful Species"
  );

  await userEvent.click(screen.getByRole("button", { name: /Submit/i }));

  expect(mockSubmit).toHaveBeenCalledTimes(1);
  expect(mockSubmit).toHaveBeenCalledWith({
    speciesName: "Humans",
    planetName: "Earth",
    numberOfBeings: "8 billion",
    mathTest: "4",
    reasonForSparing: "Peaceful Species",
  });
});
