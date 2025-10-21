import React, { useCallback, useEffect } from "react";
import {
  Controller,
  useFormContext,
  useWatch,
  type ControllerRenderProps,
  type FieldValues,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SymbolInputLeft } from "@/components/ui/symbolInputLeft";
import { SymbolInputRight } from "@/components/ui/symbolInputRight";
import type { FormBlockProps } from "@/interfaces/FormBoxInterfaces";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { hongKongDistrictsByRegion, hongKongRegions } from "@/data/exampleData";
import { CheckboxLabel } from "@/components/ui/checkboxLabel";

type RHFError = { message?: string } | string | undefined;
const ErrorText = ({ error }: { error?: RHFError }) => {
  if (!error) return null;
  if (typeof error === "string")
    return <p className="text-red-600 text-sm">{error}</p>;
  if (typeof error.message === "string")
    return <p className="text-red-600 text-sm">{error.message}</p>;
  return null;
};

const OnChangeHandler = (
  field: ControllerRenderProps<FieldValues, string>,
  e: React.ChangeEvent<HTMLInputElement>,
  inputType: string
) => {
  const value = e.target.value;
  if (inputType && inputType === "number-only") {
    const newValue = value.replace(/\D/g, "");
    field.onChange(newValue);
  } else {
    field.onChange(value);
  }
};

// AddressInput
const AddressInput: React.FC<FormBlockProps> = ({
  label,
  labelString,
  name,
  readOnly = false,
  checkboxLabel,
}) => {
  const { control } = useFormContext();
  const blockKey = name!;

  // Watch selected region
  const selectedRegion = useWatch({
    control,
    name: `${blockKey}_region`,
  });

  // Get relevant districts
  const districtsForRegion =
    selectedRegion && hongKongDistrictsByRegion[selectedRegion]
      ? hongKongDistrictsByRegion[selectedRegion]
      : [];

  return (
    <div>
      {!checkboxLabel ? (
        typeof label === "string" ? (
          <Label className="labelStyling">{label}</Label>
        ) : (
          label
        )
      ) : (
        <CheckboxLabel
          label={label as string}
          checkboxLabel={checkboxLabel}
          control={control}
          readOnly={readOnly}
        />
      )}

      <div className="flex flex-col gap-y-2">
        {[1, 2, 3].map((line) => (
          <Controller
            key={`${blockKey}_${line}`}
            name={`${blockKey}_${line}`}
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                className="rounded-full"
                readOnly={readOnly}
                placeholder={
                  typeof label === "string" && !checkboxLabel
                    ? `${label} - Line ${line}`
                    : `${labelString} - Line ${line}`
                }
                {...field}
              />
            )}
          />
        ))}

        <div className="flex flex-row gap-2">
          {/* District select depends on region */}
          <Controller
            name={`${blockKey}_district`}
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
                onOpenChange={(open) => {
                  if (!open) field.onBlur();
                }}
                disabled={readOnly || !selectedRegion} // disable until region is chosen
              >
                <SelectTrigger className="w-full rounded-full">
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {districtsForRegion.map((option) => (
                      <SelectItem key={`${label}_${option}`} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {/* Region select */}
          <Controller
            name={`${blockKey}_region`}
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
                onOpenChange={(open) => {
                  if (!open) field.onBlur();
                }}
                disabled={readOnly}
              >
                <SelectTrigger className="w-full rounded-full">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {hongKongRegions.map((option) => (
                      <SelectItem key={`${label}_${option}`} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </div>
  );
};

// SelectInput: add onOpenChange
const SelectInput: React.FC<FormBlockProps> = ({
  label,
  checkboxLabel,
  inputPlaceholder,
  selectOptions,
  selectOptionsLabels,
  name,
  readOnly = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {!checkboxLabel ? (
        typeof label === "string" ? (
          <Label className="labelStyling">{label}</Label>
        ) : (
          label
        )
      ) : (
        <CheckboxLabel
          label={label as string}
          checkboxLabel={checkboxLabel}
          control={control}
          readOnly={readOnly}
        />
      )}
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value ?? ""}
            onValueChange={field.onChange}
            onOpenChange={(open) => {
              if (!open) field.onBlur();
            }}
            disabled={readOnly}
          >
            <SelectTrigger className="w-full rounded-full">
              <SelectValue placeholder={inputPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {selectOptions?.map((option, idx) => (
                  <SelectItem key={option} value={option}>
                    {selectOptionsLabels ? selectOptionsLabels[idx] : option}
                  </SelectItem>
                )) ?? "You need to provide select options"}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      <ErrorText error={errors?.[name!]} />
    </div>
  );
};

// SymbolInputLeftWrapper: add onBlur
const SymbolInputLeftWrapper: React.FC<FormBlockProps> = ({
  label,
  inputSymbol,
  inputPlaceholder,
  inputType = "text",
  name,
  readOnly = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-y-2">
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <SymbolInputLeft
            label={label}
            symbol={inputSymbol}
            inputType={inputType}
            placeholder={inputPlaceholder || ""}
            {...field}
            onChange={(e) => OnChangeHandler(field, e, inputType as string)}
            readOnly={readOnly}
            value={field.value ?? ""}
            onBlur={field.onBlur}
          />
        )}
      />
      <ErrorText error={errors?.[name!]} />
    </div>
  );
};

// SymbolInputRightWrapper: add onBlur
const SymbolInputRightWrapper: React.FC<FormBlockProps> = ({
  label,
  inputSymbol,
  inputPlaceholder,
  inputType = "text",
  name,
  readOnly = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-y-2">
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <SymbolInputRight
            label={label}
            symbol={inputSymbol}
            readOnly={readOnly}
            inputType={inputType}
            placeholder={inputPlaceholder || ""}
            {...field}
            onChange={(e) => OnChangeHandler(field, e, inputType as string)}
            value={field.value ?? ""}
            onBlur={field.onBlur}
          />
        )}
      />
      <ErrorText error={errors?.[name!]} />
    </div>
  );
};

