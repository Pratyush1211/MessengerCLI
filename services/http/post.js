import BASEURL from '../config/baseurl'

async function post(slug, data, token=null){

    let url = BASEURL + slug
    let auth = `Bearer ${token}`

    let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Authorization': auth,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response.json()

}

export default post