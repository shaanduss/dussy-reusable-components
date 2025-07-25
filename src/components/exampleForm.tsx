import {useEffect, type FC, useState} from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import { FormBox } from "@/components/ui/form-box/form-box";
import { ListCheck } from "lucide-react";

import { exampleUI } from "@/data/exampleUI";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "./ui/dialog";
import { Label } from "./ui/label";
import { extractDefaultValues } from "@/schemas/example";

const formBoxData = exampleUI

export const ExampleForm: FC = () => {
  const methods = useFormContext();

  // Dialog state for showing submitted data
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);

  // Initialize form with default values
  useEffect(() => {
    methods.reset(extractDefaultValues(formBoxData));
  }, []);

  const submitAction = (data: any) => {
    setSubmittedData(data);
    setDialogOpen(true);
  }

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogTitle>Submitted Form Data</DialogTitle>
          <div className="flex flex-col gap-2 max-h-96 overflow-auto py-2">
            {submittedData &&
              Object.entries(submittedData).map(([key, value]) => {
                // Convert snake_case to Title Case with spaces
                const label = key.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
                return (
                  <div key={key} className="flex gap-2 py-0.5 items-center">
                    <Label className="font-bold">{label}:</Label>
                    <Label className="break-all">{String(value)}</Label>
                  </div>
                );
              })}
          </div>
          <DialogClose asChild>
            <Button className="mt-4 self-end" type="button" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <form onSubmit={methods.handleSubmit(submitAction)} className="flex flex-col items-start pl-3 w-full" id="form-example">
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
          <Button
            variant="secondary"
            className="rounded-full"
            type="submit"
            >
            Submit <ListCheck />
          </Button>
        </div>
      </form>
    </>
  );
};