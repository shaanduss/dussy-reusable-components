import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { FC } from "react";

const HomeView: FC = () => {
  return(
    <div className="w-full md:px-10 lg:px-20 pb-10 mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="font-extrabold text-2xl lg:text-[32px] w-full text-foreground py-3 text-left">React Form Boxes</CardTitle>
          <CardDescription className="text-md lg:text-lg text-left">{"e"}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export default HomeView