import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;
  }
  
interface FetchGamesResponse {
    count: number;
    results: Game[];
}


// create a custom hook for fetching games
const useGames = () => {

    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
    

  //use the effect hook to send the fetch request to the backend
  useEffect(() => {
    const controller = new AbortController(); //to handle cancellation

    // before calling the api, set loading to true; when done, set to false
    setLoading(true);

    apiClient
      .get<FetchGamesResponse>("/games", {signal: controller.signal})
      .then((res) => {
        setGames(res.data.results)
        setLoading(false);
    })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message)
        setLoading(false);
      });

    
    return () => controller.abort(); //clean-up function
  }, []); //without [] (the dependency), we will constantly send request to backend

  return { games, error, isLoading };
}

export default useGames;