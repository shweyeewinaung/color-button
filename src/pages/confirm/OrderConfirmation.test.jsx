import { rest } from "msw";
import { server } from "../../mocks/server";
import OrderConfirmation from "./OrderConfirmation";
import {
  render,
  screen,
  waitFor,
} from "../../test-utils/testing-library-utils";

test("for post /order API", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  const { unmount } = render(
    <OrderConfirmation updateOrderPhase={jest.fn()} />
  );

  const orderNumber = screen.getByText(/loading/i);
  expect(orderNumber).toBeInTheDocument();

  await waitFor(async () => {
    const orderNumber = screen.queryByText(/loading/i);
    expect(orderNumber).not.toBeInTheDocument();
  });

  unmount();
});
