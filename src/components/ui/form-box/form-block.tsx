import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../input";
import { Label } from "../label";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../select";

import { SymbolInputRight } from "../symbolInputRight";
import type { FormBlockProps } from "@/interfaces/FormBoxInterfaces";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { Textarea } from "../textarea";
import { SymbolInputLeft } from "../symbolInputLeft";

type RHFError = { message?: string } | string | undefined;
const ErrorText = ({ error }: { error?: RHFError }) => {
  if (!error) return null;
  if (typeof error === "string") return <p className="text-red-600 text-sm">{error}</p>;
  if (typeof error.message === "string") return <p className="text-red-600 text-sm">{error.message}</p>;
  return null;
};

const AddressInput = ({ label, labelString }: { label: string | React.ReactNode; labelString?: string }) => {
  const { register } = useFormContext();

  return (
    <div>
      {typeof label === "string" ? <Label className="labelStyling">{label}</Label> : label}
      <div className="flex flex-col gap-y-2">
        {[1, 2, 3].map((line) => (
          <Input
            key={line}
            type="text"
            className="rounded-full"
            placeholder={typeof label === "string" ? `${label} - Line ${line}` : `${labelString} - Line ${line}`}
            {...register(`${typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "_") : "address_line"}_${line}`)}
          />
        ))}
        <div className="flex flex-row gap-2">
          <Select>
            <SelectTrigger className="w-full rounded-full">
              <SelectValue placeholder="District" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="new-territories">Tseung Kwan O</SelectItem>
                <SelectItem value="kowloon">Hung Hom</SelectItem>
                <SelectItem value="hk-island">Sheung Wan</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full rounded-full">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="new-territories">New Territories</SelectItem>
                <SelectItem value="kowloon">Kowloon</SelectItem>
                <SelectItem value="hk-island">HK Island</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

const SelectInput: React.FC<FormBlockProps> = ({ label, inputPlaceholder, selectOptions, selectOptionsLabels, name }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div>
      <Label className="labelStyling">{label}</Label>
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value ?? ""}
            onValueChange={field.onChange}  // Correct event handler for your Select component
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

const SymbolInputLeftWrapper: React.FC<FormBlockProps> = ({ label, inputSymbol, inputPlaceholder, name }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-y-2">
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <SymbolInputLeft
            label={typeof label === "string" ? label : "error"}
            symbol={inputSymbol}
            placeholder={inputPlaceholder || ""}
            {...field}
            value={field.value ?? ""}
          />
        )}
      />
      <ErrorText error={errors?.[name!]} />
    </div>
  );
};

const SymbolInputRightWrapper: React.FC<FormBlockProps> = ({ label, inputSymbol, inputPlaceholder, name }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-y-2">
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <SymbolInputRight
            label={typeof label === "string" ? label : "error"}
            symbol={inputSymbol}
            placeholder={inputPlaceholder || ""}
            {...field}
            value={field.value ?? ""}
          />
        )}
      />
      <ErrorText error={errors?.[name!]} />
    </div>
  );
};

const InputOnly: React.FC<FormBlockProps> = ({ label, inputPlaceholder, inputType, name }) => {
  const { control, formState: { errors } } = useFormContext();

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
            onChange={field.onChange}
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

const InputSelect: React.FC<FormBlockProps> = ({ label, inputPlaceholder, inputType, selectOptions, selectOptionsLabels, name }) => {
  const { control, formState: { errors } } = useFormContext();
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
              onValueChange={field.onChange} // Correct event handler
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

const RadioInput: React.FC<FormBlockProps> = ({ label, radioOptions, radioOptionsLabels, name, defaultVal }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div>
      <Label className="block font-semibold">{label}</Label>
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value ?? defaultVal ?? ""}
            onValueChange={field.onChange} // Correct event handler for RadioGroup
            className="flex justify-center px-4 my-2 gap-10 h-full items-center"
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
      <ErrorText error={errors?.[name!]} />
    </div>
  );
};

const CheckboxInput: React.FC<FormBlockProps> = ({ label, checkboxOptions, checkboxOptionsLabels, checkboxCols, name }) => {
  const { control, formState: { errors } } = useFormContext();

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
            <div className={`grid grid-cols-${checkboxCols || 1} gap-y-2 mt-4`}>
              {checkboxOptions.map((option, index) => (
                <div key={option} className="flex flex-row mb-2.5 gap-3">
                  <Checkbox
                    id={option}
                    checked={field.value?.includes(option) || false}
                    onChange={() => {
                      const newValue = field.value ? [...field.value] : [];
                      if (newValue.includes(option)) {
                        newValue.splice(newValue.indexOf(option), 1);
                      } else {
                        newValue.push(option);
                      }
                      field.onChange(newValue);
                    }}
                  />
                  <Label className="font-semibold">{checkboxOptionsLabels ? checkboxOptionsLabels[index] : option}</Label>
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

const ButtonInput: React.FC<FormBlockProps> = ({ buttonIcon, buttonText, name }) => {
  const { control, formState: { errors } } = useFormContext();

  if (!name) {
    console.warn("ButtonInput requires a 'name' prop to register input with RHF.");
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
            {...field}
            className="rounded-full"
            type="text"
            placeholder="Enter text"
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

const InputLabel: React.FC<FormBlockProps> = ({ label, inputLabel, name }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div>
      <Label className="labelStyling">{label}</Label>
      <div className="flex gap-2">
        <Controller
          name={name!}
          control={control}
          render={({ field }) => (
            <Input {...field} value={field.value ?? ""} className="rounded-full" type="number" />
          )}
        />
        <Label>{inputLabel}</Label>
      </div>
      <ErrorText error={errors?.[name!]} />
    </div>
  );
};

const TextAreaInput: React.FC<FormBlockProps> = ({ label, inputPlaceholder, name }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div>
      <Label className="labelStyling">{label}</Label>
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <Textarea {...field} className="rounded-4xl px-4 py-3" placeholder={inputPlaceholder} />
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
  radio: RadioInput,
  checkbox: CheckboxInput,
  "button-input": ButtonInput,
  "input-label": InputLabel,
  "text-area": TextAreaInput,
};

export const FormBlock: React.FC<FormBlockProps> = (props) => {
  const { type = "input" } = props;
  const Renderer = formBlockRenderers[type];

  if (!Renderer) {
    return <div>Unsupported form block type: {type}</div>;
  }

  return <Renderer {...props} />;
};
