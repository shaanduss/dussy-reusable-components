import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { exampleUI } from "@/data/exampleUI";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildValidationSchema, extractDefaultValues } from "@/schemas/example";
import { Button } from "@/components/ui/button";
import { UndoDot } from "lucide-react";
import { Link } from "react-router-dom";
import UsageDocs from "@/components/form-generator/usageDocs";
import { ExampleForm } from "@/components/form-generator/exampleForm";


const FormGeneratorView: React.FC = () => {
  const validationSchema = React.useMemo(() => buildValidationSchema(exampleUI), [exampleUI]);
  const description = `This form generator is a dynamic React-based form builder that automatically generates complex multi-section forms from declarative configuration objects,
    complete with real-time validation using Zod schemas and React Hook Form. The system supports various input types (text, select, checkbox, radio, etc.), organizes content into
    hierarchical boxes and sections, and provides a complete form lifecycle with default values, validation rules, and submission handling.`;

  const defaultValues = React.useMemo(() => {
    return extractDefaultValues(exampleUI);
  }, [exampleUI]);

  const methods = useForm({
    resolver: zodResolver(validationSchema),
    mode: "onBlur",
    defaultValues,
    reValidateMode: "onChange",
  });


  return (
  <div className="w-full mx-auto md:px-10 lg:px-20 pb-10">
    <FormProvider {...methods}>
      <div className="py-4">
        <Link to="/"><Button className="my-5"><UndoDot/>Home</Button></Link>
        <Card>
          <CardHeader className="flex flex-col items-center justify-center gap-y-10 w-full mt-2">
            <div className="flex flex-col gap-y-2">
              <CardTitle className="font-extrabold text-2xl lg:text-[32px] w-full text-foreground py-3 text-center">React Form Boxes</CardTitle>
              <div className="flex justify-center items-center">
                <CardDescription className="lg:w-[900px] text-md lg:text-lg">{description}</CardDescription>
              </div>
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

export default FormGeneratorView;
