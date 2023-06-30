import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { keepLogin } from './reducerwat';
 //  console.log(children)
    // console.log(user);


const Awoo = ({ children }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.AuthReducer);
    useEffect(() => {
        dispatch(keepLogin());
    }, [dispatch]);

   
    return <>{children}</>
}

export default Awoo;