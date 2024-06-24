import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const Status = ({ data }) => {

  const chartData =
    data?.data.result.map((item) => ({
      name: item.month,
      total: item.totalMonthlyPrice,
    })) || [];

  return (
    <ResponsiveContainer width="100%" height={420} className="self-end">
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          domain={[0, 7000]}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#08cff6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Status;
