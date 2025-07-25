import {
  Card,
  CardContent,
} from "@/components/ui/card";

const BuildValidationSchemaCode = 
`export function buildValidationSchema(formBoxes: FormBoxProps[]) {
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
}`

const ExtractDefaultValuesCode = 
`export function extractDefaultValues(formBoxes: FormBoxProps[]) {
  const defaults: Record<string, any> = {};

  formBoxes.forEach(box => {
    box.sections.forEach(section => {
      section.blocks.forEach(block => {
        let key;
        if (typeof block.label == "string") {
          key = block.label.toString().toLowerCase()
            .replace(/\\s+/g, "_")
            .replace(/[^\\w_]/g, "");
        } else if (block.labelString){
          key = block.labelString.toString().toLowerCase()
            .replace(/\\s+/g, "_")
            .replace(/[^\\w_]/g, "")
        } else {
          key = undefined;
        }

        if (block.type == "input-select" && key) {
          const inputKey = key + "_input";
          const selectKey = key + "_select";
          defaults[inputKey] = block.defaultVal || undefined;
          defaults[selectKey] = block.selectDefault || "";
        }
        else if (block.type == "select" && key) {
          defaults[key] = block.selectDefault || "";
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
}`

const GetInputValueSchemaCode = 
`export function getInputValueSchema(block: FormBlockProps & { name?: string }): z.ZodTypeAny {
  const isRequired = block.name ? requiredNames.has(block.name.toLowerCase()) : false;

  switch (block.type) {
    case "input":
      return getInputTypeSchema(block.inputType, isRequired);
    case "input-select":
      if (!block.name?.endsWith("_select")) {
        return getInputTypeSchema(block.inputType, isRequired);
      } else {
        return getInputTypeSchema("text", isRequired);
      }
    case "select":
      if (block.selectOptions && block.selectOptions.length > 0) {
        const enumSchema = z.enum(block.selectOptions as [string, ...string[]]);
        const schemaWithEmpty = z.union([enumSchema, z.literal("")]);
        return isRequired
          ? schemaWithEmpty.default(block.selectOptions[0])
          : schemaWithEmpty.optional().default("");
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
}`

const GetInputTypeSchemaCode = 
`function getInputTypeSchema(inputType?: string, isRequired = false): z.ZodTypeAny {
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
        .regex(/^\\+?[0-9\\s\\-\\(\\)]{7,}$/, { message: "Invalid phone number" });
      return isRequired ? baseTel : baseTel.optional();
    case "email":
      return isRequired 
        ? z.string().nonempty("Email is required").email("Please enter a valid email address")
        : z.string().email("Please enter a valid email address").optional();
    case "text":
    case undefined:
    default:
      return isRequired ? z.string().nonempty("This field is required") : z.string().optional();
  }
}`

const NormalizeNameCode = 
`export function normalizeName(label: string): string {
  return label.toLowerCase().trim().replace(/\\*+$/, "").trim().replace(/\\s+/g, "_");
}`

const RequiredNamesCode = 
`const requiredNames = new Set([
  "first_name",
  "last_name", 
  "date_of_birth",
  "email_address",
  "identification_input",
  "age",
  "phone_number",
]);`

const UsageExampleCode = 
`// In your component
const validationSchema = React.useMemo(() => buildValidationSchema(exampleUI), []);
const defaultValues = React.useMemo(() => extractDefaultValues(exampleUI), []);

const methods = useForm({
  resolver: zodResolver(validationSchema),
  mode: "onBlur",
  defaultValues,
  reValidateMode: "onChange",
});`

