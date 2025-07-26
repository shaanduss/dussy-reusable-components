import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SymbolInputLeft } from "@/components/ui/symbolInputLeft";
import { SymbolInputRight } from "@/components/ui/symbolInputRight";
import type { FormBlockProps } from "@/components/form-generator/FormBoxInterfaces";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

type RHFError = { message?: string } | string | undefined;
const ErrorText = ({ error }: { error?: RHFError }) => {
  if (!error) return null;
  if (typeof error === "string") return <p className="text-red-600 text-sm">{error}</p>;
  if (typeof error.message === "string") return <p className="text-red-600 text-sm">{error.message}</p>;
  return null;
};

// AddressInput
const AddressInput = ({
  label,
  labelString,
  name,
}: {
  label: string | React.ReactNode;
  labelString?: string;
  name?: string;
}) => {
  const { control, formState: {} } = useFormContext();
  const blockKey = name!;

  return (
    <div>
      {typeof label === "string" ? (
        <Label className="labelStyling">{label}</Label>
      ) : (
        label
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
                placeholder={
                  typeof label === "string"
                    ? `${label} - Line ${line}`
                    : `${labelString} - Line ${line}`
                }
                {...field}
              />
            )}
          />
        ))}

        <div className="flex flex-row gap-2">
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
              >
                <SelectTrigger className="w-full rounded-full">
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="new-territories">
                      Tseung Kwan O
                    </SelectItem>
                    <SelectItem value="kowloon">Hung Hom</SelectItem>
                    <SelectItem value="hk-island">Sheung Wan</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
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
              >
                <SelectTrigger className="w-full rounded-full">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="new-territories">
                      New Territories
                    </SelectItem>
                    <SelectItem value="kowloon">Kowloon</SelectItem>
                    <SelectItem value="hk-island">HK Island</SelectItem>
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
const SelectInput: React.FC<FormBlockProps> = ({ label, inputPlaceholder, selectOptions, selectOptionsLabels, name }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div>
      {typeof label === "string" ? <Label className="labelStyling">{label}</Label> : label}
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value ?? ""}
            onValueChange={field.onChange}
            onOpenChange={(open) => { if (!open) field.onBlur(); }}
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
const SymbolInputLeftWrapper: React.FC<FormBlockProps> = ({ label, inputSymbol, inputPlaceholder, name }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-y-2">
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <SymbolInputLeft
            label={label}
            symbol={inputSymbol}
            placeholder={inputPlaceholder || ""}
            {...field}
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
const SymbolInputRightWrapper: React.FC<FormBlockProps> = ({ label, inputSymbol, inputPlaceholder, name }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-y-2">
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <SymbolInputRight
            label={label}
            symbol={inputSymbol}
            placeholder={inputPlaceholder || ""}
            {...field}
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
              onValueChange={field.onChange}
              onOpenChange={(open) => { if (!open) field.onBlur(); }}
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
const SymbolLeftInputSelect: React.FC<FormBlockProps> = ({ label, inputPlaceholder, inputType, selectOptions, selectOptionsLabels, name, inputSymbol }) => {
  const { control, formState: { errors } } = useFormContext();
  const inputKey = name! + "_input";
  const selectKey = name! + "_select";
  const divStyling = "flex items-center border border-gray rounded-full bg-gray-100 basis-[76%]";
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
              value={field.value ?? ""}
              onValueChange={field.onChange}
              onOpenChange={(open) => { if (!open) field.onBlur(); }}
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
const RadioInput: React.FC<FormBlockProps> = ({ label, radioOptions, radioOptionsLabels, name, defaultVal }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col">
      <Label className="block font-semibold">{label}</Label>
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value ?? defaultVal ?? ""}
            onValueChange={field.onChange}
            onBlur={field.onBlur}
            className="flex justify-center px-4 my-2 gap-10 h-full items-center"
          >
            {radioOptions?.map((option, idx) => (
              <div className="flex items-center gap-2" key={option}>
                <RadioGroupItem value={option} id={`r-${idx}`} />
                <Label htmlFor={`r-${idx}`}>{radioOptionsLabels ? radioOptionsLabels[idx] : option}</Label>
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
const CheckboxInput: React.FC<FormBlockProps> = ({ label, checkboxOptions, checkboxOptionsLabels, checkboxCols, name }) => {
  const { control, formState: { errors } } = useFormContext();
  const cols = (checkboxCols) ? checkboxCols : 1;
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
                    id={option}
                    checked={field.value?.includes(option) || false}
                    onCheckedChange={(checked) => {
                      const newValue = (field.value && Array.isArray(field.value)) ? [...field.value] : [];
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
            <Input {...field} value={field.value ?? ""} className="rounded-full" type="number" onBlur={field.onBlur} />
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
          <Textarea {...field} className="rounded-4xl px-4 py-3" placeholder={inputPlaceholder} onBlur={field.onBlur} />
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
};

export const FormBlock: React.FC<FormBlockProps> = (props) => {
  const { type = "input" } = props;
  const Renderer = formBlockRenderers[type];

  if (!Renderer) {
    return <div>Unsupported form block type: {type}</div>;
  }

  return <Renderer {...props} />;
};
