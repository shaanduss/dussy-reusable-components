import React from "react";
import { FinancialCard, type FinancialCardProps } from "@/components/ui/financialCard";
import { BadgePercent, BanknoteArrowDown, CircleDollarSign } from "lucide-react";

const repayFinancialCardData: FinancialCardProps[] = [
  {
    title: "Principal Amount",
    icon: <BanknoteArrowDown className="w-4 h-4" />,
    titleValue: "$40,000",
    titleColor:"text-rose-600",
    sideBlocks: [
      {
        label: "Repaid Principal",
        value: "$28,000"
      },
      {
        label: "Principal Balance",
        value: "$12,000"
      }
    ]
  },
  {
    title: "Interest Amount",
    icon: <CircleDollarSign className="w-4 h-4" />,
    titleValue: "$4,560",
    titleColor: "text-amber-600",
    sideBlocks: [
      {
        label: "Repaid Interest",
        value: "$1,940"
      },
      {
        label: "Interest Balance",
        value: "$2,620"
      }
    ]
  },
  {
    title: "Interest Rate",
    icon: <BadgePercent className="w-4 h-4" />,
    titleValue: "46.00%",
    titleColor: "text-violet-700",
    sideBlocks: [
      {
        label: "Method",
        value: "Amortization"
      },
      {
        label: "Flat Rate",
        value: "2.3083%"
      },
    ]
  },
  {
    sideBlocks: [
      {
        label: "Repaid OD Interest",
        value: "$240.20"
      },
      {
        label: "Repaid Handling Fee",
        value: "$80.70"
      },
      {
        label: "Total Fees Collected",
        value: "$320.90"
      },
    ]
  }
]

export const ExampleFinancialCards: React.FC = () => {

  return(
    <div className="mt-8 text-lg">
      {/* Repay Condition Section */}
      <div className="mt-10 flex flex-col gap-y-5">
        <p className="font-extrabold tracking-tight text-[28px] w-full text-left border-b text-headings py-3">Example</p>
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-x-3 gap-y-8">
          {repayFinancialCardData.map((card, index) => (
            <FinancialCard
              key={`repay_financial_card_${index}`}
              {...card}
            />
          ))}
        </div>
      </div>
    </div>
  )
}