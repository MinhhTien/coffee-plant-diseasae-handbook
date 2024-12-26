"use client"
import { ListResponseDto } from "@/data/common.dto";
import { DiseaseDto } from "@/data/data.dto";
import { useApi } from "@/hooks/useApi";
import { BRAND } from "@/types/brand";
import { ErrorResponseDto } from "@/utils/error.dto";
import { formatSeason } from "@/utils/format";
import { notifyError } from "@/utils/toastify";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TableOne = () => {
  const router = useRouter();
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

  useEffect(() => {
    (async () => {
      const { data: diseaseList, error: apiError } = await getDiseaseList(
        "",
        pagination.pageIndex + 1,
        pagination.pageSize,
        [{ field: "createdAt", desc: true }],
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
    })();
  }, [getDiseaseList, pagination.pageIndex, pagination.pageSize, sorting]);

  if (error) {
    notifyError(error.message);
  }

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Bệnh mới cập nhật
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-9">
          <div className="col-span-2 px-2 pb-3.5">
            <h5 className="text-sm font-medium xsm:text-base">Tên bệnh</h5>
          </div>
          <div className="col-span-3 px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium xsm:text-base">
              Tác nhân gây bệnh
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium xsm:text-base">Mùa vụ</h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium xsm:text-base">
              Số triệu chứng
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium xsm:text-base">
              Số giống bị ảnh hưởng
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium xsm:text-base">Số biện pháp</h5>
          </div>
        </div>

        {data.docs.map((disease, key) => (
          <Link key={key} href={`/disease/${disease._id}`}>
            <div
              className={`grid grid-cols-9 hover:cursor-pointer hover:bg-gray-2 dark:hover:bg-dark-3 ${
                key === data.docs.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-dark-3"
              }`}
            >
              <div className="col-span-2 flex items-center gap-3.5 px-2 py-4">
                {/* <div className="flex-shrink-0">
                <Image src={disease.logo} alt="Brand" width={48} height={48} />
              </div> */}
                <p className="hidden font-medium text-dark dark:text-white sm:block">
                  {disease.name}
                </p>
              </div>

              <div className="col-span-3 flex h-21 items-center justify-start overflow-hidden px-2 py-4">
                <p className="line-clamp-2 overflow-hidden font-medium text-dark dark:text-white">
                  {disease.reason}
                </p>
              </div>

              <div className="flex items-center justify-center px-2 py-4">
                <p className="font-medium text-green-light-1">
                  {formatSeason(disease.time.season)}
                </p>
              </div>

              <div className="hidden items-center justify-center px-2 py-4 sm:flex">
                <p className="font-medium text-dark dark:text-white">
                  {disease.symptoms.length}
                </p>
              </div>

              <div className="hidden items-center justify-center px-2 py-4 sm:flex">
                <p className="font-medium text-dark dark:text-white">
                  {disease.effectedVarieties.length}
                </p>
              </div>

              <div className="hidden items-center justify-center px-2 py-4 sm:flex">
                <p className="font-medium text-dark dark:text-white">
                  {disease.preventions.length}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
