import React, { useEffect, useState } from "react";
import { dataStats } from "@/types/dataStats";
import { useApi } from "@/hooks/useApi";
import { notifyError } from "@/utils/toastify";
import { ErrorResponseDto } from "@/utils/error.dto";
import { SummaryDto } from "@/data/data.dto";

const DataStatsOne: React.FC<dataStats> = () => {
  const [data, setData] = useState<SummaryDto>();
  const [error, setError] = useState<ErrorResponseDto | null>(null);
  const { getSumaryReport } = useApi();

  useEffect(() => {
    (async () => {
      const { data: summary, error: apiError } = await getSumaryReport();
      if (summary) {
        setData(summary);
      } else {
        setError(apiError);
      }
    })();
  }, [getSumaryReport]);

  if (error) {
    notifyError(error.message);
  }

  const dataStatsList = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 18C7.43822 17.7865 8.75171 17.0629 9.70082 15.9615C10.6499 14.86 11.1714 13.454 11.17 12C11.1772 10.1748 11.8393 8.41291 13.0359 7.03467C14.2324 5.65644 15.8839 4.75347 17.69 4.49L20.28 4.12C20.21 4.04 20.15 3.96 20.07 3.88C16.81 0.620005 10.55 1.6 6.07 6.06C2.28 9.9 1 15 2.76 18.46L6 18Z"
            fill="white"
          />
          <path
            d="M12.73 12C12.7235 13.8248 12.0631 15.5869 10.8687 16.9665C9.67437 18.3462 8.02507 19.2521 6.22 19.52L3.76 19.87L3.91 20.04C7.17 23.3 13.43 22.33 17.91 17.87C21.68 14.11 23 9 21.25 5.59L17.91 6.07C16.481 6.27759 15.1733 6.98947 14.2233 8.07701C13.2733 9.16455 12.7436 10.556 12.73 12Z"
            fill="white"
          />
        </svg>
      ),
      color: "#3FD97F",
      title: "Giống cà phê",
      value: data?.varietyCount,
      // growthRate: 0.43,
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 16C21 15.5 20.95 15.08 20.88 14.68L22.45 13.9L21.55 12.1L20.18 12.79C19.63 11.96 18.91 11.5 18.29 11.28L18.95 9.32L17.05 8.68L16.29 10.96C14.96 10.83 14.17 10.32 13.7 9.77L15.45 8.9L14.55 7.1L13 7.89C12.9303 7.16759 12.6829 6.47365 12.28 5.87L13.83 3.55L12.17 2.44L10.76 4.56C10.28 4.33 9.7 4.15 9 4.06V2H7V4.1C6.29 4.25 5.73 4.54 5.32 4.91L2.7 2.29L1.29 3.71L4.24 6.65C4 7.39 4 8 4 8H2V10H4.04C4.1 10.63 4.21 11.36 4.4 12.15L1.68 13.05L2.31 14.95L5 14.05C5.24 14.56 5.5 15.08 5.82 15.58L3.44 17.17L4.55 18.83L7.07 17.15C7.63 17.71 8.29 18.21 9.06 18.64L8.1 20.55L9.89 21.45L10.89 19.45L10.73 19.36C11.68 19.68 12.76 19.9 14 19.97V22H16V19.93C16.76 19.84 17.81 19.64 18.77 19.19L20.29 20.71L21.7 19.29L20.37 17.95C20.75 17.44 21 16.8 21 16ZM8.5 11C8.10218 11 7.72065 10.842 7.43934 10.5607C7.15804 10.2794 7 9.89782 7 9.5C7 9.10218 7.15804 8.72064 7.43934 8.43934C7.72065 8.15804 8.10218 8 8.5 8C8.89783 8 9.27936 8.15804 9.56066 8.43934C9.84197 8.72064 10 9.10218 10 9.5C10 9.89782 9.84197 10.2794 9.56066 10.5607C9.27936 10.842 8.89783 11 8.5 11ZM11 14C10.7348 14 10.4804 13.8946 10.2929 13.7071C10.1054 13.5196 10 13.2652 10 13C10 12.7348 10.1054 12.4804 10.2929 12.2929C10.4804 12.1054 10.7348 12 11 12C11.2652 12 11.5196 12.1054 11.7071 12.2929C11.8946 12.4804 12 12.7348 12 13C12 13.2652 11.8946 13.5196 11.7071 13.7071C11.5196 13.8946 11.2652 14 11 14ZM15.5 17C15.1022 17 14.7206 16.842 14.4393 16.5607C14.158 16.2794 14 15.8978 14 15.5C14 15.1022 14.158 14.7206 14.4393 14.4393C14.7206 14.158 15.1022 14 15.5 14C15.8978 14 16.2794 14.158 16.5607 14.4393C16.842 14.7206 17 15.1022 17 15.5C17 15.8978 16.842 16.2794 16.5607 16.5607C16.2794 16.842 15.8978 17 15.5 17Z"
            fill="white"
          />
        </svg>
      ),
      color: "#FF9C55",
      title: "Tổng số bệnh",
      value: data?.diseaseCount,
      // growthRate: 4.35,
    },
    {
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5626 13.0002C10.5626 11.654 11.6539 10.5627 13.0001 10.5627C14.3463 10.5627 15.4376 11.654 15.4376 13.0002C15.4376 14.3464 14.3463 15.4377 13.0001 15.4377C11.6539 15.4377 10.5626 14.3464 10.5626 13.0002Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.16675 13.0002C2.16675 14.7762 2.62713 15.3743 3.54788 16.5705C5.38638 18.959 8.4697 21.6668 13.0001 21.6668C17.5305 21.6668 20.6138 18.959 22.4523 16.5705C23.373 15.3743 23.8334 14.7762 23.8334 13.0002C23.8334 11.2242 23.373 10.6261 22.4523 9.42985C20.6138 7.04135 17.5305 4.3335 13.0001 4.3335C8.4697 4.3335 5.38638 7.04135 3.54788 9.42985C2.62713 10.6261 2.16675 11.2242 2.16675 13.0002ZM13.0001 8.93766C10.7564 8.93766 8.93758 10.7565 8.93758 13.0002C8.93758 15.2438 10.7564 17.0627 13.0001 17.0627C15.2437 17.0627 17.0626 15.2438 17.0626 13.0002C17.0626 10.7565 15.2437 8.93766 13.0001 8.93766Z"
            fill="white"
          />
        </svg>
      ),
      color: "#8155FF",
      title: "Số lượng triệu chứng",
      value: data?.symptomCount,
      // growthRate: 2.59,
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_9_15"
            // style="mask-type:luminance"
            maskUnits="userSpaceOnUse"
            x="2"
            y="1"
            width="20"
            height="23"
          >
            <path
              d="M3 4.628L12.0045 2L21 4.628V10.017C20.9996 12.7788 20.1304 15.4704 18.5154 17.7108C16.9004 19.9512 14.6216 21.6267 12.0015 22.5C9.38048 21.627 7.10065 19.9514 5.48505 17.7105C3.86946 15.4696 3.00004 12.7771 3 10.0145V4.628Z"
              fill="white"
              stroke="white"
              stroke-width="2"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 11.5L11 15L17 9"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </mask>
          <g mask="url(#mask0_9_15)">
            <path d="M0 0H24V24H0V0Z" fill="white" />
          </g>
        </svg>
      ),
      color: "#18BFFF",
      title: "Số lượng biện pháp",
      value: data?.preventionCount,
      // growthRate: -0.95,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {dataStatsList.map((item, index) => (
          <div
            key={index}
            className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
          >
            <div
              className="flex h-14.5 w-14.5 items-center justify-center rounded-full"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
                  {item.value}
                </h4>
                <span className="text-body-sm font-medium">{item.title}</span>
              </div>

              {/* <span
                className={`flex items-center gap-1.5 text-body-sm font-medium ${
                  item.growthRate > 0 ? "text-green" : "text-red"
                }`}
              >
                {item.growthRate}%
                {item.growthRate > 0 ? (
                  <svg
                    className="fill-current"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.35716 2.3925L0.908974 5.745L5.0443e-07 4.86125L5 -5.1656e-07L10 4.86125L9.09103 5.745L5.64284 2.3925L5.64284 10L4.35716 10L4.35716 2.3925Z"
                      fill=""
                    />
                  </svg>
                ) : (
                  <svg
                    className="fill-current"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.64284 7.6075L9.09102 4.255L10 5.13875L5 10L-8.98488e-07 5.13875L0.908973 4.255L4.35716 7.6075L4.35716 7.6183e-07L5.64284 9.86625e-07L5.64284 7.6075Z"
                      fill=""
                    />
                  </svg>
                )}
              </span> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DataStatsOne;
