import React, { useRef, useState, useEffect } from "react";
import { AccordionContent } from "@radix-ui/react-accordion"
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SchemaDocs } from "./usageAccordion/SchemaDocs"
import { TypesDocs } from "./usageAccordion/TypesDocs"
import { InterfacesDocs } from "./usageAccordion/InterfacesDocs"
import { NewTypeDocs } from "./usageAccordion/NewTypeDocs"

const UsageDocs: React.FC = () => {
  const [open, setOpen] = useState<"item-1" | "item-2" | "item-3" | "item-4" | undefined>(undefined);
  const triggerRefs = {
    "item-1": useRef<HTMLButtonElement>(null),
    "item-2": useRef<HTMLButtonElement>(null),
    "item-3": useRef<HTMLButtonElement>(null),
    "item-4": useRef<HTMLButtonElement>(null),
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
        <p className="font-extrabold font-pj tracking-tight text-xl lg:text-[28px] w-full text-left text-foreground py-3">Usage Documentation (legacy)</p>
      </div>
      <Accordion
        type="single"
        collapsible
        value={open}
        onValueChange={v => setOpen(v as "item-1" | "item-2" | "item-3" | "item-4" | undefined)}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger ref={triggerRefs["item-1"]}>Interfaces</AccordionTrigger>
          <AccordionContent>
            <InterfacesDocs/>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger ref={triggerRefs["item-2"]}>Schema</AccordionTrigger>
          <AccordionContent>
            <SchemaDocs />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger ref={triggerRefs["item-3"]}>Existing Input Types</AccordionTrigger>
          <AccordionContent>
            <TypesDocs />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger ref={triggerRefs["item-4"]}>Defining New Input Types</AccordionTrigger>
          <AccordionContent>
            <NewTypeDocs />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default UsageDocs;