import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { FC } from "react";
import { Link } from "react-router-dom";

const HomeView: FC = () => {
  return(
    <div className="w-full md:px-20 lg:px-40 pb-10 mt-10">
      <Card>
        <CardContent className="px-10">
          {/* Header Section */}
          <div className="mb-3">
            <CardTitle className="font-extrabold text-2xl lg:text-[32px] w-full text-foreground py-3 text-left">Reusable Components</CardTitle>
            <CardDescription className="text-md lg:text-lg text-left">{"List of Reusable Components for React + Tailwind Stack (using ShadCN-UI)"}</CardDescription>
              <div className="flex px-2 justify-end w-full gap-x-5">
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