const urlBase = 'http://localhost:4200'

function fetch(url){
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve(res.statusCode)
    }
  })
}

async function prepareEndToEnd(){
  const status = await fetch(urlBase)
  console.log({status})
}