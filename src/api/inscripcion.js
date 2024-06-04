import { API_URL } from '../utils/constantes'

export async function registrarApi(formData) {
    try {
        const url = `${API_URL}/inscripciones`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        const respuesta = await fetch(url, params)
        const resultado = await respuesta.json()
        return resultado
    } catch(error) {
        console.log(error)
        return null
    }
}

export async function leerInscripcion() {
    try {
        const url = `${API_URL}/inscripciones`
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }
        const respuesta = await fetch(url, params)
        const resultado = await respuesta.json()
        return resultado
    } catch(error) {
        console.log(error)
        return null
    }
}