// InputOnly: add onBlur
const InputOnly: React.FC<FormBlockProps> = ({
  label,
  inputPlaceholder,
  inputType,
  name,
  readOnly = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Label className="labelStyling">{label}</Label>
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            readOnly={readOnly}
            value={field.value ?? ""}
            onChange={(e) => OnChangeHandler(field, e, inputType as string)}
            onBlur={field.onBlur}
            type={inputType || "text"}
            placeholder={inputPlaceholder || ""}
            className="rounded-full"
          />
        )}
      />
      <ErrorText error={errors?.[name!]} />
    </div>
  );
};

// InputSelect: add onBlur to Input, onOpenChange to Select
const InputSelect: React.FC<FormBlockProps> = ({
  label,
  inputPlaceholder,
  inputType,
  selectOptions,
  selectOptionsLabels,
  name,
  readOnly = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const inputKey = name! + "_input";
  const selectKey = name! + "_select";

  return (
    <div>
      <Label className="labelStyling">{label}</Label>
      <div className="flex gap-2">
        <Controller
          name={inputKey}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              value={field.value ?? ""}
              onChange={field.onChange}
              readOnly={readOnly}
              onBlur={field.onBlur}
              type={inputType || "text"}
              placeholder={inputPlaceholder || ""}
              className="rounded-full"
            />
          )}
        />
        <Controller
          name={selectKey}
          control={control}
          render={({ field }) => (
            <Select
              value={field.value ?? ""}
              disabled={readOnly}
              onValueChange={field.onChange}
              onOpenChange={(open) => {
                if (!open) field.onBlur();
              }}
            >
              <SelectTrigger className="basis-[30%] rounded-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {selectOptions?.map((option, idx) => (
                  <SelectItem key={option} value={option}>
                    {selectOptionsLabels ? selectOptionsLabels[idx] : option}
                  </SelectItem>
                )) ?? "You need to provide select options"}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      {(errors?.[inputKey] || errors?.[selectKey]) && (
        <div className="text-red-600 text-sm">
          <ErrorText error={errors?.[inputKey]} />
          <ErrorText error={errors?.[selectKey]} />
        </div>
      )}
    </div>
  );
};

