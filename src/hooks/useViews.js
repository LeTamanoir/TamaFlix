import { useEffect, useState } from "react";
import useStore from "./useStore";

export default function useViews() {
  const [isSet, views, setViews] = useStore("views", []);

  const fetchViews = async () => {
    const res = await fetch("/api/tracker");
    const data = await res.json();

    setViews(data);
  };

  useEffect(() => {
    if (isSet !== null && !isSet) fetchViews();
  }, [isSet]);

  return [views, fetchViews];
}
