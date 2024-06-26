import useData from "./useData";

export interface Genre {
    id: number;
    name: string;
    image_background: string;
}


// create a custom hook for fetching genres
const useGenres = () => {
   return useData<Genre>('/genres');
}

export default useGenres;


