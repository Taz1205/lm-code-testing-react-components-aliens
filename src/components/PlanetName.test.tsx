import { render, screen } from "@testing-library/react";
import PlanetName, { PlanetNameProps } from "./PlanetName";
import userEvent from "@testing-library/user-event";

test("renders PlanetName component", () => {
  render(<PlanetName value="" onChange={() => {}} />);
  const labelElement = screen.getByText(/Planet Name/i);
  expect(labelElement).toBeInTheDocument();
});
test("renders PlanetName component and checks onChange", async () => {
  let value = "";
  const mockOnChange = jest.fn((event) => {
    value = event.target.value;
  });

  render(<PlanetName value={value} onChange={mockOnChange} />);

  const input = screen.getByRole("textbox");

  await userEvent.type(input, "Earth");

  expect(mockOnChange).toHaveBeenCalledTimes(5);
});

test("renders PlanetName component with correct value sent via props", () => {
  render(<PlanetName value="MyHome" onChange={() => {}} />);

  const input = screen.getByRole("textbox");
  expect(input).toHaveValue("MyHome");
});
test("does not display error when valid planet name is entered", () => {
  const validPlanetName: PlanetNameProps = {
    value: "Earth",
    onChange: () => {},
  };
  render(<PlanetName {...validPlanetName} />);

  expect(
    screen.queryByText(
      "Planet name must be between 2 and 49 characters,numbers are allowed,but no special characters"
    )
  ).not.toBeInTheDocument();
});

test("does not display error when planet name with numbers is entered", () => {
  const validPlanetName: PlanetNameProps = {
    value: "Earth123",
    onChange: () => {},
  };
  render(<PlanetName {...validPlanetName} />);

  expect(
    screen.queryByText(
      "Planet name must be between 2 and 49 characters,numbers are allowed,but no special characters"
    )
  ).not.toBeInTheDocument();
});
test("displays error when planet name includes a special character", async () => {
  const handleChange = jest.fn();
  render(<PlanetName value="" onChange={handleChange} />);

  const input = screen.getByRole("textbox");
  await userEvent.type(input, "Humans@%$");

  expect(
    screen.getByText(
      "Planet name must be between 2 and 49 characters,numbers are allowed,but no special characters"
    )
  ).toBeInTheDocument();
});
test("displays error when planet name's characters's length > 49", async () => {
  const handleChange = jest.fn();
  render(<PlanetName value="" onChange={handleChange} />);

  const input = screen.getByRole("textbox");
  await userEvent.type(
    input,
    "roejgioejgioregioergioerjgioregioregoejrgiorejgiorejgioegjierogejogio"
  );

  expect(
    screen.getByText(
      "Planet name must be between 2 and 49 characters,numbers are allowed,but no special characters"
    )
  ).toBeInTheDocument();
});
