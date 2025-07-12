// SymbolInputRight.tsx
import { Input } from "./input";
import { Label } from "./label";

interface SymbolInputRightProps {
  symbol: string | React.ReactNode;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const SymbolInputRight: React.FC<SymbolInputRightProps> = ({
  symbol,
  label,
  placeholder = "",
  value,
  onChange,
  name,
  onBlur,
}) => {
  const labelStyling = "mb-3 pl-1 font-semibold";
  return (
    <div>
      <Label className={labelStyling}>{label}</Label>
      <div className="flex items-center border border-gray rounded-full bg-gray-100">
        {/* Input */}
        <Input
          type="text"
          placeholder={placeholder}
          className="flex-1 border-none rounded-l-full bg-white"
          value={value}
          onChange={onChange}
          name={name}
          onBlur={onBlur}
        />

        {/* Suffix */}
        <span className="text-gray-500 select-none mx-3">{symbol}</span>
      </div>
    </div>
  );
};
