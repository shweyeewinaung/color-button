import { logRoles, render, screen, fireEvent } from "@testing-library/react";
import ColorButton from "./colorButton";
import { replaceCamelWithSpaces } from "./colorButton";

test("button has correct initial color and updates when clicked", () => {
  render(<ColorButton />);

  //find an element with a role of button and text of 'Change to MidnightBlue'
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  //expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  //click button
  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<ColorButton />);

  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(colorButton).toBeEnabled();

  const checkBox = screen.getByRole("checkbox");
  expect(checkBox).not.toBeChecked();
});

test("When the checkbox is checked, button should be disabled", () => {
  render(<ColorButton />);

  const checkBox = screen.getByRole("checkbox", { name: "Disable button" });
  fireEvent.click(checkBox);

  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  expect(colorButton).toBeDisabled();

  fireEvent.click(checkBox);
  expect(colorButton).toBeEnabled();
});

test("Confirm the button color is grey when it is disabled when it is red color", () => {
  render(<ColorButton />);

  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkBox = screen.getByRole("checkbox", { name: "Disable button" });

  fireEvent.click(checkBox);
  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle({ backgroundColor: "grey" });

  fireEvent.click(checkBox);
  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("Confirm the button color is grey when it is disabled when it is Midnight Blue color", () => {
  render(<ColorButton />);

  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkBox = screen.getByRole("checkbox", { name: "Disable button" });

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");

  fireEvent.click(checkBox);

  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle({ backgroundColor: "grey" });

  fireEvent.click(checkBox);

  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
