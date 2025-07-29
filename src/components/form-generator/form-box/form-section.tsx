import type { FormBlockProps, FormSectionProps } from "@/interfaces/FormBoxInterfaces"
import { Label } from "@/components/ui/label"
import { FormBlock } from "./form-block"
import React from "react";
import { getKey } from "@/schemas/example";
import { cn } from "@/lib/utils";

interface FullRowFormBlockProps extends FormBlockProps {
  name?: string;
}

const FullRowFormBlock: React.FC<FullRowFormBlockProps> = ({
  name,
  ...block
}) => {
  return (
    <div className="lg:col-span-2">
      <FormBlock
        {...block}
        name={name}
      />
    </div>
  );
};


export const FormSection: React.FC<FormSectionProps> = ({
  sectionName,
  sectionDescription,
  blocks,
  sectionNameString,
  sectionNameStyling,
  blocksContainerStyling
}) => {
  return(
    <div className="flex flex-col gap-y-8 md:flex-row mt-8 mb-4 mr-3" key={(typeof sectionName == "string") ? sectionName+"_section" : sectionNameString+"_section"}>
      {/* Label */}
      <div className="flex flex-col w-full md:w-[250px]">
        {(typeof sectionName == "string") ?
          <Label className={cn("font-semibold text-left pr-1", sectionNameStyling)}>{sectionName}</Label>
          : <div>{sectionName}</div>
        }
        {(sectionDescription) ?
          <Label className="labelDescription">{sectionDescription}</Label>
          : <></>
        }
      </div>
      <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-8 font-medium w-full md:pr-20", blocksContainerStyling)}>
        {/* Map Blocks */}
        {blocks.map((block) => {
          const blockKey = getKey(block.label, block.labelString, block.name)
          return(
            <React.Fragment key={blockKey}>
            {(block.layout && block.layout == "full-row") ?
              <FullRowFormBlock {...block} name={blockKey} /> :
              <FormBlock
               {...block}
                name={blockKey}
              />
            }
            {(block.layout && block.layout == "row-self") ?
              <div aria-hidden="true" className="hidden lg:block"></div> : <></>
            }
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}