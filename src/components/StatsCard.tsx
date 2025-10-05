import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
}

const StatsCard = ({ title, value, icon: Icon, iconColor = "text-accent" }: StatsCardProps) => {
  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-secondary/50 ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
