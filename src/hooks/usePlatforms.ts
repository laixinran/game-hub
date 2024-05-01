import useData from "./useData";

interface Platform {
    id: number;
    name: string;
    slug: string
}

// create a custom hook for fetching platforms
const usePlatforms = () => {
    return useData<Platform>("/platforms/lists/parents");
 }
 
 export default usePlatforms;
 
 