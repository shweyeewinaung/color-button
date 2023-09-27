import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";

export default function OrderEntry({ updateOrderPhase }) {
  const { totals } = useOrderDetails();

  return (
    <div className="my-5">
      <Options optionType={"scoops"} />
      <Options optionType={"toppings"} />

      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>

      <Button
        onClick={() => updateOrderPhase("review")}
        variant="dark"
        className="mt-5"
        disabled={totals.scoops === 0}
      >
        Order
      </Button>
    </div>
  );
}
