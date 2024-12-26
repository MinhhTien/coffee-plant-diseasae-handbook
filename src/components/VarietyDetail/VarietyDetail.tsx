"use client";
import { VarietyDto } from "@/data/data.dto";
import { useApi } from "@/hooks/useApi";
import { ErrorResponseDto } from "@/utils/error.dto";
import { notifyError } from "@/utils/toastify";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";

interface VarietyDetailProps {
  id: string;
}

const VarietyDetail: React.FC<VarietyDetailProps> = ({ id }) => {
  const [data, setData] = useState<VarietyDto>();
  const [error, setError] = useState<ErrorResponseDto | null>(null);
  const { getVarietyDetail } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data: diseaseByMonth, error: apiError } =
        await getVarietyDetail(id);
      if (diseaseByMonth) {
        setData(diseaseByMonth);
      } else {
        setError(apiError);
      }
      setIsLoading(false);
    })();
  }, [getVarietyDetail]);

  if (error) {
    notifyError(error.message);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="border-b border-stroke px-4 py-6 dark:border-dark-3 sm:px-6 xl:px-9">
        <h3 className="text-[22px] font-bold leading-7 text-dark dark:text-white">
          {data?.name}
        </h3>

        <p className="mt-3 block font-medium">{data?.description}</p>
      </div>
      <div className="p-4 sm:p-6 xl:p-9">
        <div className="flex flex-col-reverse gap-5 xl:flex-row xl:justify-between">
          <div className="flex flex-1 flex-col gap-4 sm:flex-row xl:gap-9">
            <div className="flex-1">
              {/* <h4 className="mb-4 text-[22px] font-medium leading-[30px] text-dark dark:text-white">
                Roger Culhane
              </h4> */}
              <p className="block">
                <span className="mr-2 font-bold text-dark">Tên khoa học: </span>{" "}
                {data?.scientificName}
              </p>
              <span className="mt-2 block">
                <span className="mr-2 font-bold text-dark">Chiều cao: </span>{" "}
                {data?.height}
              </span>
              <span className="mt-2 block">
                <span className="mr-2 font-bold text-dark">Lá: </span>{" "}
                {data?.leaf}
              </span>
              <span className="mt-2 block">
                <span className="mr-2 font-bold text-dark">Hạt/Quả: </span>{" "}
                {data?.bean}
              </span>
              <span className="mt-2 block">
                <span className="mr-2 font-bold text-dark">Hương vị: </span>{" "}
                {data?.flavor}
              </span>
            </div>
            <div className="flex-1">
              {/* <h4 className="mb-4 text-[22px] font-medium leading-[30px] text-dark dark:text-white">
                Cristofer Levin
              </h4> */}
              <p className="block">
                <span className="mr-2 font-bold text-dark">Xuất xứ: </span>{" "}
                {data?.origin}
              </p>
              <span className="mt-2 block">
                <span className="mr-2 font-bold text-dark">
                  Phân bố diện tích trồng:
                </span>{" "}
                {data?.distribution}
              </span>
              <span className="mt-2 block">
                <span className="mr-2 font-bold text-dark">
                  Khí hậu thích hợp:
                </span>{" "}
                {data?.suitableClimate}
              </span>
            </div>
            <div>
              <p className="block">
                <span className="mr-2 font-bold text-dark">Ngày tạo: </span>{" "}
                {new Date(data?.createdAt ?? "").toLocaleDateString("vi-VN")}
              </p>
              <span className="mt-2 block">
                <span className="mr-2 font-bold text-dark">
                  Ngày cập nhật:{" "}
                </span>{" "}
                {new Date(data?.updatedAt ?? "").toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div>
          {/* <h3 className="text-heading-6 font-medium text-dark dark:text-white">
            Order #15478
          </h3> */}
        </div>
      </div>
    </div>
  );
};

export default VarietyDetail;
