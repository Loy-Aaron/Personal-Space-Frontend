import { LogOut } from "lucide-react"
import api from "../config/axios.js"
import useLoadingStore from '../store/loadingStore.js'
import useAlertStore from "../store/alertStore.js"
import useUserStore from "../store/userStore.js"

const Profile = () => {
    const { setIsLoading } = useLoadingStore()
    const { setAlert } = useAlertStore()
    const { setUser } = useUserStore()

    const handleLogout = async () => {
        try {
            setIsLoading(true)

            await api.post('/auth/logout')

            setUser(null)
            setAlert('Logout Successful', 'success')
        } catch (error) {
            setAlert('Logout Failed', 'error')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div>
            <LogOut
                className="w-5 h-5"
                onClick={handleLogout} 
            />
        </div>
    )
}

export default Profile