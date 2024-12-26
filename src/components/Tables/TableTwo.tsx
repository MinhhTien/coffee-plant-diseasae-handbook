"use client";
import { Product } from "@/types/product";
import { notifyError } from "@/utils/toastify";
import { useEffect, useState } from "react";
import { ListResponseDto } from "@/data/common.dto";
import { VarietyDto } from "@/data/data.dto";
import { ErrorResponseDto } from "@/utils/error.dto";
import { useApi } from "@/hooks/useApi";
import { redirect } from "next/navigation";
import Link from "next/link";
import Loader from "../common/Loader";

const productData: Product[] = [
  {
    image: "/images/product/product-01.png",
    name: "Apple Watch Series 7",
    category: "Electronics",
    price: 296,
    sold: 22,
    profit: 45,
  },
  {
    image: "/images/product/product-02.png",
    name: "Macbook Pro M1",
    category: "Electronics",
    price: 546,
    sold: 12,
    profit: 125,
  },
  {
    image: "/images/product/product-03.png",
    name: "Dell Inspiron 15",
    category: "Electronics",
    price: 443,
    sold: 64,
    profit: 247,
  },
  {
    image: "/images/product/product-04.png",
    name: "HP Probook 450",
    category: "Electronics",
    price: 499,
    sold: 72,
    profit: 103,
  },
];

const TableTwo = () => {
  const [data, setData] = useState<ListResponseDto<VarietyDto>>({
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
  const { getVarietyList } = useApi();
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
      const { data: varietyList, error: apiError } = await getVarietyList(
        "",
        pagination.pageIndex + 1,
        pagination.pageSize,
        [],
      );
      if (varietyList) {
        setData(varietyList);
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
  }, [getVarietyList, pagination.pageIndex, pagination.pageSize, sorting]);

  if (error) {
    notifyError(error.message);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Danh sách giống cà phê
        </h4>
      </div>

      <div className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-dark-3 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center px-2">
          <p className="font-medium">Tên giống</p>
        </div>
        <div className="col-span-2 hidden items-center px-2 sm:flex">
          <p className="font-medium">Mô tả</p>
        </div>
        <div className="col-span-1 flex items-center px-2">
          <p className="font-medium">Tên khoa học</p>
        </div>
        <div className="col-span-1 flex items-center px-2">
          <p className="font-medium">Xuất xứ</p>
        </div>
        <div className="col-span-1 flex items-center px-2">
          <p className="font-medium">Phân bố diện tích trồng</p>
        </div>
        <div className="col-span-1 flex items-center px-2">
          <p className="font-medium">Khí hậu thích hợp</p>
        </div>
      </div>

      {data.docs.map((variety, key) => (
        <Link key={key} href={`/coffee/${variety._id}`}>
          <div className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 hover:cursor-pointer hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-3 md:px-6 2xl:px-7.5">
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
              <p className="text-body-sm font-medium text-green">
                {variety.name}
              </p>
              {/* </div> */}
            </div>
            <div className="col-span-2 hidden max-h-21 items-center overflow-hidden px-2 sm:flex">
              <p className="line-clamp-2 text-body-sm font-medium text-dark dark:text-dark-6">
                {variety.description}
              </p>
            </div>
            <div className="col-span-1 flex items-center px-2">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {variety.scientificName}
              </p>
            </div>
            <div className="col-span-1 flex items-center px-2">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {variety.origin}
              </p>
            </div>
            <div className="col-span-1 flex items-center px-2">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {variety.distribution}
              </p>
            </div>
            <div className="col-span-1 flex items-center px-2">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {variety.suitableClimate}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TableTwo;
