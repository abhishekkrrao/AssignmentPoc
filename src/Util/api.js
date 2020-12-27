import { create } from 'apisauce'
const api = create({
    baseURL: '',
    headers: { Accept: 'application/json' },
});
export const apiCall = (url) => {
    console.log("url ",url)
    return new Promise((resolve, reject) => {
        try {
            api
            .get(url)
            .then((response) => {
                resolve(response);
            })
            .then(console.log)

        } catch (errors) {
            reject(errors)
        }
    });
}

 