/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import SpeciesName, { SpeciesNameProps } from "./SpeciesName";
import userEvent from "@testing-library/user-event";

test("renders SpeciesName component", () => {
  render(<SpeciesName value="" onChange={() => {}} />);
  const labelElement = screen.getByText(/Species Name/i);
  expect(labelElement).toBeInTheDocument();
});

test("renders SpeciesName component and checks onChange", async () => {
  let value = "";
  const handleChange = jest.fn((event) => {
    value = event.target.value;
  });

  render(<SpeciesName value={value} onChange={handleChange} />);

  const input = await screen.findByRole("textbox");
  await userEvent.type(input, "I");

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(value).toBe("I");
});

test("renders SpeciesName component with correct value sent via props", () => {
  render(<SpeciesName value="Alien" onChange={() => {}} />);

  const input = screen.getByRole("textbox");
  expect(input).toHaveValue("Alien");
});

test("does not display error when valid species name is entered", () => {
  const validSpeciesName: SpeciesNameProps = {
    value: "Human",
    onChange: () => {},
  };

  render(<SpeciesName {...validSpeciesName} />);

  expect(
    screen.queryByText(
      "Species name must be between 3 and 23 characters,no numbers or special characters allowed"
    )
  ).not.toBeInTheDocument();
});

test("displays error when species name includes a number", async () => {
  const handleChange = jest.fn();
  render(<SpeciesName value="" onChange={handleChange} />);

  const input = screen.getByRole("textbox");
  await userEvent.type(input, "123456");

  expect(
    screen.getByText(
      "Species name must be between 3 and 23 characters,no numbers or special characters allowed"
    )
  ).toBeInTheDocument();
});
test("displays error when species name includes a special character", async () => {
  const handleChange = jest.fn();
  render(<SpeciesName value="" onChange={handleChange} />);

  const input = screen.getByRole("textbox");
  await userEvent.type(input, "Humans@%$");

  expect(
    screen.getByText(
      "Species name must be between 3 and 23 characters,no numbers or special characters allowed"
    )
  ).toBeInTheDocument();
});
test("displays error when species name's characters's length > 23", async () => {
  const handleChange = jest.fn();
  render(<SpeciesName value="" onChange={handleChange} />);

  const input = screen.getByRole("textbox");
  await userEvent.type(
    input,
    "roejgioejgioregioergioerjgioregioregoejrgiorejgiorejgioegjierogejogio"
  );

  expect(
    screen.getByText(
      "Species name must be between 3 and 23 characters,no numbers or special characters allowed"
    )
  ).toBeInTheDocument();
});
