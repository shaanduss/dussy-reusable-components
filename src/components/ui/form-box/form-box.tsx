import type { FormBoxProps } from "@/interfaces/FormBoxInterfaces"
import { FormSection } from "./form-section"
import { Separator } from "../separator"
import React from "react"

export const FormBox: React.FC<FormBoxProps> = (props) => {
  return(
    <div className="w-full">
      {(typeof props.boxName == "string") ?
      <p className="font-extrabold font-pj tracking-tight text-[24px] w-full text-left border-b text-foreground py-3">{props.boxName}</p>
      :
      <>{props.boxName}</>
    }
      <div className="font-pj tracking-tight w-full">
          {props.sections.map((section, idx) => (
            <React.Fragment key={(typeof section.sectionName == "string") ? section.sectionName : section.sectionNameString}>
              <FormSection sectionName={section.sectionName}
                sectionDescription={section.sectionDescription}
                blocks={section.blocks}
              />
              {idx !== props.sections.length - 1 && <Separator />}
            </React.Fragment>
          ))}
      </div>
    </div>
  )
}