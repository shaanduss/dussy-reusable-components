export interface FormBlockProps {
  label: string | React.ReactNode;
  type: "address" | "select" | "checkbox" | "symbolInputLeft" | "symbolInputRight" | "input" | "input-select" | "radio" | "button-input" | "input-label" | "text-area" | "symbolLeft-input-select";
  layout?: "full-row" | "default" | "row-self";
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
}

export interface FormSectionProps {
  sectionName: string | React.ReactNode;
  sectionDescription?: string;
  blocks: FormBlockProps[];
  sectionNameString?: string;
}

export interface FormBoxProps {
  boxName: string | React.ReactNode;
  sections: FormSectionProps[];
  boxNameString?: string;
  nameStyling?: string;
}