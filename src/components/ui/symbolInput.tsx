import type React from "react";
import { Label } from "./label";
import { Input } from "@/components/ui/input";

export type SymbolInputProps = {
  symbol: string | React.ReactNode;
  label?: string | React.ReactNode;
  placeholder?: string;
  value?: string;
  inputType?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  notRounded?: boolean;
  isHeaderStyle?: boolean; // Used to set the correct styling for SymbolInput in the header (e.g., OCA header)
  isBigTableCell?: boolean; // Used to set the correct styling for Big SymbolInput in table cells (e.g., Amount Fields in OCA Details Table)
  isSmallTableCell?: boolean; // Used to set the correct styling for Small SymbolInput in table cells (e.g., Percentage Fields in OCA Details Table)
  readOnly?: boolean;
  symbolPosition?: "left" | "right";
};

export const SymbolInput: React.FC<SymbolInputProps> = ({
  symbol,
  label,
  placeholder = "",
  value,
  onChange,
  name,
  onBlur,
  notRounded = false,
  isHeaderStyle = false,
  isBigTableCell = false,
  isSmallTableCell = false,
  readOnly = false,
  symbolPosition = "left",
}) => {
  const labelStyling = label != "" ? "mb-3 pl-1 font-semibold" : "";
  const rounded = notRounded ? "rounded-sm" : "rounded-full";
  const roundedR = notRounded ? "rounded-sm" : "rounded-r-full";
  const roundedL = notRounded ? "rounded-sm" : "rounded-l-full";
  const bordered = isHeaderStyle
    ? "border-transparent shadow-lg focus-visible:border-accent focus-visible:ring-accent/50"
    : "border border-gray";
  const divStyling = `flex items-center ${rounded} bg-gray-100 ${bordered} ${
    isBigTableCell ? "min-w-32" : ""
  } ${isSmallTableCell ? "w-[100px]" : ""}`;
  const inputStyling = `flex-1 border-none bg-white ${
    symbolPosition === "left" ? roundedR : roundedL
  }`;

  return (
    <div className={isHeaderStyle ? "w-64" : ""}>
      {typeof label === "string" ? (
        <Label className={labelStyling}>{label}</Label>
      ) : (
        label
      )}
      <div className={divStyling}>
        {/* Prefix */}
        {symbolPosition === "left" && (
          <span className="text-gray-500 select-none mx-4">{symbol}</span>
        )}

        <Input
          type="text"
          placeholder={placeholder}
          className={inputStyling}
          value={value}
          onChange={onChange}
          name={name}
          onBlur={onBlur}
          readOnly={readOnly}
        />

        {/* Suffix */}
        {symbolPosition === "right" && (
          <span className="text-gray-500 select-none mx-4">{symbol}</span>
        )}
      </div>
    </div>
  );
};
