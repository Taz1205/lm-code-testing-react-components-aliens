import { render, screen } from "@testing-library/react";
import NumberOfBeings, { NumberOfBeingsProps } from "./NumberOfBeings";
import userEvent from "@testing-library/user-event";

test("renders NumberOfBeings component", () => {
  render(<NumberOfBeings value="" onChange={() => {}} />);
  const labelElement = screen.getByText(/Number of Beings/i);
  expect(labelElement).toBeInTheDocument();
});
test("renders PlanetName component and checks onChange", async () => {
  let value = "";
  const mockOnChange = jest.fn((event) => {
    value = event.target.value;
  });

  render(<NumberOfBeings value={value} onChange={mockOnChange} />);

  const input = screen.getByRole("textbox");

  await userEvent.type(input, "1000000000");

  expect(mockOnChange).toHaveBeenCalledTimes(10);
});
test("renders NumberOfBeings component with correct value sent via props", () => {
  render(<NumberOfBeings value="1000000123" onChange={() => {}} />);

  const input = screen.getByRole("textbox");
  expect(input).toHaveValue("1000000123");
});
test("does not display error when valid number of beings is entered", () => {
  const validNumberOfBeings: NumberOfBeingsProps = {
    value: "1000000000",
    onChange: () => {},
  };

  render(<NumberOfBeings {...validNumberOfBeings} />);

  expect(
    screen.queryByText("Numbers ONLY. Must be at least 1,000,000,000")
  ).not.toBeInTheDocument();
});

test("displays error when number of beings is less than 1,000,000,000", async () => {
  const handleChange = jest.fn();
  render(<NumberOfBeings value="" onChange={handleChange} />);

  const input = screen.getByRole("textbox");
  await userEvent.type(input, "999999999");

  expect(
    screen.getByText("Numbers ONLY. Must be at least 1,000,000,000")
  ).toBeInTheDocument();
});

test("displays error when non-numeric characters are entered", async () => {
  const handleChange = jest.fn();
  render(<NumberOfBeings value="" onChange={handleChange} />);

  const input = screen.getByRole("textbox");
  await userEvent.type(input, "Humans");

  expect(
    screen.getByText("Numbers ONLY. Must be at least 1,000,000,000")
  ).toBeInTheDocument();
});
