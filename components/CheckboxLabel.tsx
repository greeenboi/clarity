import { CheckboxProps, SizeTokens } from "tamagui";

import { Checkbox } from "./Checkbox";
import { Check } from "./icons";

export default function CheckboxWithLabel({
  size,
  label = "Empty Label",
  ...checkboxProps
}: CheckboxProps & { size: SizeTokens; label?: string }) {
  const id = `checkbox-${(size || "").toString().slice(1)}`;
  return (
    <Checkbox
      id={id}
      size={size}
      circular
      checkbox={<Check />}
      Labelsize={size}
      labelid={id}
      label={label}
      {...checkboxProps}
    />
  );
}
