const axios = require('axios')

const CONCURRENT_REQUESTS = 5 // número de requisições simultâneas
const REQUESTS_TOTAL = 1000 // total de requisições que serão feitas

const TARGET_URL = 'http://localhost:3000/hash/123'

async function sendRequest(i) {
    try {
        const response = await axios.get(TARGET_URL)
        console.log(`[${i}] Status: ${response.status}`)
    } catch (error) {
        if (error.response) {
            console.log(`[${i}] Erro: ${error.response.status}`)
        } else {
            console.log(`[${i}] Erro: ${error.message}`)
        }
    }
}

async function run() {
    let promises = []

    for (let i = 1; i <= REQUESTS_TOTAL; i++) {
        promises.push(sendRequest(i))

        if (promises.length >= CONCURRENT_REQUESTS) {
            await Promise.all(promises)
            promises = []
        }
    }

    // Aguarda qualquer sobra
    if (promises.length > 0) {
        await Promise.all(promises)
    }

    console.log('Finalizado!')
}

run()
