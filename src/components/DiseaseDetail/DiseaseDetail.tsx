"use client";
import { DiseaseDto, VarietyDto } from "@/data/data.dto";
import { useApi } from "@/hooks/useApi";
import { ErrorResponseDto } from "@/utils/error.dto";
import { notifyError } from "@/utils/toastify";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import Image from "next/image";
import Link from "next/link";
import {
  formatLevel,
  formatPreventionType,
  formatSeason,
} from "@/utils/format";

interface DiseaseDetailProps {
  id: string;
}

const DiseaseDetail: React.FC<DiseaseDetailProps> = ({ id }) => {
  const [data, setData] = useState<DiseaseDto>();
  const [error, setError] = useState<ErrorResponseDto | null>(null);
  const { getDiseaseDetail } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data: diseaseByMonth, error: apiError } =
        await getDiseaseDetail(id);
      if (diseaseByMonth) {
        setData(diseaseByMonth);
      } else {
        setError(apiError);
      }
      setIsLoading(false);
    })();
  }, [getDiseaseDetail]);

  if (error) {
    notifyError(error.message);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="mb-6 rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="mb-6 border-b border-stroke px-4 py-6 dark:border-dark-3 sm:px-6 xl:px-9">
          <h3 className="text-[22px] font-bold leading-7 text-dark dark:text-white">
            {data?.name}
          </h3>

          <p className="mt-3 block font-medium">{data?.description}</p>
        </div>
        <div className="px-4 py-6 sm:px-6 xl:px-9">
          <div className="flex flex-col-reverse gap-5 xl:flex-row xl:justify-between">
            <div className="flex flex-1 flex-col gap-4 sm:flex-row xl:gap-9">
              <div className="flex-1">
                {/* <h4 className="mb-4 text-[22px] font-medium leading-[30px] text-dark dark:text-white">
                Roger Culhane
              </h4> */}
                <p className="mb-6 block">
                  <span className="mr-2 font-bold text-dark">
                    Tác nhân gây bệnh:{" "}
                  </span>{" "}
                  {data?.reason}
                </p>
                <span className="mt-2 block">
                  <span className="mr-2 font-bold text-dark">Mùa vụ: </span>{" "}
                  {formatSeason(data?.time.season ?? "")}
                </span>
                <span className="mt-2 block">
                  <span className="mr-2 font-bold text-dark">
                    Thời gian bắt đầu:{" "}
                  </span>{" "}
                  {new Date(data?.time.startTime ?? "").toLocaleDateString(
                    "vi-VN",
                  )}
                </span>
                <span className="mt-2 block">
                  <span className="mr-2 font-bold text-dark">
                    Thời gian kết thúc:{" "}
                  </span>{" "}
                  {new Date(data?.time.endTime ?? "").toLocaleDateString(
                    "vi-VN",
                  )}
                </span>
                {/* <span className="mt-2 block">
                  <span className="mr-2 font-bold text-dark">Hương vị: </span>{" "}
                  {data?.flavor}
                </span> */}
              </div>
              <div>
                <p className="block">
                  <span className="mr-2 font-bold text-dark">
                    Ngày phát hiện:{" "}
                  </span>{" "}
                  {new Date(data?.createdAt ?? "").toLocaleDateString("vi-VN")}
                </p>
                <span className="mt-2 block">
                  <span className="mr-2 font-bold text-dark">
                    Cập nhật cuối:{" "}
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

      <div className="mb-6 grid grid-cols-2 gap-6">
        <div className="col-span-1 rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="px-4 py-6 dark:border-dark-3 sm:px-6 xl:px-9">
            <h3 className="text-[22px] font-bold leading-7 text-dark dark:text-white">
              Các giống bị ảnh hưởng
            </h3>
          </div>

          <div className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-dark-3 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center px-2">
              <p className="font-medium">Giống cà phê</p>
            </div>
            <div className="col-span-3 hidden items-center px-2 sm:flex">
              <p className="font-medium">Tên khoa học</p>
            </div>
          </div>
          {data?.effectedVarieties.map((variety, key) => (
            <Link key={key} href={`/coffee/${variety._id}`}>
              <div
                onClick={() =>
                  localStorage.setItem("selectedMenu", `"giống cà phê"`)
                }
                className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 hover:cursor-pointer hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-3 md:px-6 2xl:px-7.5"
              >
                <div className="col-span-2 flex items-center gap-3 px-2">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative h-20 w-20 rounded-md">
                      <Image
                        src={variety.image || ""}
                        //   width={100}
                        //   height={100}
                        alt="Product"
                        fill={true}
                        className="rounded-sm object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-body-sm font-medium text-green">
                    {variety.name}
                  </p>
                  {/* </div> */}
                </div>
                <div className="col-span-3 hidden  items-center overflow-hidden px-2 sm:flex">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    {variety.scientificName}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="col-span-1 rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="px-4 py-6 dark:border-dark-3 sm:px-6 xl:px-9">
            <h3 className="text-[22px] font-bold leading-7 text-dark dark:text-white">
              Triệu chứng
            </h3>
          </div>
          <div className="grid grid-cols-3 border-t border-stroke px-4 py-4.5 dark:border-dark-3 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center px-2">
              <p className="font-medium">Mô tả triệu chứng</p>
            </div>
            <div className="col-span-1 hidden items-center px-2 sm:flex">
              <p className="font-medium">Mức độ nghiêm trọng</p>
            </div>
          </div>
          {data?.symptoms.map((variety, key) => (
            <div
              key={key}
              className="grid grid-cols-3 border-t border-stroke px-4 py-4.5 dark:border-dark-3 dark:hover:bg-dark-3 md:px-6 2xl:px-7.5"
            >
              <div className="col-span-2 flex items-center gap-3 px-2">
                {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative h-20 w-20 rounded-md">
                  <Image
                    src={variety.image || ""}
                    //   width={100}
                    //   height={100}
                    alt="Product"
                    fill={true}
                    className="rounded-sm object-cover"
                  />
                </div>
              </div> */}
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  {variety.name}
                </p>
                {/* </div> */}
              </div>
              <div className="col-span-1 hidden  items-center overflow-hidden px-2 sm:flex">
                <p className="text-body-sm font-medium text-green ">
                  {formatLevel(variety.level)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="px-4 py-6 dark:border-dark-3 sm:px-6 xl:px-9">
          <h3 className="text-[22px] font-bold leading-7 text-dark dark:text-white">
            Triệu chứng
          </h3>
        </div>
        <div className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-dark-3 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center px-2">
            <p className="font-medium">Tên biện pháp</p>
          </div>
          <div className="col-span-1 hidden items-center px-2 sm:flex">
            <p className="font-medium">Loại biện pháp</p>
          </div>
          <div className="col-span-1 hidden items-center px-2 sm:flex">
            <p className="font-medium">Hiệu quả</p>
          </div>
          <div className="col-span-3 hidden items-center px-2 sm:flex">
            <p className="font-medium">Hướng dẫn thực hiện</p>
          </div>
          <div className="col-span-2 hidden items-center px-2 sm:flex">
            <p className="font-medium">Ghi chú</p>
          </div>
        </div>
        {data?.preventions.map((variety, key) => (
          <div
            key={key}
            className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-dark-3 dark:hover:bg-dark-3 md:px-6 2xl:px-7.5"
          >
            <div className="col-span-2 flex items-center gap-3 px-2">
              {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative h-20 w-20 rounded-md">
                  <Image
                    src={variety.image || ""}
                    //   width={100}
                    //   height={100}
                    alt="Product"
                    fill={true}
                    className="rounded-sm object-cover"
                  />
                </div>
              </div> */}
              <p className="text-body-sm font-medium text-green">
                {variety.name}
              </p>
              {/* </div> */}
            </div>
            <div className="col-span-1 hidden  items-center overflow-hidden px-2 sm:flex">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {formatPreventionType(variety.type)}
              </p>
            </div>
            <div className="col-span-1 hidden  items-center overflow-hidden px-2 sm:flex">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {variety.effective}
              </p>
            </div>
            <div className="col-span-3 hidden  items-center overflow-hidden px-2 sm:flex">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {variety.instruction}
              </p>
            </div>
            <div className="col-span-2 hidden  items-center overflow-hidden px-2 sm:flex">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {variety.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DiseaseDetail;
