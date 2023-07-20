import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { initialState, setUser } from '../../store/auth/userSlice'
import { apiSignIn, apiSignOut, apiSignUp } from '../../services/AuthService'
import { onSignInSuccess, onSignOutSuccess } from '../../store/auth/sessionSlice'
import appConfig from '../../configs/app.config'

function useAuth() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const signIn = async (values) => {
        try {
			const resp = await apiSignIn(values)
			if (resp.data) {
				const { token } = resp.data
				dispatch(onSignInSuccess(token))
				if(resp.data.user) {
					dispatch(setUser({
						profile: resp.data.user,
						userType: resp.data.user.profile_type.name,
						hasVisited: true,
						hasService: resp.data.user.service ? true : false,
						verifiedPhone: resp.data.user.phone_verified_at !== null ? true : false,
						userSet: true,
					} || initialState))
				}
				
                return {
                    status: 'success',
                    message: ''
                }
			}
		} catch (errors) {
			return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString()
            }
		}
    }

	const signUp = async (values) => {
        try {
			const resp = await apiSignUp(values)
			if (resp.data) {
				const { token } = resp.data
				dispatch(onSignInSuccess(token))
				if(resp.data.user) {
					dispatch(setUser({
						profile: resp.data.user,
						userType: resp.data.user.profile_type.name,
						hasVisited: true,
						hasService: resp.data.user.service ? true : false,
						verifiedPhone: resp.data.user.phone_verified_at !== null ? true : false,
						userSet: true,
					} || initialState))
				}

                return {
                    status: 'success',
                    message: ''
                }
			}
		} catch (errors) {
			return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString()
            }
		}
    }

    const handleSignOut = ()  => {
		dispatch(onSignOutSuccess())
		dispatch(setUser(initialState))
		navigate(appConfig.unAuthenticatedEntryPath)
	}

    const signOut = async () => {
		await apiSignOut()
		handleSignOut()
	}
    
    return {
        authenticated: token && signedIn,
        signIn,
		signUp,
        signOut,
		handleSignOut
    }
}

export default useAuth