const baseUrl = process.env.REACT_APP_API_URL;

export const fecthSintoken = async(endpoint, data, method = "GET") =>{

        const url = `${baseUrl}/${endpoint}`;

        if(method === "GET"){

            const resp = await fetch(url);
            return await resp.json();

        }else{

            const resp = await fetch(url, {
                method,
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify(data)
            });
            return await resp.json();

        }

}



export const fecthContoken = async(endpoint, data, method = "GET") =>{

    const token = localStorage.getItem('token') || '';
    const url = `${baseUrl}/${endpoint}`;

    if(method === "GET"){

        const resp = await fetch(url,{
            headers:{
                'x-token':token, 
            }
        });
        return await resp.json();

    }else{

        const resp = await fetch(url, {
            method,
            headers:{
                'x-token':token,
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)
        });
        return await resp.json();

    }

}