import { Card, CardContent } from "@/components/ui/card"
import { CircularProgress } from "@/components/progress-card/circularProgress"
import { Label } from "@/components/ui/label"

export interface ProgressCardProps {
  label: string
  title: string
  icon?: React.ReactNode
  description: string
  color?: string
  value?: number
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  icon,
  label,
  title,
  description,
  color,
  value
}) => {
  return(
    <Card>
      <CardContent>
        {/* Title Section */}
        <div className="flex gap-x-2">
          {icon}
          <Label>{label}</Label>
        </div>

        {/* Content */}
        <div className="mt-5 flex justify-between">
          {/* Text Section */}
          <div className="grid grid-cols-1 items-center">
            <Label className="text-md text-left">{title}</Label>
            <Label className="text-gray-400">{description}</Label>
          </div>

          {/* Progress Component */}
          <CircularProgress
            value={value ?? 50}
            showText={false}
            size={32}
            color={color ?? "text-cyan-600"}
          />
        </div>
      </CardContent>
    </Card>
  )
}