// SymbolInputLeft.tsx
import type React from "react";
import { Input } from "./input";
import { Label } from "./label";

interface SymbolInputLeftProps {
  symbol: string | React.ReactNode;
  label?: string | React.ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  notRounded?: boolean;
  readOnly?: boolean;
}

export const SymbolInputLeft: React.FC<SymbolInputLeftProps> = ({
  symbol,
  label,
  placeholder = "",
  value,
  onChange,
  name,
  onBlur,
  notRounded = false,
  readOnly = false,
}) => {
  const labelStyling = label != "" ? "mb-3 pl-1 font-semibold" : "";
  const rounded = notRounded ? "rounded-sm" : "rounded-full";
  const roundedR = notRounded ? "rounded-sm" : "rounded-r-full";
  const divStyling = `flex items-center border border-gray ${rounded}`;
  const inputStyling = `flex-1 border-none bg-white ${roundedR}`;

  return (
    <div>
      {typeof label === "string" ? <Label className={labelStyling}>{label}</Label> : label}
      <div className={divStyling}>
        {/* Prefix */}
        <span className="select-none mx-4">{symbol}</span>

        {/* Input */}
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
      </div>
    </div>
  );
};
