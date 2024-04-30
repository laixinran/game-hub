import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Genre {
    id: number;
    name: string;
}

interface FetchGenresResponse {
    count: number;
    results: Genre[];
}

// create a custom hook for fetching genres
const useGenres = () => {

    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
    

  //use the effect hook to send the fetch request to the backend
  useEffect(() => {
    const controller = new AbortController(); //to handle cancellation

    // before calling the api, set loading to true; when done, set to false
    setLoading(true);

    apiClient
      .get<FetchGenresResponse>("/genres", {signal: controller.signal})
      .then((res) => {
        setGenres(res.data.results)
        setLoading(false);
    })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message)
        setLoading(false);
      });

    
    return () => controller.abort(); //clean-up function
  }, []); //without [] (the dependency), we will constantly send request to backend

  return { genres, error, isLoading };
}

export default useGenres;


