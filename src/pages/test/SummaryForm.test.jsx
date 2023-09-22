import { render, screen, fireEvent } from "@testing-library/react";
import { SummaryForm } from "../summary/SummaryForm";

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
