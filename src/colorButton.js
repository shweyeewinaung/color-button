import { useState } from "react";

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}

function ColorButton() {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const newButtonColor =
    buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

  const [checked, setChecked] = useState(false);

  return (
    <>
      <button
        style={
          checked
            ? { backgroundColor: "grey" }
            : { backgroundColor: buttonColor }
        }
        onClick={() => setButtonColor(newButtonColor)}
        disabled={checked}
      >
        Change to {replaceCamelWithSpaces(newButtonColor)}
      </button>

      <input
        type="checkbox"
        value={checked}
        onClick={() => setChecked(!checked)}
        id="disabled-button-checkbox"
      />
      <label htmlFor="disabled-button-checkbox">Disable button</label>
    </>
  );
}

export default ColorButton;
