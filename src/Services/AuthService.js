import axios from "axios";


export async function SignUpUser(values) {
    try{
        const res=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values);

        return res.data;
    }catch(err){
        return(err.response?.data);
    }
    
}
export async function SignInUser(values) {
    try{
        const res=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values);

        return res.data;
    }catch(err){
        return(err.response?.data);
    }
    
}