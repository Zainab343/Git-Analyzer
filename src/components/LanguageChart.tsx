import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface LanguageChartProps {
  languages: { name: string; value: number }[];
}

const COLORS = [
  'hsl(263, 70%, 50%)',
  'hsl(192, 91%, 60%)',
  'hsl(280, 70%, 60%)',
  'hsl(170, 80%, 50%)',
  'hsl(340, 80%, 60%)',
  'hsl(40, 90%, 60%)',
];

const LanguageChart = ({ languages }: LanguageChartProps) => {
  if (!languages || languages.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-xl border-border/50">
      <h2 className="text-2xl font-bold mb-6">Language Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={languages}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {languages.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(240, 10%, 6%)',
              border: '1px solid hsl(240, 6%, 20%)',
              borderRadius: '0.75rem',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LanguageChart;
