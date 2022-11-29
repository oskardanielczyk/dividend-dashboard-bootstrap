import Chart from "react-apexcharts";
import { Container } from "react-bootstrap";

const TestChart = () => {
  return (
    <Container>
      <Chart
        options={{
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
          },
          tooltip: {
            theme: "dark",
          },
          markers: {
            size: 3,
            colors: ["#fd7e14"],
            strokeColor: "#343a40",
            strokeWidth: 2,
          },
          dataLabels: {
            enabled: false,
          },
          colors: ["#fd7e14"],
          stroke: {
            width: 3,
          },
        }}
        series={[
          {
            name: "Wartość portfela",
            data: [30, 40, 45, 50, 49, 60, 70, 91],
          },
        ]}
        type="area"
        width="100%"
        height="300px"
      />
    </Container>
  );
};

export default TestChart;
