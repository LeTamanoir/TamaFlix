import { useEffect, useState } from "react";

export default function useFilter(data) {
  const [filteredData, setFilteredData] = useState(null);
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    setFilteredData(() =>
      data?.filter((file) =>
        file.name.toLowerCase().includes(filterInput.toLowerCase())
      )
    );
  }, [data, filterInput]);

  return [filteredData, setFilterInput];
}
