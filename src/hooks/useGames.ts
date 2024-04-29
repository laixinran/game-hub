import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Game {
    id: number;
    name: string;
    background_image: string;
  }
  
interface FetchGamesResponse {
    count: number;
    results: Game[];
}

// create a custom hook for fetching games

const useGames = () => {

    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");

  //use the effect hook to send the fetch request to the backend
  useEffect(() => {
    const controller = new AbortController(); //to handle concellation

    apiClient
      .get<FetchGamesResponse>("/games", {signal: controller.signal})
      .then((res) => setGames(res.data.results))
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message)
      });

    
    return () => controller.abort(); //clean-up function
  }, []); //without [] (the dependency), we will constantly send request to backend

  return { games, error };
}

export default useGames;