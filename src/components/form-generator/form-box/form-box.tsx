import type { FormBoxProps } from "@/interfaces/FormBoxInterfaces"
import { FormSection } from "./form-section"
import { Separator } from "@/components/ui/separator"
import React from "react"

import { cn } from "@/lib/utils"

export const FormBox: React.FC<FormBoxProps> = ({
  boxName,
  sections,
  boxNameString,
  nameStyling = "text-foreground",
  sectionNameStyling,
  blocksContainerStyling
}) => {
  return(
    <div className="w-full" key={(typeof boxName == "string") ? boxName+"_box" : boxNameString+"_box"}>
      {(typeof boxName == "string") ?
        <p className={cn("font-extrabold text-xl lg:text-[24px] w-full text-left border-b py-3", nameStyling)}>
          {boxName}
        </p>
        :
        <>{boxName}</>
      }

      <div className="w-full">
          {sections.map((section, idx) => (
            <React.Fragment key={(typeof section.sectionName == "string") ? section.sectionName : section.sectionNameString}>
              <FormSection
                sectionNameStyling={sectionNameStyling}
                blocksContainerStyling={blocksContainerStyling}
                {...section}
              />
              {idx !== sections.length - 1 && <Separator />}
            </React.Fragment>
          ))}
      </div>
    </div>
  )
}