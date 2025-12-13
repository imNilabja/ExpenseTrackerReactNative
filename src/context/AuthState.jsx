import AuthContext from "./AuthContext";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

const AuthState=(props)=>{

    const [UserId, setUserId] = useState("");
    const [Net, setNet] = useState(null);
    const Login=async(user)=>{
      setUserId(user);
    //   await AsyncStorage.setItem("userId",UserId);
    }


      const LogOut=async()=>{
      setUserId(null);
    //   await AsyncStorage.removeItem("userId");
    }

    const network=()=>{
   
       setNet(true);
    }
     const noNetwork = () => {
        
    setNet(false);
  };
    return (
    <AuthContext.Provider value={{UserId,Login,LogOut,network,Net,noNetwork}}>
         {props.children}
    </AuthContext.Provider>

    )
}

export default AuthState