import React, { useRef, useState, useEffect } from "react";
import { AccordionContent } from "@radix-ui/react-accordion"
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CircularProgressDocs } from "./usageAccordion/CircularProgressDocs";

const UsageDocs: React.FC = () => {
  const [open, setOpen] = useState<"item-1" | "item-2" | "item-3" | undefined>(undefined);
  const triggerRefs = {
    "item-1": useRef<HTMLButtonElement>(null),
    "item-2": useRef<HTMLButtonElement>(null),
    "item-3": useRef<HTMLButtonElement>(null),
  };

  useEffect(() => {
    if (open && triggerRefs[open]?.current) {
      setTimeout(() => {
        triggerRefs[open]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  }, [open]);

  return (
    <div className="w-full pl-3">
      <div className="w-full">
        <p className="font-extrabold text-xl lg:text-[28px] w-full text-left text-foreground py-3">Usage Documentation (legacy)</p>
      </div>
      <Accordion
        type="single"
        collapsible
        value={open}
        onValueChange={v => setOpen(v as "item-1" | "item-2" | "item-3" | undefined)}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger ref={triggerRefs["item-1"]}>Circular Progress</AccordionTrigger>
          <AccordionContent>
            <CircularProgressDocs/>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger ref={triggerRefs["item-2"]}>Props</AccordionTrigger>
          <AccordionContent>
            <CircularProgressDocs/>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger ref={triggerRefs["item-3"]}>Creating a Progress Card</AccordionTrigger>
          <AccordionContent>
            <CircularProgressDocs/>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default UsageDocs;