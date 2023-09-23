import { useOrderDetails } from "../../contexts/OrderDetails";
import { SummaryForm } from "./SummaryForm";

export default function OrderSummary() {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops);
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>{value}</li>
  ));

  const toppingsArray = Object.keys(optionCounts.toppings);
  const toppingsList = toppingsArray.map(([key]) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {totals.scoops}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {totals.toppings}</h2>
      <ul>{toppingsList}</ul>
      <SummaryForm />
    </div>
  );
}
