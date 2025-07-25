import { z } from "zod";
import type { FormBlockProps } from "@/interfaces/FormBoxInterfaces";

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
    case "identification":
      const baseID = z
        .string()
        .nonempty("ID number is required")
        .regex(/^[A-Z]{1,2}[0-9]{6}[0-9A]$/,
          "HKID must be in format: A123456(7) or AB123456(7)")
      return isRequired ? baseID : baseID.optional();
    case "tel":
      const baseTel = z
        .string()
        .nonempty("Phone number is required")
        .regex(/^\+?[0-9\s\-()]{7,}$/, { message: "Invalid phone number" });
      return isRequired ? baseTel : baseTel.optional();

    case "email":
      return isRequired
        ? z.string().nonempty("Email is required").email("Please enter a valid email address")
        : z.email("Please enter a valid email address").optional();

    case "text":
    case undefined:
    default:
      return isRequired ? z.string().nonempty("This field is required") : z.string().optional();
  }
}

export function normalizeName(label: string): string {
  return label.toLowerCase().trim().replace(/\*+$/, "").trim().replace(/\s+/g, "_");
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