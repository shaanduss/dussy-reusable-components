import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UsageDocs from "@/components/form-generator/usageDocs";
import { UndoDot } from "lucide-react";
import { Link } from "react-router-dom";
import { ExampleFinancialCards } from "@/components/financial-card/exampleFinancialCards";


const FinancialCardView: React.FC = () => {
  const description = `Financial Card is a reusable React component that displays a customizable card with an optional title section and a list of labeled value blocks.
  It accepts an optional icon, title, and title value with configurable text color, alongside an array of sideBlocks rendered as label-value pairs separated visually.
  The layout adapts depending on whether the title section is present, ensuring a clean and flexible display suitable for financial or data summary purposes.`;


  return (
  <div className="w-full mx-auto md:px-10 lg:px-20 pb-10">
      <div className="py-4">
        <Link to="/"><Button className="my-5 cursor-pointer"><UndoDot/>Home</Button></Link>
        <Card>
          <CardHeader className="flex flex-col items-center justify-center gap-y-10 w-full mt-2">
            <div className="flex flex-col gap-y-2">
              <CardTitle className="font-extrabold text-2xl lg:text-[32px] w-full text-foreground py-3 text-center">Financial Card</CardTitle>
              <div className="flex justify-center items-center">
                <CardDescription className="lg:w-[900px] text-md lg:text-lg">{description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <UsageDocs />
            <ExampleFinancialCards />
          </CardContent>
        </Card>
        </div>
  </div>


  );
};

export default FinancialCardView;
