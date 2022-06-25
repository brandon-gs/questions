import React, { Dispatch, useMemo } from "react";
import Select from "react-select";
import styles from "./TableFilter.module.css";

interface TableFilterProps {
  text: string;
  filters: string[];
  setFilters: Dispatch<React.SetStateAction<string[]>>;
}

function TableFilter({ text, filters, setFilters }: TableFilterProps) {
  const options = useMemo(() => {
    return filters.map((filter) => {
      if (filter === "multiple") {
        return { value: filter, label: "Multiple Choice" };
      }
      if (filter === "boolean") {
        return { value: filter, label: "True / False" };
      }
      return { value: filter, label: filter };
    });
  }, [filters]);

  return (
    <div className={styles.table_filter_container}>
      <p className={styles.filter_title}>{text}:</p>
      <Select
        isMulti
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(selectedOptions) => {
          setFilters(selectedOptions.map(({ value }) => value));
        }}
        styles={{
          menu: (styles) => ({
            ...styles,
            background: "#262a35",
            color: "#FFF",
          }),
          control: (styles) => ({ ...styles, backgroundColor: "#2622a35" }),
          placeholder: (styles) => ({ ...styles, color: "#FFF" }),
          multiValue: (styles) => {
            return {
              ...styles,
              backgroundColor: "#1b1b1b",
            };
          },
          multiValueLabel: (styles) => ({
            ...styles,
            color: "#FFF",
          }),
          option: (styles, { isFocused, isSelected }) => {
            return {
              ...styles,
              backgroundColor: isSelected
                ? "#0ce3ac"
                : isFocused
                ? "#000"
                : undefined,
              color: "#FFF",
              ":active": {
                ...styles[":active"],
                backgroundColor: isSelected ? "red" : undefined,
              },
            };
          },
        }}
      />
      {/* <div className={styles.filter_inputs}>
        {filters.map((filter) => (
          <div key={`filter-${text}-${filter}`}>
            <input
              className={styles.filter_input}
              type="checkbox"
              id={`type-${filter}`}
              onChange={(e) => {
                if (e.target.checked) {
                  setFilters((prev) => [...prev, filter]);
                } else {
                  setFilters((prev) => [...prev].filter((_t) => _t !== filter));
                }
              }}
            />
            <label htmlFor={`type-${filter}`} className={styles.input_label}>
              {filter === "multiple"
                ? "Multiple Choice"
                : filter === "boolean"
                ? "True / False"
                : filter}
            </label>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default TableFilter;
