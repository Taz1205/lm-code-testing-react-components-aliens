import { render, screen, fireEvent } from "@testing-library/react";
import PlanetName from "./PlanetName";
import userEvent from "@testing-library/user-event";

test("renders PlanetName component", () => {
  render(<PlanetName value="" onChange={() => {}} />);
  const labelElement = screen.getByText(/Planet Name/i);
  expect(labelElement).toBeInTheDocument();
});
test("renders PlanetName component and checks onChange", async () => {
  const mockOnChange = jest.fn();
  const { rerender } = render(<PlanetName value="" onChange={mockOnChange} />);

  const input = screen.getByRole("textbox");

  await userEvent.type(input, "Earth");

  expect(mockOnChange).toHaveBeenCalledTimes(5);

  const newValue = "Earth";
  mockOnChange.mockImplementation((event) => {
    rerender(<PlanetName value={newValue} onChange={mockOnChange} />);
  });
  fireEvent.change(input, { target: { value: newValue } });

  expect(input).toHaveValue("Earth");
});
