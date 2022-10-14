import { useEffect, useState } from "react"

export const usePosts = (page, limit) => {
    const [data, setData] = useState(null)

    const fetchData = async () => {
        const res = await fetch(`https://6144e843411c860017d256f0.mockapi.io/api/v1/posts?page=${page}&limit=${limit}`)
        const json = await res.json()
        setData(json)
    }

    useEffect(() => { fetchData() }, [page])

    return data;
}

export const usePost = (id) => {
    const [data, setData] = useState(null)

    const fetchData = async () => {
        const res = await fetch(`https://6144e843411c860017d256f0.mockapi.io/api/v1/posts/${id}`)
        const json = await res.json()
        setData(json)
    }

    useEffect(() => { fetchData() }, [id])

    return data;
}