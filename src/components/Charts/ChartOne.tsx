import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import { ErrorResponseDto } from "@/utils/error.dto";
import { useApi } from "@/hooks/useApi";
import { notifyError } from "@/utils/toastify";

const ChartOne: React.FC = () => {
  const [data, setData] = useState<number[]>();
  const [error, setError] = useState<ErrorResponseDto | null>(null);
  const { getDiseaseByMonth } = useApi();

  useEffect(() => {
    (async () => {
      const { data: diseaseByMonth, error: apiError } =
        await getDiseaseByMonth();
      if (diseaseByMonth) {
        setData(diseaseByMonth);
      } else {
        setError(apiError);
      }
    })();
  }, [getDiseaseByMonth]);

  if (error) {
    notifyError(error.message);
  }

  const series = [
    {
      name: "Received Amount",
      data: data || [],
    },
    // {
    //   name: "Due Amount",
    //   data: [15, 9, 17, 32, 25, 68, 80, 68, 84, 94, 74, 62],
    // },
  ];

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#0ABEF9", "#5750F1"],
    chart: {
      fontFamily: "Roboto, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 320,
          },
        },
      },
    ],
    stroke: {
      curve: "smooth",
    },

    markers: {
      size: 0,
    },
    grid: {
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      fixed: {
        enabled: !1,
      },
      x: {
        show: !1,
      },
      y: {
        title: {
          formatter: function (e) {
            return "";
          },
        },
      },
      marker: {
        show: !1,
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "T1",
        "T2",
        "T3",
        "T4",
        "T5",
        "T6",
        "T7",
        "T8",
        "T9",
        "T10",
        "T11",
        "T12",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Thống kê theo tháng
          </h4>
        </div>
        {/* <div className="flex items-center gap-2.5">
          <p className="font-medium uppercase text-dark dark:text-dark-6">
            Short by:
          </p>
          <DefaultSelectOption options={["Yearly", "Monthly"]} />
        </div> */}
      </div>
      <div>
        <div className="-ml-4 -mr-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={310}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 text-center justify-center xsm:flex-row xsm:gap-0">
        <div className="">
          <p className="font-medium">Tổng số bệnh</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
            {data?.reduce((a, b) => a + b, 0)}
          </h4>
        </div>
        {/* <div className="xsm:w-1/2">
          <p className="font-medium">Tổng số triệu chứng</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
            412
          </h4>
        </div> */}
      </div>
    </div>
  );
};

export default ChartOne;
