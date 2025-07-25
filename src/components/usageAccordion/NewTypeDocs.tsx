import { Card, CardContent } from "@/components/ui/card";

export const NewTypeDocs: React.FC = () => (
  <Card className="p-6">
    <CardContent className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-2">How to Add a New Input Type</h2>
        <p className="mb-4">
          This guide explains how to extend the form generator by adding a new input type. You will:
        </p>
        <ul className="list-disc ml-5 mb-4 space-y-1">
          <li>Update the <code>FormBlockProps</code> interface to support new props</li>
          <li>Add a new renderer in <code>form-block.tsx</code></li>
          <li>Use <code>Controller</code> from <code>react-hook-form</code> for validation and form state</li>
        </ul>
      </div>

      {/* Step 1: Update the Interface */}
      <div>
        <h3 className="text-lg font-semibold mb-2">1. Update <code>FormBlockProps</code></h3>
        <p className="mb-2">
          Add your new type to the <code>type</code> union in <code>FormBlockProps</code> (in <code>src/interfaces/FormBoxInterfaces.tsx</code>), and add any new props your input needs.
        </p>
        <pre className="bg-muted text-foreground rounded-md p-4 overflow-x-auto font-mono text-sm mb-2">
{`export interface FormBlockProps {
  // ...existing props
  type: "input" | "select" | "myCustomType"; // ← add your type here
  myCustomProp?: string; // ← add any new props here
}`}
        </pre>
        <p className="mb-2">This ensures type safety and makes your new input configurable from the schema.</p>
      </div>

      {/* Step 2: Add a Renderer */}
      <div>
        <h3 className="text-lg font-semibold mb-2">2. Add a Renderer in <code>form-block.tsx</code></h3>
        <p className="mb-2">
          In <code>src/components/ui/form-box/form-block.tsx</code>, create a new React component for your input type. Use <code>Controller</code> from <code>react-hook-form</code> to connect it to form state and validation.
        </p>
        <pre className="bg-muted text-foreground rounded-md p-4 overflow-x-auto font-mono text-sm mb-2">
{`const MyCustomInput: React.FC<FormBlockProps> = ({ label, myCustomProp, name }) => {
  const { control, formState: { errors } } = useFormContext();
  return (
    <div>
      <label>{label}</label>
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <input {...field} placeholder={myCustomProp} />
        )}
      />
      {/* Show validation errors */}
      {errors?.[name!] && <span>{errors[name!].message}</span>}
    </div>
  );
};`}
        </pre>
        <p className="mb-2">Then, add your component to the <code>formBlockRenderers</code> map:</p>
        <pre className="bg-muted text-foreground rounded-md p-4 overflow-x-auto font-mono text-sm mb-2">
{`const formBlockRenderers: Record<string, React.FC<FormBlockProps>> = {
  // ...existing types
  myCustomType: MyCustomInput,
};`}
        </pre>
      </div>

      {/* Step 3: Use Controller for Validation */}
      <div>
        <h3 className="text-lg font-semibold mb-2">3. Use <code>Controller</code> for Validation</h3>
        <p className="mb-2">
          <code>Controller</code> lets you connect any custom input to React Hook Form. It provides <code>field</code> props for value, onChange, etc., and integrates with your validation schema.
        </p>
        <ul className="list-disc ml-5 mb-2 space-y-1">
          <li>Use <code>field.value</code> and <code>field.onChange</code> to control your input</li>
          <li>Show errors from <code>formState.errors</code></li>
          <li>Validation rules are defined in your schema (see <code>getInputValueSchema</code>)</li>
        </ul>
      </div>

      {/* Step 4: Best Practices */}
      <div>
        <h3 className="text-lg font-semibold mb-2">4. Best Practices & Tips</h3>
        <ul className="list-disc ml-5 space-y-2">
          <li><strong>Type Safety:</strong> Always update <code>FormBlockProps</code> for new props/types</li>
          <li><strong>Validation:</strong> Add validation logic in <code>getInputValueSchema</code> if needed</li>
          <li><strong>Reusability:</strong> Make your input component flexible with props</li>
          <li><strong>UI Consistency:</strong> Use your design system components for a consistent look</li>
          <li><strong>Testing:</strong> Test your new input in a form to ensure it works with validation and state</li>
        </ul>
      </div>
    </CardContent>
  </Card>
);

export default NewTypeDocs;