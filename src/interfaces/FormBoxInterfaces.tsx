export interface FormBlockProps {
  label: string | React.ReactNode;
  checkboxLabel?: string;
  type:
    | "address"
    | "select"
    | "checkbox"
    | "symbolInputLeft"
    | "symbolInputRight"
    | "input"
    | "input-select"
    | "radio"
    | "button-input"
    | "input-label"
    | "text-area"
    | "symbolLeft-input-select"
    | "auto-calculation";
  layout?: "full-row" | "default" | "row-self-start" | "row-self-end";
  selectOptions?: string[];
  selectOptionsLabels?: string[];
  checkboxOptions?: string[];
  checkboxOptionsLabels?: string[];
  checkboxCols?: number;
  inputSymbol?: string | React.ReactNode;
  inputPlaceholder?: string;
  inputType?: string;
  radioOptions?: string[];
  radioOptionsLabels?: string[];
  buttonIcon?: React.ReactNode;
  buttonText?: string;
  inputLabel?: string;
  labelString?: string;
  name?: string;
  defaultVal?: string;
  selectDefault?: string;
  readOnly?: boolean;
  calculatedFrom?: string[];
  calculationFunction?: (values: Record<string, any>) => string;
  dbColumn?: {
    [key: string]: string[];
  };
}

export interface FormSectionProps {
  sectionName: string | React.ReactNode;
  sectionDescription?: string;
  blocks: FormBlockProps[];
  sectionNameString?: string;
  sectionNameStyling?: string;
  blocksContainerStyling?: string;
  allReadOnly?: boolean;
}

export interface FormBoxProps {
  boxName: string | React.ReactNode;
  sections: FormSectionProps[];
  boxNameString?: string;
  nameStyling?: string;
  sectionNameStyling?: string;
  blocksContainerStyling?: string;
  allReadOnly?: boolean;
}
