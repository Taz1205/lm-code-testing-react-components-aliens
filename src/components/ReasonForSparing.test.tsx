import { render, screen, fireEvent } from "@testing-library/react";
import ReasonForSparing from "./ReasonForSparing";
import userEvent from "@testing-library/user-event";

test("renders ReasonForSparing component", () => {
  render(<ReasonForSparing value="" onChange={() => {}} />);
  const labelElement = screen.getByText(/Reason for Sparing/i);
  expect(labelElement).toBeInTheDocument();
});
test("renders ReasonForSparing component and checks onChange", async () => {
  const mockOnChange = jest.fn();
  const { rerender } = render(
    <ReasonForSparing value="" onChange={mockOnChange} />
  );

  const input = screen.getByRole("textbox");

  await userEvent.type(input, "We can help each other");

  expect(mockOnChange).toHaveBeenCalledTimes(22);

  const newValue = "We can help each other";
  mockOnChange.mockImplementation((event) => {
    rerender(<ReasonForSparing value={newValue} onChange={mockOnChange} />);
  });
  fireEvent.change(input, { target: { value: newValue } });

  expect(input).toHaveValue("We can help each other");
});
