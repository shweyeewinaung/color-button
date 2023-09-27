import { logRoles, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();
  //render app
  const { container, unmount } = render(<App />);

  //add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  const hotfudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  await user.click(cherriesCheckbox);
  await user.click(hotfudgeCheckbox);

  //find and click order button
  const orderButton = screen.getByRole("button", { name: /order/i });
  await user.click(orderButton);

  //check summary information based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const totalScoops = screen.getByRole("heading", { name: /Scoops: /i });
  expect(totalScoops).toHaveTextContent("4.00");

  const totalToppings = screen.getByRole("heading", { name: /Toppings: /i });
  expect(totalToppings).toHaveTextContent("3.00");

  //accept terms and conditions and click button to confirm order
  const termsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(termsCheckbox);

  const confirmOrderBtn = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmOrderBtn);

  //confirm order number on confirmation page
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  //click "new order" button on confirmation page
  const newOrderBtn = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderBtn);

  //check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText(/Scoops total: \$/i);
  expect(scoopsTotal).toHaveTextContent("0.00");

  const toppingsTotal = await screen.findByText(/toppings total: \$/i);

  expect(toppingsTotal).toHaveTextContent("0.00");

  const GrandTotal = screen.getByRole("heading", { name: /Grand total: /i });
  expect(GrandTotal).toHaveTextContent("0.00");

  unmount();
  //do we need to await anything to avoid test errors?
});
