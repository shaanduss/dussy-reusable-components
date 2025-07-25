import { z } from "zod";
import type { FormBlockProps, FormBoxProps } from "@/interfaces/FormBoxInterfaces";

// Define required field names exactly as you assign them (e.g., "first_name", "last_name", etc.)
const requiredNames = new Set([
  "first_name",
  "last_name",
  "date_of_birth",
  "email_address",
  "identification_input",
  "age",
  "phone_number",
]);

export function getInputValueSchema(block: FormBlockProps & { name?: string }): z.ZodTypeAny {
  const isRequired = block.name ? requiredNames.has(block.name.toLowerCase()) : false;

  switch (block.type) {
    case "input":
      return getInputTypeSchema(block.inputType, isRequired);
    case "input-select":
      if (!block.name?.endsWith("_select")) {
        return getInputTypeSchema(block.inputType, isRequired);
      }
      else {
        return getInputTypeSchema("text", isRequired);
      }
    case "select":
      if (block.selectOptions && block.selectOptions.length > 0) {
        const enumSchema = z.enum(block.selectOptions as [string, ...string[]]);
        const schemaWithEmpty = z.union([enumSchema, z.literal("")]);

        return isRequired
          ? schemaWithEmpty.default(block.selectOptions[0])  // required with default
          : schemaWithEmpty.optional().default("");          // optional with empty string default
      }
      return isRequired ? z.string().nonempty("This field is required") : z.string().optional();
    case "radio":
      if (block.radioOptions && block.radioOptions.length > 0) {
        let enumSchema = z.enum(block.radioOptions as [string, ...string[]]);
        return isRequired ? enumSchema : enumSchema.optional();
      }
      return isRequired ? z.string().nonempty("This field is required") : z.string().optional();
    case "checkbox":
      if (block.checkboxOptions && block.checkboxOptions.length > 0) {
        let arraySchema = z.array(z.enum(block.checkboxOptions as [string, ...string[]]));
        return isRequired ? arraySchema.min(1, "At least one option must be selected") : arraySchema.optional();
      }
      return isRequired ? z.array(z.string()).min(1, "At least one option must be selected") : z.array(z.string()).optional();
    case "text-area":
      return isRequired ? z.string().nonempty("This field is required") : z.string().optional();
    case "button-input":
      return z.any();
    case "symbolInputLeft":
    case "symbolInputRight":
      return getInputTypeSchema(block.inputType, isRequired);
    case "input-label":
      return getInputTypeSchema(block.inputType || "number", isRequired);
    case "address":
      return z.any();
    default:
      return z.any();
  }
}

function getInputTypeSchema(inputType?: string, isRequired = false): z.ZodTypeAny {
  switch (inputType) {
    case "tel":
      const baseTel = z.preprocess(
        (val) => (val === "" ? undefined : val),
        z.string({
          message: "Phone number is required"
        })
        .min(1, "Phone number is required")
        .regex(/^\+?[0-9\s\-()]{7,}$/, "Invalid phone number")
      );
      return isRequired ? baseTel : baseTel.optional().or(z.literal(""));

    case "email":
      const baseEmail = z.string().email("Please enter a valid email address");
      return isRequired ? baseEmail : baseEmail.optional().or(z.literal(""));

    case "text":
    case undefined:
    default:
      return isRequired
        ? z.preprocess(
            (val) => (val === "" ? undefined : val),
            z.string({
              message: "This field is required"
            }).min(1, "This field is required")
          )
        : z.string().optional();
  }
}

function normalizeName(label: string): string {
 return label
  .toLowerCase()
  .trim()
  .replace(/\*+$/, "") // remove trailing '*'
  .trim()
  .replace(/-/g, "")       // Remove all dashes
  .trim()
  .replace(/\s+/g, "_") // replace spaces with underscores
  .trim()
  .replace(/_+/g, "_") // replace multiple underscores by a single one
  .trim();
}

export const getKey = (
  label: string | React.ReactNode,
  labelString?: string,
  name?: string
) => {
  const baseName =
    typeof label === "string" && label.length !== 0
      ? normalizeName(label as string)
      : normalizeName(labelString as string);
  const key = name ? normalizeName(name as string) : baseName;
  return key ?? undefined;
};

export function buildValidationSchema(formBoxes: FormBoxProps[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  formBoxes.forEach((box) => {
    box.sections.forEach((section) => {
      section.blocks.forEach((block) => {
        const key = getKey(block.label, block.labelString, block.name);

        if (block.type === "input-select") {
          const inputKey = key + "_input";
          const selectKey = key + "_select";

          shape[inputKey] = getInputValueSchema({ ...block, name: inputKey });
          shape[selectKey] = getInputValueSchema({ ...block, name: selectKey }).optional();
        } else {
          shape[key] = getInputValueSchema({ ...block, name: key });
        }
      });
    });
  });

  return z.object(shape);
}
export function extractDefaultValues(formBoxes: FormBoxProps[]) {
  const defaults: Record<string, any> = {};

  formBoxes.forEach(box => {
    box.sections.forEach(section => {
      section.blocks.forEach(block => {
        // get key for block
        const key = getKey(block.label, block.labelString, block.name)

        // handle default value for input-select
        if (block.type == "input-select" && key) {
          // generate key for input and select sections
          const inputKey = key + "_input";
          const selectKey = key + "_select";
          defaults[inputKey] = (block.defaultVal) ? block.defaultVal : "";
          defaults[selectKey] = (block.selectDefault) ? block.selectDefault : "";
        }
        else if (block.type == "select" && key) {
          defaults[key] = (block.selectDefault) ? block.selectDefault : "";
        }
        else if (block.type == "checkbox" && key) {
          defaults[key] = [];
        }
        else if (block.type == "radio" && key) {
          if (block.defaultVal && block.radioOptions && block.radioOptions.includes(block.defaultVal)) {
            defaults[key] = block.defaultVal;
          } else if (block.radioOptions && block.radioOptions.length > 0) {
            defaults[key] = block.radioOptions[0];
          } else {
            defaults[key] = "";
          }
        }
        else if (block.defaultVal !== undefined && key) {
          defaults[key] = block.defaultVal;
        }
        else if (key){
          defaults[key] = "";
        }
      });
    });
  });

  return defaults;
}
