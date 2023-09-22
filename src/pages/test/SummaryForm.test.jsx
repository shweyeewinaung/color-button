import { render, screen, fireEvent, act } from "@testing-library/react";
import { SummaryForm } from "../summary/SummaryForm";
import userEvent from "@testing-library/user-event";

test("Terms and Conditions checkbox test", () => {
  render(<SummaryForm />);

  const checkboxTc = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  expect(checkboxTc).not.toBeChecked();

  const confirmOrderBtn = screen.getByRole("button", { name: "Confirm order" });
  expect(confirmOrderBtn).toBeDisabled();

  fireEvent.click(checkboxTc);
  expect(confirmOrderBtn).toBeEnabled();

  fireEvent.click(checkboxTc);
  expect(confirmOrderBtn).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  //popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  //popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await act(async () => {
    await user.hover(termsAndConditions);
  });

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover disappears when we mouse out
  await act(async () => {
    await user.unhover(termsAndConditions);
  });
  expect(popover).not.toBeInTheDocument();
});
