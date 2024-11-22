let count =0;

export default function LoginErrorCounter(bool=false){
    if(bool === true){
        count++;
    }
    if (count >3){
        return res.status(400).json({
            "error":"No user found !! Please create a new account ."
        })
    }
     
}
