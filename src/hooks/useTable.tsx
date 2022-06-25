import { useEffect, useState } from "react";

function calculateRange<T = any>(data: T[], rowsPerPage: number) {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
}

function sliceData<T = any>(data: T[], page: number, rowsPerPage: number) {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
}

function useTable<T = any>(data: T[], page: number, rowsPerPage: number) {
  const [tableRange, setTableRange] = useState<number[]>([]);
  const [slice, setSlice] = useState<T[]>([]);

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice, rowsPerPage]);

  return { slice, range: tableRange };
}

export default useTable;
