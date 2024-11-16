import axios from "axios"
import { TurboModuleRegistry } from "react-native"
import {getData, storeData} from "../utilities/storage/storage"
import { token } from "../utilities/keys"

const baseUrl = "https://memorytapbackend.onrender.com/api"

export const getRequest = async (endpoint)=>{
    const accessToken = await getData(token)
    try{
        const res = await axios.get(`${baseUrl}/${endpoint}`,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        }) 
        console.log("Get api response:",res)
        if(res.status === 200){
            return {
                data: res,
                status: true,

            }
        }else if(res.status === 400){
  return {
                data: [],
                status: false,
                
            }
        }else{
  return {
                data: [],
                status:false,
                
            }
        }
    }
    catch(e){
        console.log("get request error :",e)
    }

}

export const postRequest = async (endpoint,data)=>{
    try{
        const res = await axios.post(`${baseUrl}/${endpoint}`,data) 
        console.log("Get api response:",res)
        if(res.status===200){
            return{
                status: true,
                data:res
            }
        }else{
            return{
                status: false,
                data:res
            }
        }
    }
    catch(e){
        console.log("get request error :",e)
    }

}