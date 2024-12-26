import { ListResponseDto } from "@/data/common.dto";
import {
  DiseaseDto,
  SummaryDto,
  SymtomByLevelDto,
  VarietyDto,
} from "@/data/data.dto";
import { callApi } from "@/utils/apiCaller";
import { ErrorResponseDto } from "@/utils/error.dto";
import { useCallback } from "react";

const VARIETY_ROOT_ENDPOINT = "/varieties";
const DISEASE_ROOT_ENDPOINT = "/diseases";
const REPORT_ROOT_ENDPOINT = "/reports";

export const useApi = () => {
  const getVarietyList = useCallback(
    async (
      search = "",
      page = 1,
      pageSize = 10,
      sorting: { field: string; desc: boolean }[] = [],
    ) => {
      const endpoint = `${VARIETY_ROOT_ENDPOINT}`;
      const sortingFormat = sorting
        .map((sort) => `${sort.field}.${sort.desc ? "desc" : "asc"}`)
        .join("_");
      const result = await callApi<ListResponseDto<VarietyDto>>(
        endpoint,
        "GET",
        {
          search: search,
          page,
          limit: pageSize,
          sort: sortingFormat,
        },
        {},
        {},
      );

      if (result) {
        const { data, error } = result;
        if (data) return { data: data, error: null };
        if (error.response)
          return { data: null, error: error.response.data as ErrorResponseDto };
      }

      return {
        data: null,
        error: { message: "Lỗi khi load dữ liệu" } as ErrorResponseDto,
      };
    },
    [],
  );

  const getDiseaseList = useCallback(
    async (
      search = "",
      page = 1,
      pageSize = 10,
      sorting: { field: string; desc: boolean }[] = [],
    ) => {
      const endpoint = `${DISEASE_ROOT_ENDPOINT}`;
      const sortingFormat = sorting
        .map((sort) => `${sort.field}.${sort.desc ? "desc" : "asc"}`)
        .join("_");
      const result = await callApi<ListResponseDto<DiseaseDto>>(
        endpoint,
        "GET",
        {
          search: search,
          page,
          limit: pageSize,
          sort: sortingFormat,
        },
        {},
        {},
      );

      if (result) {
        const { data, error } = result;
        if (data) return { data: data, error: null };
        if (error.response)
          return { data: null, error: error.response.data as ErrorResponseDto };
      }

      return {
        data: null,
        error: { message: "Lỗi khi load dữ liệu" } as ErrorResponseDto,
      };
    },
    [],
  );

  const getDiseaseDetail = useCallback(async (id: string) => {
    const endpoint = `${DISEASE_ROOT_ENDPOINT}/${id}`;
    const result = await callApi<DiseaseDto>(endpoint, "GET", {}, {}, {});

    if (result) {
      const { data, error } = result;
      if (data) return { data: data, error: null };
      if (error.response)
        return { data: null, error: error.response.data as ErrorResponseDto };
    }

    return {
      data: null,
      error: { message: "Lỗi khi load dữ liệu" } as ErrorResponseDto,
    };
  }, []);

  const getVarietyDetail = useCallback(async (id: string) => {
    const endpoint = `${VARIETY_ROOT_ENDPOINT}/${id}`;
    const result = await callApi<VarietyDto>(endpoint, "GET", {}, {}, {});

    if (result) {
      const { data, error } = result;
      if (data) return { data: data, error: null };
      if (error.response)
        return { data: null, error: error.response.data as ErrorResponseDto };
    }

    return {
      data: null,
      error: { message: "Lỗi khi load dữ liệu" } as ErrorResponseDto,
    };
  }, []);

  const getSumaryReport = useCallback(async () => {
    const endpoint = `${REPORT_ROOT_ENDPOINT}/summary`;
    const result = await callApi<SummaryDto>(endpoint, "GET", {}, {}, {});

    if (result) {
      const { data, error } = result;
      if (data) return { data: data, error: null };
      if (error.response)
        return { data: null, error: error.response.data as ErrorResponseDto };
    }

    return {
      data: null,
      error: { message: "Lỗi khi load dữ liệu" } as ErrorResponseDto,
    };
  }, []);

  const getSymtomsByLevel = useCallback(async () => {
    const endpoint = `${REPORT_ROOT_ENDPOINT}/symptom-by-level`;
    const result = await callApi<SymtomByLevelDto[]>(
      endpoint,
      "GET",
      {},
      {},
      {},
    );

    if (result) {
      const { data, error } = result;
      if (data) return { data: data, error: null };
      if (error.response)
        return { data: null, error: error.response.data as ErrorResponseDto };
    }

    return {
      data: null,
      error: { message: "Lỗi khi load dữ liệu" } as ErrorResponseDto,
    };
  }, []);

  const getDiseaseByMonth = useCallback(async () => {
    const endpoint = `${REPORT_ROOT_ENDPOINT}/disease-by-month`;
    const result = await callApi<number[]>(
      endpoint,
      "GET",
      {},
      {},
      {},
    );

    if (result) {
      const { data, error } = result;
      if (data) return { data: data, error: null };
      if (error.response)
        return { data: null, error: error.response.data as ErrorResponseDto };
    }

    return {
      data: null,
      error: { message: "Lỗi khi load dữ liệu" } as ErrorResponseDto,
    };
  }, []);

  return {
    getVarietyList,
    getDiseaseList,
    getDiseaseDetail,
    getVarietyDetail,
    getSumaryReport,
    getSymtomsByLevel,
    getDiseaseByMonth,
  };
};
