import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { exampleUI } from "@/data/exampleUI";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormBoxProps } from "@/interfaces/FormBoxInterfaces";
import z from "zod";
import { getInputValueSchema, normalizeName } from "@/schemas/example";
import { ExampleForm } from "@/components/exampleForm";
import { Button } from "@/components/ui/button";
import UsageDocs from "@/components/usageDocs";


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



const HomeView: React.FC = () => {
  const validationSchema = React.useMemo(() => buildValidationSchema(exampleUI), []);
  const description = `This form generator is a dynamic React-based form builder that automatically generates complex multi-section forms from declarative configuration objects,
    complete with real-time validation using Zod schemas and React Hook Form. The system supports various input types (text, select, checkbox, radio, etc.), organizes content into
    hierarchical boxes and sections, and provides a complete form lifecycle with default values, validation rules, and submission handling.`;

  const defaultValues = React.useMemo(() => {
    return extractDefaultValues(exampleUI);
  }, []);

  const methods = useForm({
    resolver: zodResolver(validationSchema),
    mode: "onBlur",
    defaultValues,
    reValidateMode: "onChange",
  });


  return (
  <div className="w-full mx-auto md:px-10 lg:px-20 pb-10">
    <FormProvider {...methods}>
      <div className="py-4 mt-8">
        <Card>
          <CardHeader className="flex flex-col items-center justify-center gap-y-10 w-full mt-2">
            <div className="flex flex-col gap-y-2">
              <CardTitle className="font-extrabold text-2xl lg:text-[32px] w-full text-foreground py-3 text-center">React Form Boxes</CardTitle>
              <CardDescription className="px-2 lg:px-42 text-md lg:text-lg">{description}</CardDescription>
            </div>
            <div className="flex px-2 justify-end w-full gap-x-5">
              <a href="#form-example"><Button className="cursor-pointer" variant="secondary">Example</Button></a>
              <a href="https://shaan-portfolio-ten.vercel.app/"
                target="_blank"><Button className="cursor-pointer">About Me</Button></a>
            </div>
          </CardHeader>
          <CardContent>
            <UsageDocs />
            <ExampleForm />
          </CardContent>
        </Card>
        </div>
    </FormProvider>
  </div>


  );
};

export default HomeView;
