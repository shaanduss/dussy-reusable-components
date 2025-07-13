import {useEffect, type FC} from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import { FormBox } from "@/components/ui/form-box/form-box";
import { ListCheck } from "lucide-react";
import { extractDefaultValues } from "@/views/HomeView";
import { exampleUI } from "@/data/exampleUI";

const formBoxData = exampleUI

export const ExampleForm: FC = () => {
  const methods = useFormContext();

  // Initialize form with Redux state (optional, for drafts)
  useEffect(() => {
    methods.reset(extractDefaultValues(formBoxData));
  }, []);

  return (
    <form onSubmit={methods.handleSubmit((data) => console.log("Submit data:", data))} className="flex flex-col items-start pl-3 w-full" id="form-example">
      <div className="w-full mt-3">
        <p className="font-extrabold underline font-pj tracking-tight text-xl lg:text-[28px] w-full text-left text-foreground py-3">Example Form</p>
      </div>
      {formBoxData.map((box) => (
        <FormBox
          key={(typeof box.boxName == "string") ? box.boxName : box.boxNameString}
          boxName={box.boxName}
          sections={box.sections}
        />
      ))}

      {/* Save Section */}
      <div className="flex gap-4 w-full justify-end mt-10">
        <Button
          variant="outline"
          className="rounded-full"
          type="button"
          onClick={() => {
            methods.reset();
          }}
        >
          Cancel
        </Button>
        <Button variant="secondary" className="rounded-full" type="submit">
          Submit <ListCheck />
        </Button>
      </div>
    </form>
  );
};