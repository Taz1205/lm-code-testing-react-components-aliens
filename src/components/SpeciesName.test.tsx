import { render, screen, fireEvent } from "@testing-library/react";
import SpeciesName from "./SpeciesName";
import userEvent from "@testing-library/user-event";

test("renders SpeciesName component and tests onChange", () => {
  render(<SpeciesName value="" onChange={() => {}} />);

  expect(screen.getByText(/Species Name/i)).toBeInTheDocument();
});
test("renders SpeciesName component and checks onChange", async () => {
  const mockOnChange = jest.fn();
  const { rerender } = render(<SpeciesName value="" onChange={mockOnChange} />);

  const input = screen.getByRole("textbox");

  await userEvent.type(input, "Humans");

  expect(mockOnChange).toHaveBeenCalledTimes(6);

  const newValue = "Humans";
  mockOnChange.mockImplementation((event) => {
    rerender(<SpeciesName value={newValue} onChange={mockOnChange} />);
  });
  fireEvent.change(input, { target: { value: newValue } });

  expect(input).toHaveValue("Humans");
});
