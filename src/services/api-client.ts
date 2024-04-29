import axios from "axios";


//create an axios instance 
export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: '35b309bd9d7748f99fc22782c8ad0ddb' //api key
    }
})


