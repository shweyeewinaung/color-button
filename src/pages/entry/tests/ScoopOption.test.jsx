import { logRoles } from "@testing-library/react";
import { render, screen } from "../../../test-utils/testing-library-utils";
import ScoopOptions from "../ScoopOption";
import userEvent from "@testing-library/user-event";

test("red input box for invalid scoop count", async () => {
  const user = userEvent.setup();
  render(<ScoopOptions name="Stawberry" imagePath="" />);

  const stawberryInput = await screen.findByRole("spinbutton", {
    name: "Stawberry",
  });

  await user.clear(stawberryInput);
  await user.type(stawberryInput, "-1");
  expect(stawberryInput).toHaveClass("is-invalid");

  await user.clear(stawberryInput);
  await user.type(stawberryInput, "2.4");
  expect(stawberryInput).toHaveClass("is-invalid");

  await user.clear(stawberryInput);
  await user.type(stawberryInput, "3");
  expect(stawberryInput).not.toHaveClass("is-invalid");

  await user.clear(stawberryInput);
  await user.type(stawberryInput, "15");
  expect(stawberryInput).toHaveClass("is-invalid");
});
