import { useContext } from "react"
import { IAuthContextType } from "../interfaces/IAuthContextType"
import { AuthContext } from "../contexts/AuthContext"


const useAuth = () => useContext(AuthContext) as IAuthContextType

export default useAuth