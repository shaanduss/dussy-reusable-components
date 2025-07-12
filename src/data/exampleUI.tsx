import type { FormBoxProps } from "@/interfaces/FormBoxInterfaces";

export const exampleUI: FormBoxProps[] = [
  {
    boxName: "Education Information",
    sections: [
      {
        sectionName: "Secondary School",
        blocks: [
          {
            label: "Name",
            type: "input"
          }
        ]
      },
    ]
  }
]