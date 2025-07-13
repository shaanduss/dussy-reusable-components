import type { FormBlockProps, FormSectionProps } from "@/interfaces/FormBoxInterfaces"
import { Label } from "../label"
import { FormBlock } from "./form-block"
import React from "react";
import { normalizeName } from "@/schemas/example";

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
          const baseName = (typeof block.label === "string" && block.label.length != 0) ? normalizeName(block.label as string):normalizeName(block.labelString as string);
          return(
            <React.Fragment key={baseName}>
            {(block.layout && block.layout == "full-row") ?
              <FullRowFormBlock {...block} name={baseName} /> :
              <FormBlock
               {...block}
                name={baseName}
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