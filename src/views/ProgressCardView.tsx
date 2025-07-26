import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UndoDot } from "lucide-react";
import { Link } from "react-router-dom";
import { ExampleProgressCards } from "@/components/progress-card/exampleProgressCard";
import UsageDocs from "@/components/progress-card/usageDocs";


const ProgressCardView: React.FC = () => {
  const description = `Progress Card is a React component that presents a card with a labeled header, an optional icon, and a content area featuring a title, description,
  and a circular progress indicator. The progress circle visually reflects a numeric value with customizable color and size. This component is designed to clearly
  display progress-related information in a compact, accessible format.`;

  return (
  <div className="w-full mx-auto md:px-10 lg:px-20 pb-10">
      <div className="py-4">
        <Link to="/"><Button className="my-5 cursor-pointer"><UndoDot/>Home</Button></Link>
        <Card>
          <CardHeader className="flex flex-col items-center justify-center gap-y-10 w-full mt-2">
            <div className="flex flex-col gap-y-2">
              <CardTitle className="font-extrabold text-2xl lg:text-[32px] w-full text-foreground py-3 text-center">Progress Card</CardTitle>
              <div className="flex justify-center items-center">
                <CardDescription className="lg:w-[900px] text-md lg:text-lg">{description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <UsageDocs />
            <ExampleProgressCards />
          </CardContent>
        </Card>
        </div>
  </div>


  );
};

export default ProgressCardView;
