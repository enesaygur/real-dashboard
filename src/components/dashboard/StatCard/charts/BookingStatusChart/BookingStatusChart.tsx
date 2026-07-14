import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface BookingStatusChartProps {
  data: {
    name: string;
    value: number;
  }[];
}
function BookingStatusChart({ data }: BookingStatusChartProps) {
  return (
    <div
      style={{
        width: "100%",
        height: 350,
        background: "#fff",
        padding: "1rem",
        borderRadius: "10px",
      }}
    >
      <h2>Booking Status</h2>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BookingStatusChart;