// SymbolLeftInputSelect
const SymbolLeftInputSelect: React.FC<FormBlockProps> = ({
  label,
  inputPlaceholder,
  inputType,
  selectOptions,
  selectOptionsLabels,
  name,
  inputSymbol,
  readOnly = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const inputKey = name! + "_input";
  const selectKey = name! + "_select";
  const divStyling =
    "flex items-center border border-gray rounded-full bg-gray-100 basis-[76%]";
  const symbolStyling = "text-gray-500 select-none mx-4";
  const inputStyling = "flex-1 border-none bg-white rounded-r-full";

  return (
    <div>
      <Label className="labelStyling">{label}</Label>
      <div className="flex gap-2">
        <Controller
          name={inputKey}
          control={control}
          render={({ field }) => (
            <div className={divStyling}>
              <span className={symbolStyling}>{inputSymbol}</span>
              <Input
                {...field}
                readOnly={readOnly}
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                type={inputType || "text"}
                placeholder={inputPlaceholder || ""}
                className={inputStyling}
              />
            </div>
          )}
        />
        <Controller
          name={selectKey}
          control={control}
          render={({ field }) => (
            <Select
              disabled={readOnly}
              value={field.value ?? ""}
              onValueChange={field.onChange}
              onOpenChange={(open) => {
                if (!open) field.onBlur();
              }}
            >
              <SelectTrigger className="basis-[24%] rounded-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {selectOptions?.map((option, idx) => (
                  <SelectItem key={option} value={option}>
                    {selectOptionsLabels ? selectOptionsLabels[idx] : option}
                  </SelectItem>
                )) ?? "You need to provide select options"}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      {(errors?.[inputKey] || errors?.[selectKey]) && (
        <div className="text-red-600 text-sm">
          <ErrorText error={errors?.[inputKey]} />
          <ErrorText error={errors?.[selectKey]} />
        </div>
      )}
    </div>
  );
};

// RadioInput: add onBlur to RadioGroup
const RadioInput: React.FC<FormBlockProps> = ({
  label,
  radioOptions,
  radioOptionsLabels,
  name,
  defaultVal,
  readOnly = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <Label className="block font-semibold">{label}</Label>
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <RadioGroup
            disabled={readOnly}
            value={field.value ?? defaultVal ?? ""}
            onValueChange={field.onChange}
            onBlur={field.onBlur}
            className="flex justify-center px-4 mt-5 mb-2 gap-10 h-full items-center"
          >
            {radioOptions?.map((option, idx) => (
              <div className="flex items-center gap-2" key={option}>
                <RadioGroupItem value={option} id={`r-${idx}`} />
                <Label htmlFor={`r-${idx}`}>
                  {radioOptionsLabels ? radioOptionsLabels[idx] : option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
      <div className="mt-1">
        <ErrorText error={errors?.[name!]} />
      </div>
    </div>
  );
};

// CheckboxInput: add onBlur to each Checkbox
const CheckboxInput: React.FC<FormBlockProps> = ({
  label,
  checkboxOptions,
  checkboxOptionsLabels,
  checkboxCols,
  name,
  readOnly = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const cols = checkboxCols ? checkboxCols : 1;
  const gridCols = "grid-cols-" + cols;

  return (
    <div>
      <Label className="labelStyling">{label}</Label>
      {!checkboxOptions ? (
        <div>Please provide checkbox options</div>
      ) : (
        <Controller
          name={name!}
          control={control}
          render={({ field }) => (
            <div className={`grid ${gridCols} gap-y-2 mt-4`}>
              {checkboxOptions.map((option, index) => (
                <div key={option} className="flex flex-row mb-2.5 gap-3">
                  <Checkbox
                    className="border border-gray-400"
                    disabled={readOnly}
                    id={option}
                    checked={field.value?.includes(option) || false}
                    onCheckedChange={(checked) => {
                      const newValue =
                        field.value && Array.isArray(field.value)
                          ? [...field.value]
                          : [];
                      if (checked) {
                        if (!newValue.includes(option)) {
                          newValue.push(option);
                        }
                      } else {
                        const idx = newValue.indexOf(option);
                        if (idx > -1) {
                          newValue.splice(idx, 1);
                        }
                      }
                      field.onChange(newValue);
                    }}
                    onBlur={field.onBlur}
                  />
                  <Label className="font-semibold">
                    {checkboxOptionsLabels
                      ? checkboxOptionsLabels[index]
                      : option}
                  </Label>
                </div>
              ))}
            </div>
          )}
        />
      )}
      <ErrorText error={errors?.[name!]} />
    </div>
  );
};

const ButtonInput: React.FC<FormBlockProps> = ({
  buttonIcon,
  buttonText,
  name,
  readOnly = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  if (!name) {
    console.warn(
      "ButtonInput requires a 'name' prop to register input with RHF."
    );
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            readOnly={readOnly}
            {...field}
            className="rounded-full"
            type="text"
            placeholder="Enter text"
            onBlur={field.onBlur}
          />
        )}
      />
      <Button
        className="w-[130px] font-semibold text-[#82b152] gap-1"
        variant="ghost"
        type="button"
        onClick={() => {
          // Optional: do something on button click, e.g., log or update form state
          // console.log("Button clicked, current input value:", control.getValues(name));
        }}
      >
        {buttonIcon}
        {buttonText}
      </Button>
      <ErrorText error={errors?.[name]} />
    </div>
  );
};

const InputLabel: React.FC<FormBlockProps> = ({
  label,
  inputLabel,
  name,
  readOnly = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Label className="labelStyling">{label}</Label>
      <div className="flex gap-2">
        <Controller
          name={name!}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              readOnly={readOnly}
              value={field.value ?? ""}
              className="rounded-full"
              type="number"
              onBlur={field.onBlur}
            />
          )}
        />
        <Label>{inputLabel}</Label>
      </div>
      <ErrorText error={errors?.[name!]} />
    </div>
  );
};

const TextAreaInput: React.FC<FormBlockProps> = ({
  label,
  inputPlaceholder,
  name,
  readOnly = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Label className="labelStyling">{label}</Label>
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            readOnly={readOnly}
            className="rounded-4xl px-4 py-3"
            placeholder={inputPlaceholder}
            onBlur={field.onBlur}
          />
        )}
      />
      <ErrorText error={errors?.[name!]} />
    </div>
  );
};

