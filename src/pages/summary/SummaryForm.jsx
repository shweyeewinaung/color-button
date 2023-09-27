import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export const SummaryForm = ({ setOrderPhase }) => {
  const [tcChecked, setTcChecked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setOrderPhase("completed");
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to{" "}
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
          className="mt-5"
        />
      </Form.Group>
      <Button
        variant="dark"
        type="submit"
        disabled={!tcChecked}
        className="mt-5"
      >
        Confirm order
      </Button>
    </Form>
  );
};
