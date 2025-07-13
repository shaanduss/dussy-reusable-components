import type { FormBoxProps } from "@/interfaces/FormBoxInterfaces";

export const exampleUI: FormBoxProps[] = [
  {
    boxName: "Personal Information",
    sections: [
      {
        sectionName: "Basic Details",
        sectionDescription: "Please provide your basic personal information",
        blocks: [
          {
            label: "Full Name",
            type: "input",
            inputPlaceholder: "Enter your full name",
            defaultVal: "",
            layout: "full-row"
          },
          {
            label: "Email Address",
            type: "input",
            inputType: "email",
            inputPlaceholder: "your.email@example.com",
            defaultVal: "",
            layout: "full-row"
          },
          {
            label: "Phone Number",
            type: "symbolInputLeft",
            inputSymbol: "+852",
            inputPlaceholder: "9123 4567",
            defaultVal: "",
            layout: "full-row"
          },
          {
            label: "Date of Birth",
            type: "input",
            inputType: "date",
            defaultVal: "",
            layout: "default"
          },
          {
            label: "Gender",
            type: "radio",
            radioOptions: ["Male", "Female", "Non-binary", "Prefer not to say"],
            radioOptionsLabels: ["Male", "Female", "Non-binary", "Prefer not to say"],
            defaultVal: "",
            layout: "default"
          }
        ]
      },
      {
        sectionName: "Address Information",
        sectionDescription: "Your current residential address",
        blocks: [
          {
            label: "Street Address",
            type: "input",
            inputPlaceholder: "123 Main Street",
            defaultVal: "",
            layout: "full-row"
          },
          {
            label: "City",
            type: "input",
            inputPlaceholder: "Enter city name",
            defaultVal: "",
            layout: "default"
          },
          {
            label: "District",
            type: "select",
            selectOptions: ["Central and Western", "Eastern", "Southern", "Wan Chai", "Sham Shui Po", "Kowloon City", "Kwun Tong", "Wong Tai Sin", "Yau Tsim Mong", "Islands", "Kwai Tsing", "North", "Sai Kung", "Sha Tin", "Tai Po", "Tsuen Wan", "Tuen Mun", "Yuen Long"],
            selectOptionsLabels: ["Select District", "Central and Western", "Eastern", "Southern", "Wan Chai", "Sham Shui Po", "Kowloon City", "Kwun Tong", "Wong Tai Sin", "Yau Tsim Mong", "Islands", "Kwai Tsing", "North", "Sai Kung", "Sha Tin", "Tai Po", "Tsuen Wan", "Tuen Mun", "Yuen Long"],
            selectDefault: "",
            layout: "default"
          },
        ]
      }
    ]
  },
  {
    boxName: "Professional Information",
    sections: [
      {
        sectionName: "Employment Details",
        sectionDescription: "Tell us about your professional background",
        blocks: [
          {
            label: "Job Title",
            type: "input",
            inputPlaceholder: "e.g., Software Engineer, Marketing Manager",
            defaultVal: "",
            layout: "full-row"
          },
          {
            label: "Company",
            type: "input",
            inputPlaceholder: "Your current or most recent employer",
            defaultVal: "",
            layout: "full-row"
          },
          {
            label: "Industry",
            type: "select",
            selectOptions: ["Technology", "Healthcare", "Finance", "Education", "Retail", "Manufacturing", "Consulting", "Non-profit", "Government", "Other"],
            selectOptionsLabels: ["Select Industry", "Technology", "Healthcare", "Finance", "Education", "Retail", "Manufacturing", "Consulting", "Non-profit", "Government", "Other"],
            selectDefault: "",
            layout: "default"
          },
          {
            label: "Years of Experience",
            type: "input-select",
            inputPlaceholder: "Enter years",
            selectOptions: ["Less than 1", "1-3", "4-6", "7-10", "11-15", "16-20", "More than 20"],
            selectOptionsLabels: ["Less than 1", "1-3", "4-6", "7-10", "11-15", "16-20", "More than 20"],
            selectDefault: "",
            layout: "default"
          },
          {
            label: "Skills",
            type: "checkbox",
            checkboxOptions: ["JavaScript", "Python", "React", "Node.js", "SQL", "AWS", "Docker", "Git", "Agile", "UI/UX Design"],
            checkboxOptionsLabels: ["JavaScript", "Python", "React", "Node.js", "SQL", "AWS", "Docker", "Git", "Agile", "UI/UX Design"],
            checkboxCols: 3,
            layout: "full-row"
          }
        ]
      },
      {
        sectionName: "Education",
        sectionDescription: "Your educational background",
        blocks: [
          {
            label: "Highest Degree",
            type: "select",
            selectOptions: ["High School", "Associate's", "Bachelor's", "Master's", "Doctorate", "Other"],
            selectOptionsLabels: ["Select Degree", "High School", "Associate's", "Bachelor's", "Master's", "Doctorate", "Other"],
            selectDefault: "",
            layout: "default"
          },
          {
            label: "Field of Study",
            type: "input",
            inputPlaceholder: "e.g., Computer Science, Business Administration",
            defaultVal: "",
            layout: "full-row"
          },
          {
            label: "Institution",
            type: "input",
            inputPlaceholder: "University or institution name",
            defaultVal: "",
            layout: "full-row"
          },
          {
            label: "Graduation Year",
            type: "input",
            inputType: "number",
            inputPlaceholder: "2020",
            defaultVal: "",
            layout: "default"
          }
        ]
      }
    ]
  },
  {
    boxName: "Preferences & Interests",
    sections: [
      {
        sectionName: "Communication Preferences",
        sectionDescription: "How would you like us to communicate with you?",
        blocks: [
          {
            label: "Preferred Contact Method",
            type: "radio",
            radioOptions: ["Email", "Phone", "Text Message", "Mail"],
            radioOptionsLabels: ["Email", "Phone", "Text Message", "Mail"],
            defaultVal: "Email",
            layout: "default"
          },
          {
            label: "Newsletter Subscription",
            type: "checkbox",
            checkboxOptions: ["Weekly Newsletter", "Monthly Updates", "Product Announcements", "Event Notifications"],
            checkboxOptionsLabels: ["Weekly Newsletter", "Monthly Updates", "Product Announcements", "Event Notifications"],
            checkboxCols: 2,
            layout: "full-row"
          },
          {
            label: "Additional Comments",
            type: "text-area",
            inputPlaceholder: "Any additional information or special requests...",
            defaultVal: "",
            layout: "full-row"
          }
        ]
      },
      {
        sectionName: "Interests",
        sectionDescription: "What interests you? (Optional)",
        blocks: [
          {
            label: "Areas of Interest",
            type: "checkbox",
            checkboxOptions: ["Web Development", "Mobile Development", "Data Science", "AI/ML", "DevOps", "Cybersecurity", "Product Management", "Design", "Marketing", "Sales"],
            checkboxOptionsLabels: ["Web Development", "Mobile Development", "Data Science", "AI/ML", "DevOps", "Cybersecurity", "Product Management", "Design", "Marketing", "Sales"],
            checkboxCols: 2,
            layout: "full-row"
          },
          {
            label: "Budget Range",
            type: "select",
            selectOptions: ["Under $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000 - $25,000", "$25,000 - $50,000", "Over $50,000"],
            selectOptionsLabels: ["Select Budget", "Under $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000 - $25,000", "$25,000 - $50,000", "Over $50,000"],
            selectDefault: "",
            layout: "default"
          }
        ]
      }
    ]
  }
];