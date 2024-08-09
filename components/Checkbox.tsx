import { ComponentProps, forwardRef, ReactNode } from "react";
import { Label, SizeTokens, XStack } from "tamagui";

import { Checkbox as TCheckbox } from "../tamagui.config";

type CheckboxProps = {
  Labelsize: SizeTokens;
  labelid: string;
  label: string;
  checkbox: ReactNode;
} & ComponentProps<typeof TCheckbox>;

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checkbox, Labelsize, labelid, label, ...tButtonProps }, ref) => {
    return (
      <XStack
        width={300}
        alignItems="center"
        gap="$5"
        backgroundColor="$color.gray8"
        padding="$3"
        borderRadius="$2"
      >
        <TCheckbox {...tButtonProps} ref={ref}>
          <TCheckbox.Indicator animation="quick">
            {checkbox}
          </TCheckbox.Indicator>
        </TCheckbox>
        <Label size={Labelsize} htmlFor={labelid}>
          {label}
        </Label>
      </XStack>
    );
  },
);
