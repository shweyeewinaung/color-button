import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import { SummaryForm } from "./SummaryForm";

export default function OrderSummary({ updateOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops);
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {key}: {value}
    </li>
  ));

  const toppingsArray = Object.entries(optionCounts.toppings);
  const toppingsList = toppingsArray.map(([key, value]) => (
    <li key={key}>
      {key}: {value}
    </li>
  ));

  return (
    <div>
      <h1 className="mb-4 mt-5">Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingsList}</ul>
      <SummaryForm setOrderPhase={updateOrderPhase} />
    </div>
  );
}
