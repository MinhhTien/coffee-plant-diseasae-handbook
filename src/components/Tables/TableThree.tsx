"use client";
import { ListResponseDto } from "@/data/common.dto";
import { DiseaseDto } from "@/data/data.dto";
import { useApi } from "@/hooks/useApi";
import { Package } from "@/types/package";
import { ErrorResponseDto } from "@/utils/error.dto";
import { formatSeason } from "@/utils/format";
import { notifyError } from "@/utils/toastify";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";

const packageData: Package[] = [
  {
    name: "Free package",
    price: 0.0,
    invoiceDate: `Jan 13,2023`,
    status: "Paid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Paid",
  },
  {
    name: "Business Package",
    price: 99.0,
    invoiceDate: `Jan 13,2023`,
    status: "Unpaid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Pending",
  },
];

const TableThree = () => {
  const [data, setData] = useState<ListResponseDto<DiseaseDto>>({
    docs: [],
    totalDocs: 0,
    offset: 0,
    limit: 0,
    totalPages: 0,
    page: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  });
  const [error, setError] = useState<ErrorResponseDto | null>(null);
  const { getDiseaseList } = useApi();
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 0,
    pageSize: 99,
  });
  const [sorting, setSorting] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data: diseaseList, error: apiError } = await getDiseaseList(
        "",
        pagination.pageIndex + 1,
        pagination.pageSize,
        [],
      );
      if (diseaseList) {
        setData(diseaseList);
      } else {
        setData({
          docs: [],
          totalDocs: 0,
          offset: 0,
          limit: 0,
          totalPages: 0,
          page: 0,
          pagingCounter: 0,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: null,
          nextPage: null,
        });
      }
      setError(apiError);
      setIsLoading(false);
    })();
  }, [getDiseaseList, pagination.pageIndex, pagination.pageSize, sorting]);

  if (error) {
    notifyError(error.message);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Danh sách bệnh cây cà phê
        </h4>
      </div>

      <div className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-dark-3 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center px-2">
          <p className="font-medium">Tên bệnh</p>
        </div>
        <div className="col-span-2 hidden items-center px-2 sm:flex">
          <p className="font-medium">tác nhân gây bệnh</p>
        </div>
        <div className="col-span-1 flex items-center px-2">
          <p className="font-medium">Mùa vụ</p>
        </div>
        <div className="col-span-1 flex items-center px-2">
          <p className="font-medium">Số triệu chứng</p>
        </div>
        <div className="col-span-1 flex items-center px-2">
          <p className="font-medium">Số giống bị ảnh hưởng</p>
        </div>
        <div className="col-span-1 flex items-center px-2">
          <p className="font-medium">Số biện pháp</p>
        </div>
      </div>

      {data.docs.map((disease, key) => (
        <Link key={key} href={`/disease/${disease._id}`}>
          <div className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 hover:cursor-pointer hover:bg-gray-2 dark:hover:bg-dark-3 dark:border-dark-3 md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center px-2 ">
              {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center"> */}
              {/* <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={variety.name}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div> */}
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {disease.name}
              </p>
              {/* </div> */}
            </div>
            <div className="col-span-2 hidden max-h-21 items-center overflow-hidden px-2 sm:flex">
              <p className="line-clamp-2 text-body-sm font-medium text-dark dark:text-dark-6">
                {disease.reason}
              </p>
            </div>
            <div className="col-span-1 flex items-center px-2">
              <p className="text-body-sm font-medium text-green">
                 {formatSeason(disease.time.season)}
              </p>
            </div>
            <div className="col-span-1 flex items-center px-2">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {disease.symptoms.length}
              </p>
            </div>
            <div className="col-span-1 flex items-center px-2">
              <p className="text-body-sm font-medium">
                {disease.effectedVarieties.length}
              </p>
            </div>
            <div className="col-span-1 flex items-center px-2">
              <p className="text-body-sm font-medium ">
                {disease.preventions.length}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TableThree;
