import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Tour = () => {
    const { name } = useParams();
    const [ detail, setDetail ] = useState(null);
    useEffect(()=> {
        const getDetail = async() => {
            try {
                const response = await axios.get(`/tours?filters[name]=${name}`)
                setDetail(response.data.data[0].attributes)
            } catch (error) {
                console.log(error)
            }
        }
        getDetail();
    },[])

    return(
        <div>
            <h1>Hello, Detail</h1>
        </div>
    )
}
export default Tour