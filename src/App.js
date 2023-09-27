import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirm/OrderConfirmation";
import { useState } from "react";

function App() {
  const [orderPhase, setOrderPhase] = useState("inprogress");

  function updateOrderPhase(phase) {
    setOrderPhase(phase);
  }

  return (
    <Container>
      <OrderDetailsProvider>
        {orderPhase === "inprogress" ? (
          <OrderEntry updateOrderPhase={updateOrderPhase} />
        ) : orderPhase === "review" ? (
          <OrderSummary updateOrderPhase={updateOrderPhase} />
        ) : (
          <OrderConfirmation updateOrderPhase={updateOrderPhase} />
        )}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
