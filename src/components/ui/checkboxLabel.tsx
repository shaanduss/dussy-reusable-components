import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toFormattedString } from "@/lib/utils";

export type CheckboxLabelProps = {
  label: string;
  checkboxLabel: string;
  control: any;
  readOnly?: boolean;
};

export const CheckboxLabel: React.FC<CheckboxLabelProps> = ({
  label,
  checkboxLabel,
  control,
  readOnly = false,
}) => {
  const name = toFormattedString(checkboxLabel);

  return (
    <div className="flex">
      <Label className="labelStyling">{label}</Label>
      <div className="flex flex-row items-center justify-center h-full gap-x-3 ml-1">
        <Label className="font-medium text-secondary" htmlFor={name}>
          {checkboxLabel}
        </Label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              id={name}
              className="shadow-md border-gray-400"
              disabled={readOnly}
              checked={!!field.value} // !! ensures the value to be boolean
              onCheckedChange={(checked) => field.onChange(!!checked)}
              onBlur={field.onBlur}
            />
          )}
        />
      </div>
    </div>
  );
};
