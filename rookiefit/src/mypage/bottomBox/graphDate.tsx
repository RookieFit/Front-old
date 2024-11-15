import './graphBox.css';
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const GraphDate = () => {
    const data = {
        series: [10, 41, 35, 51, 49, 62, 69, 91, 148 ],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: true,
                },
            },
            dataLabels: {
                enabled: true,
                textAnchor: 'middle' as const, // 타입 명시
                style: {
                    fontSize: '18px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    colors: ['#fff']
                },
                dropShadow: {
                    enabled: true,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: '#000',
                    opacity: 0.55
                }
                
            },
        } as ApexOptions
    };


    return (
        <div className="graph-box">
            <Chart
                options={data.options}
                series={data.series}
                type="line"
                width="680"
            />
        </div>
    );
};
export default GraphDate;