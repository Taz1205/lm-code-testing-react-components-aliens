import { render, screen, fireEvent } from "@testing-library/react";
import MathTest, { MathTestProps } from "./MathTest";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

test("renders MathTest component", () => {
  render(<MathTest value="" onChange={() => {}} />);
  const labelElement = screen.getByText(/What is 2 \+ 2/i);
  expect(labelElement).toBeInTheDocument();
});
test("renders MathTest component and checks onChange with '4'", () => {
  const mockOnChange = jest.fn();
  const { rerender } = render(<MathTest value="" onChange={mockOnChange} />);

  const select = screen.getByRole("combobox");

  fireEvent.change(select, { target: { value: "4" } });

  expect(mockOnChange).toHaveBeenCalledTimes(1);

  const newValue = "4";
  mockOnChange.mockImplementation((event) => {
    rerender(<MathTest value={newValue} onChange={mockOnChange} />);
  });
  fireEvent.change(select, { target: { value: newValue } });

  expect(select).toHaveValue(newValue);
});

test("renders MathTest component and checks onChange with 'Not 4'", () => {
  const mockOnChange = jest.fn();
  const { rerender } = render(<MathTest value="" onChange={mockOnChange} />);

  const select = screen.getByRole("combobox");

  fireEvent.change(select, { target: { value: "Not 4" } });

  expect(mockOnChange).toHaveBeenCalledTimes(1);

  const newValue = "Not 4";
  mockOnChange.mockImplementation((event) => {
    rerender(<MathTest value={newValue} onChange={mockOnChange} />);
  });
  fireEvent.change(select, { target: { value: newValue } });

  expect(select).toHaveValue(newValue);
});

test("renders MathTest component with correct value sent via props with '4'", () => {
  render(<MathTest value="4" onChange={() => {}} />);

  const input = screen.getByRole("combobox");
  expect(input).toHaveValue("4");
});
test("renders MathTest component with correct value sent via props with 'Not 4'", () => {
  render(<MathTest value="Not 4" onChange={() => {}} />);

  const input = screen.getByRole("combobox");
  expect(input).toHaveValue("Not 4");
});
test("does not display error when correct answer is selected", () => {
  const validMathTest: MathTestProps = {
    value: "4",
    onChange: () => {},
  };

  render(<MathTest {...validMathTest} />);

  expect(
    screen.queryByText("Incorrect answer,2 + 2 equals 4")
  ).not.toBeInTheDocument();
});

test("displays error when incorrect answer is selected", async () => {
  const handleChange = jest.fn();
  render(<MathTest value="4" onChange={handleChange} />);

  const selectElement = screen.getByRole("combobox");

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    await userEvent.selectOptions(selectElement, "Not 4");
  });

  expect(
    screen.getByText("Incorrect answer,2 + 2 equals 4")
  ).toBeInTheDocument();
});
