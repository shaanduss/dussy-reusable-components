import type { FormBlockProps, FormSectionProps } from "@/components/form-generator/FormBoxInterfaces"
import { Label } from "@/components/ui/label"
import { FormBlock } from "./form-block"
import React from "react";
import { getKey } from "@/schemas/example";

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


export const FormSection: React.FC<FormSectionProps> = (props) => {
  return(
    <div className="flex flex-col gap-y-8 md:flex-row mt-8 mb-4 mr-3">
      {/* Label */}
      <div className="labelBox w-full md:w-[250px]">
        {(typeof props.sectionName == "string") ?
          <Label className="labelTitle">{props.sectionName}</Label>
          : <div>{props.sectionName}</div>
        }
        {(props.sectionDescription) ?
          <Label className="labelDescription">{props.sectionDescription}</Label>
          : <></>
        }
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-8 font-medium w-full md:pr-20">
        {/* Map Blocks */}
        {props.blocks.map((block) => {
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