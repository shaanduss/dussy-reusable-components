import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { FC } from "react";
import { Link } from "react-router-dom";

const HomeView: FC = () => {
  const descriptionWelcome = `
    Welcome to Dussy's Reusable Components, a curated collection of handcrafted React components designed with TailwindCSS and
    ShadCN-UI for seamless integration and rapid development.`

  const descriptionNpm = `This npm package offers a suite of versatile UI elements, including a dynamic Form Generator that
  effortlessly creates complex, multi-section forms from simple configuration objects, a sleek Financial Card for data summaries,
  and an elegant Progress Card showcasing progress visually with a customizable circular indicator.`

  const descriptionCustomization = `Each component is fully customizable, accessible, and thoughtfully built to save you time while
  enhancing your UI/UX. Whether you're building enterprise dashboards, interactive forms, or data displays, these components bring
  together efficiency and style in one reusable package.`

  const descriptionExplore = `Feel free to explore the showcase links below to see each component in action and learn more about
  their usage.`

  const AIGen = `
  Some parts of this package's documentation and descriptive content were crafted with the help of AI to ensure clarity and completeness.
  Additionally, the CircularProgress component's UI design was entirely AI-generated; however, all props, customization options, and integration
  logic were implemented and refined by me personally. This blend of AI-powered creativity and manual craftsmanship offers you high-quality components
  with human-driven functionality and control.`

  return(
    <div className="w-full md:px-20 lg:px-40 pb-10 mt-10">
      <Card>
        <CardContent className="px-10">
          {/* Header Section */}
          <div className="mb-3">
            <CardTitle className="font-extrabold text-2xl lg:text-[32px] w-full text-foreground py-3 text-left">Dussy's Reusable Components</CardTitle>
            <CardDescription className="text-md lg:text-lg text-left flex flex-col gap-y-10 mt-2">
              <div className="flex flex-col gap-y-5">
                <p>{descriptionWelcome} </p>
                <p>{descriptionNpm} </p>
                <p>{descriptionCustomization} </p>
                <p>{descriptionExplore} </p>
              </div>
              <div className="flex flex-col gap-y-5">
              <p className="font-bold text-black">Note on AI Assistance:</p>
              <p>{AIGen}</p>
              </div>
            </CardDescription>
            <div className="flex px-2 justify-end w-full gap-x-5 mt-5">
              <a href="https://shaan-portfolio-ten.vercel.app/" target="_blank"><Button className="cursor-pointer">See More</Button></a>
            </div>
          </div>

          <Separator/>

          {/* Links Section */}
          <div className="mt-5">
            <p className="font-extrabold text-xl lg:text-[24px] w-full text-left text-foreground py-3">Component List</p>
            <ul className="px-5">
              <li className="flex gap-x-3">
                1.
                <Link to="/form-generator" className="cursor-pointer">📃 Form Generator</Link>
              </li>
              <li className="flex gap-x-3">
                2.
                <Link to="/financial-card" className="cursor-pointer">💰 Financial Card</Link>
              </li>
              <li className="flex gap-x-3">
                3.
                <Link to="/progress-card" className="cursor-pointer">📈 Progress Card</Link>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HomeView