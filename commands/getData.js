import fetch from "node-fetch"

export const getData = async(url) =>{
    const response = await fetch(url)
    if(!response.ok) throw new Error(response.statusText)
    return await response.json()

}
