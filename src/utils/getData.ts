export const getData = async (url: string) => {
    return fetch(url).then(data => data.json())
}