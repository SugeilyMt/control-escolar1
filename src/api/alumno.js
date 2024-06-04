import { API_URL } from '../utils/constantes'

export async function registrarApi(formData) {
    try {
        const url = `${API_URL}/alumnos`
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

export async function leerApi() {
    try {
        const url = `${API_URL}/alumnos`
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

export async function consultarApi(id) {
    try {
        const url = `${API_URL}/alumnos/${id}`
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

export async function actualizarApi(id, formData) {
    try {
        const url = `${API_URL}/alumnos/${id}`
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        const respuesta = await fetch(url, params)
        if (!respuesta.ok) {
            return false
        }
        return true
    } catch(error) {
        console.log(error)
        return null
    }
}

export async function eliminarApi(id) {
    try {
        const url = `${API_URL}/alumnos/${id}`
        const params = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const respuesta = await fetch(url, params)
        if (!respuesta.ok) {
            return false
        }
        return true
    } catch(error) {
        console.log(error)
        return null
    }
}