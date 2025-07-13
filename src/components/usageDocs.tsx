import { AccordionContent } from "@radix-ui/react-accordion"
import { Accordion, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { SchemaDocs } from "./usageAccordion/SchemaDocs"
import { TypesDocs } from "./usageAccordion/TypesDocs"
import { InterfacesDocs } from "./usageAccordion/InterfacesDocs"
import { NewTypeDocs } from "./usageAccordion/NewTypeDocs"

const UsageDocs: React.FC = () => {
  return(
    <div className="w-full pl-3">
      <div className="w-full">
        <p className="font-extrabold font-pj tracking-tight text-xl lg:text-[28px] w-full text-left text-foreground py-3">Usage Documentation</p>
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
            <SchemaDocs />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Existing Input Types</AccordionTrigger>
          <AccordionContent>
            <TypesDocs />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Defining New Input Types</AccordionTrigger>
          <AccordionContent>
            <NewTypeDocs />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default UsageDocs