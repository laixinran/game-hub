//create a generic data fetching hook

import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";


interface FetchResponse<T> {
    count: number;
    results: T[];
}


const useData = <T>(endpoint: string) => {

    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
    

  //use the effect hook to send the fetch request to the backend
  useEffect(() => {
    const controller = new AbortController(); //to handle cancellation

    // before calling the api, set loading to true; when done, set to false
    setLoading(true);

    apiClient
      .get<FetchResponse<T>>(endpoint, {signal: controller.signal})
      .then((res) => {
        setData(res.data.results)
        setLoading(false);
    })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message)
        setLoading(false);
      });

    
    return () => controller.abort(); //clean-up function
  }, []); //without [] (the dependency), we will constantly send request to backend

  return { data, error, isLoading };
}

export default useData;


