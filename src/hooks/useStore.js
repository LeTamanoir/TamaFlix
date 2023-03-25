import { useEffect, useState } from "react";

export default function useStore(dataKey, defVal) {
  const [data, setData] = useState(defVal);
  const [isSet, setIsSet] = useState(null);

  useEffect(() => {
    let localData = localStorage.getItem(dataKey);

    if (localData) setData(JSON.parse(localData));
    else setIsSet(false);
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      setIsSet(true);
    }

    if (data?.length > 0 && isSet) {
      localStorage.setItem(dataKey, JSON.stringify(data));
    }
  }, [data, isSet]);

  return [isSet, data, setData];
}
