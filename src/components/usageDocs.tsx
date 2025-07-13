import { AccordionContent } from "@radix-ui/react-accordion"
import { Accordion, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { InterfacesDocs } from "./usageAccordion/interfacesDocs"

const UsageDocs: React.FC = () => {
  return(
    <div className="w-full pl-3">
      <div className="w-full">
        <p className="font-extrabold font-pj tracking-tight text-[28px] w-full text-left text-foreground py-3">Usage Documentation</p>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Interfaces</AccordionTrigger>
          <AccordionContent>
            <InterfacesDocs/>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Schema</AccordionTrigger>
          <AccordionContent>
            Yes it does
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Existing Input Types</AccordionTrigger>
          <AccordionContent>
            Yes it does
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Defining New Input Types</AccordionTrigger>
          <AccordionContent>
            Yes it does
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default UsageDocs