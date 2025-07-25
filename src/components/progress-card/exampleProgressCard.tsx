import { ClockFading, Coins, HandCoins } from "lucide-react";
import type { FC } from "react";
import { ProgressCard, type ProgressCardProps } from "@/components/progress-card/progressCard";


const cards: ProgressCardProps[] = [
  {
    icon: <ClockFading className="w-5 h-5"/>,
    label: "Remaining Tenor",
    title: "3 months",
    description: "out of 6",
    value: ((3/6) * 100)
  },
  {
    icon: <HandCoins className="w-5 h-5"/>,
    label: "Principal Balance",
    title: "$8,940",
    description: "out of $12,000",
    color: "text-rose-600",
    value: ((3060/12000) * 100)
  },
  {
    icon: <Coins className="w-5 h-5"/>,
    label: "Interest Balance",
    title: "$900",
    description: "out of $1,420",
    color: "text-amber-400",
    value: ((520/1420) * 100)
  }
]

export const ExampleProgressCards: FC = () => {

  return(
    <div className="mt-8 text-lg">
      {/* Repay Condition Section */}
      <div className="mt-10 flex flex-col gap-y-5">
        <p className="font-extrabold tracking-tight text-[28px] w-full text-left border-b text-headings py-3">Example</p>
        <div className="grid grid-cols-3 px-14 gap-x-10">
          {
            cards.map((card, index) => (
              <ProgressCard
                key={`repay_card_${index}`}
                {...card}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}