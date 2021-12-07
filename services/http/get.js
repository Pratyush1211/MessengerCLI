import BASEURL from '../config/baseurl'

async function get(slug, token=null){

    let url = BASEURL + slug 
    let auth = `Bearer ${token}`
    
    const response = await fetch( url, {
        method: 'GET',
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
        }
    })

    return response.json()
}

export default get