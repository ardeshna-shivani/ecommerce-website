import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async(url,formData) => {
        try{
            const response = await fetch(apiUrl + url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json(); // always parse JSON

        return {
            status: response.status,
            ok: response.ok,
            ...data
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
        console.log("API Error:", error);
        return {
            error: true,
            message: "Something went wrong. Please try again."
        }
        
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


export const deleteData = async(url) => {
    const params = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-type': 'application/json',
        }
    }
    const {res} = await axios.delete(apiUrl+url,params);
    return res;
}