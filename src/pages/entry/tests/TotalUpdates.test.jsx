import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType={"scoops"} />);

  //make sure total starts out at $0.0
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //update vanilla scoops to 1, and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when toppings change", async () => {
  const user = userEvent.setup();
  const { unmount } = render(<Options optionType={"toppings"} />);

  const toppingSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent("0.00");

  const cherriesCheckBox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckBox);
  expect(toppingSubtotal).toHaveTextContent("1.50");

  //this time we don't need to await as we already found the DOM since test found cherry checkbox
  const mmCheckBox = await screen.findByRole("checkbox", { name: "M&Ms" });
  await user.click(mmCheckBox);
  expect(toppingSubtotal).toHaveTextContent("3.00");

  await user.click(mmCheckBox);
  expect(toppingSubtotal).toHaveTextContent("1.50");

  unmount();
});

describe("grand total", () => {
  test("grand total starts at $0.00", () => {
    const { unmount } = render(<OrderEntry />);

    const grandTotalH2 = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotalH2).toHaveTextContent("0.00");

    unmount();
  });

  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotalH2 = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotalH2).toHaveTextContent("4.00");

    const cherriesCheckBox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckBox);
    expect(grandTotalH2).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotalH2 = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesCheckbox);
    expect(grandTotalH2).toHaveTextContent("1.50");

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "3");
    expect(grandTotalH2).toHaveTextContent("7.5");
  });

  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotalH2 = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    const cherriesCheckBox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    const hotfudgeCheckBox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });

    await user.click(cherriesCheckBox);
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    await user.click(hotfudgeCheckBox);
    expect(grandTotalH2).toHaveTextContent("7.00");

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "1");
    expect(grandTotalH2).toHaveTextContent("5.00");

    await user.click(hotfudgeCheckBox);
    expect(grandTotalH2).toHaveTextContent("3.5");
  });
});
