import "./App.css"
import HomePage from "./pages/HomePage/HomePage"
import {useEffect, useState} from "react"
import axios from "axios"
import Loader from "./components/Loader/Loader"
import useInterval from "./hooks/useInterval"

const App = () => {
    const [isLoading, setLoading] = useState(true)
    const [workers, setWorkers] = useState(null)

    const fetchWorkers = () => {
        axios.get("/get_workers").then(response => {
            setWorkers(response.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchWorkers()
    }, [])

    useInterval(fetchWorkers, 100)

    if (isLoading) {
        return (
            <div className="flex justify-center pt-10">
                <Loader/>
            </div>
        )
    }
    return (
        <>
            <HomePage workers={workers}/>
        </>
    )
}

export default App
