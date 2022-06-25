import { useEffect, useState } from "react";

function sliceData<T = any>(
  data: T[],
  page: number,
  rowsPerPage: number,
  totalPages: number
) {
  const slice = data.slice(page - 1, page * rowsPerPage);
  if (slice.length < rowsPerPage) {
    const diff = rowsPerPage - slice.length;
    return data.slice(page - 1 - diff, page * rowsPerPage);
  }
  return slice;
}

function usePagination<T = any>(data: T[], page: number, rowsPerPage: number) {
  const [slice, setSlice] = useState<T[]>([]);

  useEffect(() => {
    const slice = sliceData(data, page, rowsPerPage, data.length);
    setSlice([...slice]);
  }, [data, page, setSlice, rowsPerPage]);

  return { slice };
}

export default usePagination;
