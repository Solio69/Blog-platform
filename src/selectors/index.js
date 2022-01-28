
// import React from 'react'
import { useSelector } from 'react-redux'

const useStateUser = () => {
    const test = useSelector((state) => state.user);
    return test
}

export {useStateUser}