import {
  Card,
  CardContent,
} from "@/components/ui/card";

const FormBoxPropsCode =
`export interface FormBoxProps {
  boxName: string | React.ReactNode;
  sections: FormSectionProps[];
}`

const FormSectionPropsCode =
`export interface FormSectionProps {
  sectionName: string;
  sectionDescription?: string;
  blocks: FormBlockProps[];
}`

const FormBlockPropsCode =
`export interface FormBlockProps {
  label: string | React.ReactNode;
  type: "address" | "select" | "checkbox" | "symbolInputLeft" | "symbolInputRight" | "text" | "radio";
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
}`

export const CircularProgressDocs: React.FC = () => {
  return (
    <Card className="p-6">
      <CardContent className="space-y-8">
        {/* How to use the Form Generator Section */}
        <div>
          <h3 className="text-md md:text-xl font-semibold mb-2">How to use the Form Generator</h3>
          <p className="mb-4">
            First you would need to define a dictionary array of the type <code>FormBoxProps[]</code>. Let's unpack what these props include:
          </p>

          <h4 className="text-md md:text-lg font-semibold mb-2">FormBoxProps</h4>
          <p className="mb-4">
            So a <code>FormBox</code> consists of sections and its own name, as seen here in the props. Essentially the form design is top-down:
          </p>
          <p className="mb-4">
            <code>FormBox</code> → <code>FormSection</code> → <code>FormBlock</code>
          </p>
          <p className="mb-4">
            So a box has several sections and a section has several blocks.
          </p>
          <pre className="bg-muted text-foreground rounded-md p-4 overflow-x-auto font-mono text-sm mb-4">
            {FormBoxPropsCode}
          </pre>

          <h4 className="text-md md:text-lg font-semibold mb-2">FormSectionProps</h4>
          <p className="mb-4">
            As you could imagine, here we just have a name for the section and the blocks that its made up of.
          </p>
          <pre className="bg-muted text-foreground rounded-md p-4 overflow-x-auto font-mono text-sm">
            {FormSectionPropsCode}
          </pre>
        </div>

        {/* FormBlockProps Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">FormBlockProps</h3>
          <p className="mb-4">
            Here is the tricky part, there are so many different types of blocks we use in our form and we may need very different data. First let's see the props:
          </p>
          <pre className="bg-muted text-foreground rounded-md p-4 overflow-x-auto font-mono text-sm">
            {FormBlockPropsCode}
          </pre>
        </div>

        {/* Table Section */}
        <div className="overflow-scroll">
          <p className="mb-2">First we need to understand the first few props:</p>
          <table className="w-full border border-border rounded-lg border-separate overflow-hidden" style={{ borderSpacing: 0 }}>
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="py-3 px-5 text-left font-medium">Prop</th>
                <th className="py-3 text-left font-medium">Explanation</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  prop: "label",
                  explanation: "This defines the text that will be displayed above whatever input you want.",
                },
                {
                  prop: "type",
                  explanation: "This essentially allows you to choose what kind of component you want to render.",
                },
                {
                  prop: "layout",
                  explanation: (
                    <>
                      The form is generally set to be a grid with 2 columns. A block can be:
                      <ul className="list-disc ml-5 mt-2 space-y-1">
                        <li>
                          <code>default</code> (side by side with another block)
                        </li>
                        <li>
                          <code>row-self</code> which means it occupies only 1 column in the grid but leaves the next blank
                        </li>
                        <li>
                          <code>full-row</code> where it takes up the width of 2 columns
                        </li>
                      </ul>
                    </>
                  ),
                },
                {
                  prop: "labelString",
                  explanation:
                    "There are some cases where the label is not a string, we need some kind of string to set the name prop, in the case we provide label as a React Node - we set labelString to set the name prop later on.",
                },
                {
                  prop: "name",
                  explanation:
                    "As just mentioned, this uses the value of either label or labelString to generate a key as an identifier within the form.",
                },
                {
                  prop: "defaultVal",
                  explanation: (
                    <>
                      If the input is meant to have a default value (identification has default value HKID), we can set it here.
                      <br />
                      This is not used in all input blocks so check which input types implement it and modify accordingly if you need it.
                    </>
                  ),
                },
              ].map(({ prop, explanation }) => (
                <tr key={prop} className="even:bg-muted/50">
                  <td className="border-t border-border py-3 px-5 font-mono align-top">{prop}</td>
                  <td className="border-t border-border py-3 px-5">{explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};