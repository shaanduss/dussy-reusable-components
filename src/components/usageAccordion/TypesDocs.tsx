import { Card, CardContent } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import { FormBlock } from "@/components/ui/form-box/form-block";
import { Plus, Phone } from "lucide-react";
import type { FormBlockProps } from "@/interfaces/FormBoxInterfaces";

// Helper to wrap a FormBlock in a minimal form context for live examples
const ExampleFormBlock = (props: FormBlockProps) => {
  const methods = useForm({ defaultValues: { [props.name || (typeof props.label === "string" ? props.label.toLowerCase().replace(/\s+/g, "_") : "")]: props.defaultVal || "" } });
  return (
    <FormProvider {...methods}>
      <form className="max-w-lg my-2">
        <FormBlock {...props} />
      </form>
    </FormProvider>
  );
};

export const TypesDocs: React.FC = () => (
  <Card className="p-6">
    <CardContent className="space-y-10">
      <div>
        <h2 className="text-xl font-bold mb-2">Form Block Types</h2>
        <p className="mb-4">Below are all supported input types, their props, and live examples.</p>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Address</h3>
        <p className="mb-2">Generates a 3-line address input block with fixed district and region options (like select inputs).</p>
        <ExampleFormBlock type="address" label="Residential Address" labelString="residential_address" />
      </div>

      {/* Select */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Select</h3>
        <p className="mb-2">Provide <code>selectOptions</code> and <code>selectOptionsLabels</code> to control dropdown values and display labels.</p>
        <p className="mb-2"><strong>Q: What is the difference between the 2 provided props?</strong><br/>The database uses <code>selectOptions</code> (e.g., "primary-school"), but <code>selectOptionsLabels</code> is what the user sees (e.g., "Primary School").</p>
        <ExampleFormBlock
          type="select"
          label="Education Level"
          name="education_level"
          selectOptions={["primary-school", "secondary-school", "bachelors", "masters", "phd"]}
          selectOptionsLabels={["Primary School", "Secondary School", "Bachelors Degree", "Masters Degree", "PhD"]}
        />
      </div>

      {/* Checkbox */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Checkbox</h3>
        <p className="mb-2">Props: <code>checkboxOptions</code>, <code>checkboxOptionsLabels</code> (like select), and <code>checkboxCols</code> (sets layout columns).</p>
        <ExampleFormBlock
          type="checkbox"
          label="Occupy With"
          name="occupy_with"
          checkboxOptions={["parent", "spouse", "children", "sibling", "self", "others"]}
          checkboxOptionsLabels={["Parent(s)", "Spouse", "Children", "Sibling(s)", "Self", "Others"]}
          checkboxCols={3}
        />
      </div>

      {/* SymbolInputLeft */}
      <div>
        <h3 className="text-lg font-semibold mb-2">SymbolInputLeft</h3>
        <p className="mb-2">Custom input with a symbol (string or React node) on the left. Use <code>inputSymbol</code> prop.</p>
        <ExampleFormBlock
          type="symbolInputLeft"
          label="Phone Number"
          name="phone_number"
          inputSymbol={<Phone className="w-4 h-4" />}
          inputPlaceholder="9123 4567"
        />
      </div>

      {/* SymbolInputRight */}
      <div>
        <h3 className="text-lg font-semibold mb-2">SymbolInputRight</h3>
        <p className="mb-2">Custom input with a symbol on the right. Use <code>inputSymbol</code> prop.</p>
        <ExampleFormBlock
          type="symbolInputRight"
          label="Flat Rate"
          name="flat_rate"
          inputSymbol="%"
          inputPlaceholder="0.0"
        />
      </div>

      {/* Input-Select */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Input-Select</h3>
        <p className="mb-2">Combines an input and a select. Provide <code>selectOptions</code> (and optionally <code>selectOptionsLabels</code>).</p>
        <ExampleFormBlock
          type="input-select"
          label="Identification *"
          name="identification"
          inputPlaceholder="A123456(7) or AB123456(7)"
          selectOptions={["HKID", "Passport"]}
          selectOptionsLabels={["HKID", "Passport"]}
        />
      </div>

      {/* Radio */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Radio</h3>
        <p className="mb-2">Props: <code>radioOptions</code> and <code>radioOptionsLabels</code>.</p>
        <ExampleFormBlock
          type="radio"
          label="Customer Type"
          name="customer_type"
          radioOptions={["personal", "company"]}
          radioOptionsLabels={["Personal", "Company"]}
        />
      </div>

      {/* Button-Input */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Button-Input</h3>
        <p className="mb-2">Renders an input with a button below. Props: <code>buttonText</code> and <code>buttonIcon</code> (e.g., <code>&lt;Plus /&gt;</code> from lucide-react).</p>
        <ExampleFormBlock
          type="button-input"
          label="Roleon"
          name="roleon"
          buttonText="Select Roleon"
          buttonIcon={<Plus className="w-4 h-4" />}
        />
      </div>

      {/* Input-Label */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Input-Label</h3>
        <p className="mb-2">Renders an input with a label (e.g., "Year(s)") next to it. Use <code>inputLabel</code> prop.</p>
        <ExampleFormBlock
          type="input-label"
          label="Living Duration"
          name="living_duration"
          inputLabel="Year(s)"
        />
      </div>

      {/* Text-Area */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Text-Area</h3>
        <p className="mb-2">No extra props needed.</p>
        <ExampleFormBlock
          type="text-area"
          label="Source Remarks"
          name="source_remarks"
          inputPlaceholder="Type your message here."
        />
      </div>

      {/* Input */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Input</h3>
        <p className="mb-2">Standard input. Props: <code>inputPlaceholder</code> and <code>inputType</code> (e.g., "text", "email").</p>
        <pre className="bg-muted text-foreground rounded-md p-4 overflow-x-auto font-mono text-sm mb-2">
{`<input placeholder={inputPlaceholder} type={inputType} />`}
        </pre>
        <ExampleFormBlock
          type="input"
          label="Company Name"
          name="company_name"
          inputPlaceholder="Enter company name"
        />
      </div>
    </CardContent>
  </Card>
);

export default TypesDocs; 