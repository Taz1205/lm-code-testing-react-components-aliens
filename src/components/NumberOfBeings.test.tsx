import { render, screen, fireEvent } from "@testing-library/react";
import NumberOfBeings from "./NumberOfBeings";
import userEvent from "@testing-library/user-event";

test("renders NumberOfBeings component", () => {
  render(<NumberOfBeings value="" onChange={() => {}} />);
  const labelElement = screen.getByText(/Number of Beings/i);
  expect(labelElement).toBeInTheDocument();
});
test("renders NumberOfBeings component and checks onChange", async () => {
  const mockOnChange = jest.fn();
  const { rerender } = render(
    <NumberOfBeings value="" onChange={mockOnChange} />
  );

  const input = screen.getByRole("textbox");

  await userEvent.type(input, "9 billion");

  expect(mockOnChange).toHaveBeenCalledTimes(9);

  const newValue = "9 billion";
  mockOnChange.mockImplementation((event) => {
    rerender(<NumberOfBeings value={newValue} onChange={mockOnChange} />);
  });
  fireEvent.change(input, { target: { value: newValue } });

  expect(input).toHaveValue("9 billion");
});
test("renders NumberOfBeings component with correct value sent via props", () => {
  render(<NumberOfBeings value="1000000" onChange={() => {}} />);

  const input = screen.getByRole("textbox");
  expect(input).toHaveValue("1000000");
});
