import axios from "axios"



export default class ApiHandler {
    constructor(url) {
        this.url = url
    }


    async getData(resourse) {
        try {
            const res = await axios.get(this.url + resourse)

            return res.data
        } catch (e) {
            return {
                message: e.message
            }
        }
    }

    async postData(resourse, body) {
        try {
            const res = await axios.post(this.url + resourse, body)

            return res.data
        } catch (e) {
            return {
                message: e.message
            }
        }
    }

    async patchData(resourse, body) {
        try {
            const res = await axios.patch(this.url + resourse, body)

            return res
        } catch (e) {
            return {
                message: e.message
            }
        }
    }
    async deleteData(resourse) {
        try {
            const res = await axios.delete(this.url + resourse)

            return res
        } catch (e) {
            return {
                message: e.message
            }
        }
    }
}