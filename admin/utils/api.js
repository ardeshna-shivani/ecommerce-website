import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async(url,formData) => {
        try{
            const response = await fetch(apiUrl + url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if(response.ok){
                const data = await response.json;
                return data;
            }else{
                const errorData = await response.json;
                return errorData;
            }
        }
        catch(error){
            console.log(error);
            
        }
}

export const fetchDataFromAPi = async(url) => {
    try{
        const params = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-type': 'application/json',
            }
        }
        const {data} = await axios.get(apiUrl+ url,params);
        return data;
    }
    catch(error){
        console.log(error);
        return error;
        
    }
}

export const uploadImage = async(url, updataData) => {
    const params = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-type': 'multipart/form-data',
        }
    }
    var response;
    await axios.put(apiUrl + url ,updataData,params).then((res) => {
            //  console.log(res);
            response= res;
        })
        return response;
}


export const editData = async(url, updataData) => {
    const params = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-type': 'application/json',
        }
    }
    var response;
    await axios.put(apiUrl + url ,updataData,params).then((res) => {
            //  console.log(res);
            response= res;
        })
        return response;
}


export const deleteImages = async(url,image) => {
    const params = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-type': 'application/json',
        }
    }
    const {res} = await axios.delete(apiUrl+ url,image,params)
    return res;
}