const AutoCalculationDisplay: React.FC<FormBlockProps> = ({
  label,
  name,
  calculatedFrom,
  calculationFunction,
}) => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const performCalculation = useCallback(() => {
    if (calculatedFrom && calculationFunction && name) {
      // An object with all field names and values in the form
      const formValues = getValues();

      // Build an object using the field names in calculatedFrom as keys
      // and their form values as values
      // e.g., { 'discharge_order_a': '2025-08-07', 'date_of_order_a': '2024-08-07' }
      const values = calculatedFrom.reduce((resultObject, fieldName) => {
        resultObject[fieldName] = formValues[fieldName];
        return resultObject;
      }, {} as Record<string, any>);

      const calculatedResult = calculationFunction(values);
      setValue(name, calculatedResult); // Update the display field with the calculated value
    }
  }, [calculatedFrom, calculationFunction, name, setValue, getValues]);

  // Set up blur event listeners for the calculatedFrom fields
  useEffect(() => {
    if (calculatedFrom && calculatedFrom.length > 0) {
      // Perform the calculation when any of the calculatedFrom fields lose focus
      const handleFieldBlur = () => {
        performCalculation();
      };

      // Add blur event listeners to calculatedFrom fields
      calculatedFrom.forEach((fieldName) => {
        const field = document.querySelector(
          `[name="${fieldName}"]`
        ) as HTMLInputElement;
        if (field) {
          field.addEventListener("blur", handleFieldBlur);
        }
      });

      // Cleanup Function
      // Remove blur event listeners from calculatedFrom fields
      return () => {
        calculatedFrom.forEach((fieldName) => {
          const field = document.querySelector(
            `[name="${fieldName}"]`
          ) as HTMLInputElement;
          if (field) {
            field.removeEventListener("blur", handleFieldBlur);
          }
        });
      };
    }
  }, [calculatedFrom, performCalculation]);

  return (
    <div>
      <Label className="labelStyling">{label}</Label>
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            value={field.value ?? ""}
            className="rounded-full bg-gray-100"
            readOnly
            placeholder="Auto-calculated"
          />
        )}
      />
      <ErrorText error={errors?.[name!]} />
    </div>
  );
};

const formBlockRenderers: Record<string, React.FC<FormBlockProps>> = {
  address: AddressInput,
  select: SelectInput,
  symbolInputLeft: SymbolInputLeftWrapper,
  symbolInputRight: SymbolInputRightWrapper,
  input: InputOnly,
  "input-select": InputSelect,
  "symbolLeft-input-select": SymbolLeftInputSelect,
  radio: RadioInput,
  checkbox: CheckboxInput,
  "button-input": ButtonInput,
  "input-label": InputLabel,
  "text-area": TextAreaInput,
  "auto-calculation": AutoCalculationDisplay,
};

export const FormBlock: React.FC<FormBlockProps> = (props) => {
  const { type = "input" } = props;
  const Renderer = formBlockRenderers[type];

  if (!Renderer) {
    return <div>Unsupported form block type: {type}</div>;
  }

  return <Renderer {...props} />;
};
