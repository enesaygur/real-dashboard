import styles from "./RevenueChart.module.css";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
interface RevenueChartProps {
  data: {
    month: string;
    revenue: number;
  }[];
}
function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div
      style={{
        width: "100%",
        height: 350,
        backgroundColor: "#fff",
        padding: "1rem",
        borderRadius: "10px",
      }}
    >
      <h2 className={styles.title}>Monthly Revenue</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default RevenueChart;
