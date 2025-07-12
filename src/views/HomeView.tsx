import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { exampleUI } from "@/data/exampleUI";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormBoxProps } from "@/interfaces/FormBoxInterfaces";
import z from "zod";
import { getInputValueSchema, normalizeName } from "@/schemas/example";
import { ExampleForm } from "@/components/exampleForm";


export function buildValidationSchema(formBoxes: FormBoxProps[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  formBoxes.forEach((box) => {
    box.sections.forEach((section) => {
      section.blocks.forEach((block) => {
        const key = typeof block.label === "string" ? normalizeName(block.label) : "field";

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
        let key;
        if (typeof block.label == "string") {
          key = block.label.toString().toLowerCase().replace(/\s+/g, "_").replace(/[^\w_]/g, "");
        } else if (block.labelString){
          key = block.labelString.toString().toLowerCase().replace(/\s+/g, "_").replace(/[^\w_]/g, "")
        } else {
          key = undefined;
        }

        // handle default value for input-select
        if (block.type == "input-select" && key) {
          // generate key for input and select sections
          const inputKey = key + "_input";
          const selectKey = key + "_select";
          defaults[inputKey] = (block.defaultVal) ? block.defaultVal : undefined;
          defaults[selectKey] = (block.selectDefault) ? block.selectDefault : "";
        }
        else if (block.type == "select" && key) {
          defaults[key] = (block.selectDefault) ? block.selectDefault : "";
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



const HomeView: React.FC = () => {
  const validationSchema = React.useMemo(() => buildValidationSchema(exampleUI), [exampleUI]);

  const defaultValues = React.useMemo(() => {
    return extractDefaultValues(exampleUI);
  }, [exampleUI]);

  const methods = useForm({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
    defaultValues,
  });


  return (
  <div className="w-full mx-auto px-5 pb-10">
    <FormProvider {...methods}>
      <div className="py-4">
        <Card className="shadow-sm border-none rounded-none">
          <CardContent>
            <ExampleForm />
          </CardContent>
        </Card>
        </div>
    </FormProvider>
  </div>


  );
};

export default HomeView;
