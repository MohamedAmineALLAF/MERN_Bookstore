import axios from 'axios';
import { message } from 'antd';

export const bookCar=(reqObj)=>async dispatch=>{

    dispatch({type: 'LOADING', payload:true})
        try {
        const response = await axios.post('http://localhost:8000/paybook',reqObj)
        console.log(response);
        window.location = response.data.url;
        
        dispatch({type: 'LOADING', payload:false})
        
        
        } catch (error){
            console.log(error);
            dispatch({type: 'LOADING', payload:false})
            message.error('something went wrong ')
        }

}