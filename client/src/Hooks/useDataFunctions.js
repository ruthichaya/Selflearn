import axios from 'axios';

export const useDataFunctions =  () => {
     const getDataFunc = async (url) => {
    console.log( {url});
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
     return { getDataFunc }
}
