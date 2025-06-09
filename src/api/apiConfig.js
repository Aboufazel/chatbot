import axios from "axios";
const devUrl ='https://api.commercial.revaaldev.ir/'
const softUrl ='https://api.ai.revaalsoft.com'


export const BaseUrl = axios.create({
    // baseURL:devUrl
    baseURL:softUrl
})



export const sendAiMessage = (data)=>{
  return BaseUrl({
      method:'post',
      url:'/Commercial/AI/text',
      data:data,
  })
}
