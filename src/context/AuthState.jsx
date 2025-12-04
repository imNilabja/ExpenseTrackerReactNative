import AuthContext from "./AuthContext";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthState=(props)=>{

    const [UserId, setUserId] = useState("");
    const Login=async(user)=>{
      setUserId(user);
    //   await AsyncStorage.setItem("userId",UserId);
    }


      const LogOut=async()=>{
      setUserId(null);
    //   await AsyncStorage.removeItem("userId");
    }
    return (
    <AuthContext.Provider value={{UserId,Login,LogOut}}>
         {props.children}
    </AuthContext.Provider>

    )
}

export default AuthState