export const SchemaDocs: React.FC = () => {
  return (
    <Card className="p-6">
      <CardContent className="space-y-8">
        {/* Schema Overview Section */}
        <div>
          <h3 className="text-md md:text-xl font-semibold mb-2">Schema System Overview</h3>
          <p className="mb-4">
            The form generator uses Zod schemas for validation and React Hook Form for form management. The schema system automatically generates validation rules and default values from your form configuration.
          </p>
          <p className="mb-4">
            The schema system consists of three main functions:
          </p>
          <ul className="list-disc ml-5 mb-4 space-y-1">
            <li><code>buildValidationSchema()</code> - Generates Zod validation schemas from form configuration</li>
            <li><code>extractDefaultValues()</code> - Extracts default values from form configuration</li>
            <li><code>getInputValueSchema()</code> - Creates specific validation schemas for different input types</li>
          </ul>
        </div>

        {/* Build Validation Schema Section */}
        <div>
          <h4 className="text-md md:text-lg font-semibold mb-2">buildValidationSchema()</h4>
          <p className="mb-4">
            This function traverses your form configuration and generates a Zod schema object that matches your form structure. It handles:
          </p>
          <ul className="list-disc ml-5 mb-4 space-y-1">
            <li>Converting form block labels to schema keys using <code>normalizeName()</code></li>
            <li>Special handling for <code>input-select</code> blocks (creates separate keys for input and select)</li>
            <li>Generating appropriate validation rules for each input type</li>
          </ul>
          <pre className="bg-muted text-foreground rounded-md p-4 overflow-x-auto font-mono text-sm mb-4">
            {BuildValidationSchemaCode}
          </pre>
        </div>

        {/* Extract Default Values Section */}
        <div>
          <h4 className="text-md md:text-lg font-semibold mb-2">extractDefaultValues()</h4>
          <p className="mb-4">
            This function extracts default values from your form configuration to initialize the form. It handles:
          </p>
          <ul className="list-disc ml-5 mb-4 space-y-1">
            <li>Converting labels to keys (same as validation schema)</li>
            <li>Setting default values from <code>defaultVal</code> and <code>selectDefault</code> properties</li>
            <li>Special handling for <code>input-select</code> blocks</li>
            <li>Providing empty string defaults for fields without explicit defaults</li>
          </ul>
          <pre className="bg-muted text-foreground rounded-md p-4 overflow-x-auto font-mono text-sm mb-4">
            {ExtractDefaultValuesCode}
          </pre>
        </div>

        {/* Get Input Value Schema Section */}
        <div>
          <h4 className="text-md md:text-lg font-semibold mb-2">getInputValueSchema()</h4>
          <p className="mb-4">
            This function creates specific Zod validation schemas based on the input type and whether the field is required. It supports:
          </p>
          <div className="overflow-scroll">
            <table className="w-full border border-border rounded-lg border-separate overflow-hidden" style={{ borderSpacing: 0 }}>
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="py-3 px-5 text-left font-medium">Input Type</th>
                  <th className="py-3 text-left font-medium">Schema Generated</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    type: "input",
                    schema: "Uses getInputTypeSchema() based on inputType property"
                  },
                  {
                    type: "input-select",
                    schema: "Creates separate schemas for input and select parts"
                  },
                  {
                    type: "select",
                    schema: "Creates enum schema from selectOptions with empty string option"
                  },
                  {
                    type: "radio",
                    schema: "Creates enum schema from radioOptions"
                  },
                  {
                    type: "checkbox",
                    schema: "Creates array schema from checkboxOptions with min(1) validation"
                  },
                  {
                    type: "text-area",
                    schema: "String validation with required/optional handling"
                  },
                  {
                    type: "symbolInputLeft/Right",
                    schema: "Uses getInputTypeSchema() based on inputType"
                  },
                  {
                    type: "address",
                    schema: "Returns z.any() (no specific validation)"
                  }
                ].map(({ type, schema }) => (
                  <tr key={type} className="even:bg-muted/50">
                    <td className="border-t border-border py-3 px-5 font-mono align-top">{type}</td>
                    <td className="border-t border-border py-3 px-5">{schema}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <pre className="bg-muted text-foreground rounded-md p-4 overflow-x-auto font-mono text-sm mt-4">
            {GetInputValueSchemaCode}
          </pre>
        </div>

        {/* Get Input Type Schema Section */}
        <div>
          <h4 className="text-md md:text-lg font-semibold mb-2">getInputTypeSchema()</h4>
          <p className="mb-4">
            This function provides specific validation rules for different input types:
          </p>
          <div className="overflow-scroll">
            <table className="w-full border border-border rounded-lg border-separate overflow-hidden" style={{ borderSpacing: 0 }}>
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="py-3 px-5 text-left font-medium">Input Type</th>
                  <th className="py-3 text-left font-medium">Validation Rules</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    type: "identification",
                    rules: "HKID format: A123456(7) or AB123456(7)"
                  },
                  {
                    type: "tel",
                    rules: "Phone number format with +, digits, spaces, hyphens, parentheses"
                  },
                  {
                    type: "email",
                    rules: "Standard email validation"
                  },
                  {
                    type: "text/undefined",
                    rules: "Basic string validation (required/optional)"
                  }
                ].map(({ type, rules }) => (
                  <tr key={type} className="even:bg-muted/50">
                    <td className="border-t border-border py-3 px-5 font-mono align-top">{type}</td>
                    <td className="border-t border-border py-3 px-5">{rules}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <pre className="bg-muted text-foreground rounded-md p-4 overflow-x-auto font-mono text-sm mt-4">
            {GetInputTypeSchemaCode}
          </pre>
        </div>

        {/* Required Names Section */}
        <div>
          <h4 className="text-md md:text-lg font-semibold mb-2">Required Fields Configuration</h4>
          <p className="mb-4">
            To mark fields as required, you need to add their normalized names to the <code>requiredNames</code> set. The normalization process converts labels to lowercase, removes special characters, and replaces spaces with underscores.
          </p>
          <pre className="bg-muted text-foreground rounded-md p-4 overflow-x-auto font-mono text-sm mb-4">
            {RequiredNamesCode}
          </pre>
          <p className="mb-4">
            The <code>normalizeName()</code> function handles the conversion:
          </p>
          <pre className="bg-muted text-foreground rounded-md p-4 overflow-x-auto font-mono text-sm mb-4">
            {NormalizeNameCode}
          </pre>
          <p className="mb-4">
            <strong>Examples:</strong>
          </p>
          <ul className="list-disc ml-5 mb-4 space-y-1">
            <li>"Full Name" → "full_name"</li>
            <li>"Email Address*" → "email_address"</li>
            <li>"Phone Number" → "phone_number"</li>
          </ul>
        </div>

        {/* Usage Example Section */}
        <div>
          <h4 className="text-md md:text-lg font-semibold mb-2">Complete Usage Example</h4>
          <p className="mb-4">
            Here's how to integrate the schema system with React Hook Form:
          </p>
          <pre className="bg-muted text-foreground rounded-md p-4 overflow-x-auto font-mono text-sm mb-4">
            {UsageExampleCode}
          </pre>
          <p className="mb-4">
            <strong>Key Points:</strong>
          </p>
          <ul className="list-disc ml-5 mb-4 space-y-1">
            <li>Use <code>React.useMemo()</code> to prevent unnecessary re-generation of schemas</li>
            <li>Pass the validation schema to <code>zodResolver()</code></li>
            <li>Set <code>mode: "onBlur"</code> for real-time validation</li>
            <li>Use <code>reValidateMode: "onChange"</code> for immediate feedback</li>
          </ul>
        </div>

        {/* Best Practices Section */}
        <div>
          <h4 className="text-md md:text-lg font-semibold mb-2">Best Practices</h4>
          <ul className="list-disc ml-5 space-y-2">
            <li><strong>Consistent Naming:</strong> Use consistent label naming conventions to make required field configuration easier</li>
            <li><strong>Default Values:</strong> Always provide meaningful default values for better user experience</li>
            <li><strong>Validation Messages:</strong> Customize validation messages in <code>getInputTypeSchema()</code> for better UX</li>
            <li><strong>Performance:</strong> Use <code>useMemo()</code> for schema generation to avoid unnecessary re-renders</li>
            <li><strong>Type Safety:</strong> The schema system ensures type safety between your form configuration and validation rules</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}; 