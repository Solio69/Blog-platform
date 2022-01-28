
// import React from 'react'
import { useSelector } from 'react-redux'

const stateUser = () => {
    const test = useSelector((state) => state.user);
    return test
}

export {stateUser}