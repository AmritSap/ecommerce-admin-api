



let otp=""
export const getRandOTP =(length)=>{
    const otp = "";
    for (let i = 0; i <length; i++) {
     otp += Math.floor(Math.random() * 10);
        
    }
    // return 6 digit 
    return otp;

}