import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import { SymtomByLevelDto } from "@/data/data.dto";
import { ErrorResponseDto } from "@/utils/error.dto";
import { useApi } from "@/hooks/useApi";
import { notifyError } from "@/utils/toastify";

const ChartThree: React.FC = () => {
  const [data, setData] = useState<SymtomByLevelDto[]>();
  const [error, setError] = useState<ErrorResponseDto | null>(null);
  const { getSymtomsByLevel } = useApi();

  useEffect(() => {
    (async () => {
      const { data: symtoms, error: apiError } = await getSymtomsByLevel();
      if (symtoms) {
        setData(symtoms);
      } else {
        setError(apiError);
      }
    })();
  }, [getSymtomsByLevel]);

  if (error) {
    notifyError(error.message);
  }

  const series = [
    data?.find((item) => item._id === "HIGH")?.count || 0,
    data?.find((item) => item._id === "MEDIUM")?.count || 0,
    data?.find((item) => item._id === "LOW")?.count || 0,
  ];

  const total = series.reduce((acc, cur) => acc + cur, 0);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Roboto, sans-serif",
      type: "donut",
    },
    colors: ["#5750F1", "#8099EC", "#ADBCF2"],
    labels: ["Nghiêm trọng", "Trunng bình", "Nhẹ"],
    legend: {
      show: false,
      position: "bottom",
    },

    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          background: "transparent",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Triệu chứng",
              fontSize: "16px",
              fontWeight: "400",
            },
            value: {
              show: true,
              fontSize: "28px",
              fontWeight: "bold",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 415,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-9 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Mức độ nghiêm trọng
          </h4>
        </div>
        {/* <div>
          <DefaultSelectOption options={["Yearly", "Monthly"]} />
        </div> */}
      </div>

      <div className="mb-8">
        <div className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[350px]">
        <div className="-mx-7.5 flex flex-wrap items-center justify-center gap-y-2.5">
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-blue"></span>
              <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                <span> Nghiêm trọng </span>
                <span>
                  {" "}
                  {Math.floor(
                    ((data?.find((item) => item._id === "HIGH")?.count || 0) /
                      total) *
                      100,
                  )}
                  %{" "}
                </span>
              </p>
            </div>
          </div>
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-blue-light"></span>
              <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                <span> Trung bình </span>
                <span>
                  {" "}
                  {Math.floor(
                    ((data?.find((item) => item._id === "MEDIUM")?.count || 0) /
                      total) *
                      100,
                  )}
                  %{" "}
                </span>
              </p>
            </div>
          </div>
          <div className="w-full px-7.5 sm:w-2/5">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-blue-light-3"></span>
              <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                <span> Nhẹ </span>
                <span>
                  {" "}
                  {Math.floor(
                    ((data?.find((item) => item._id === "LOW")?.count || 0) /
                      total) *
                      100,
                  )}
                  %{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
