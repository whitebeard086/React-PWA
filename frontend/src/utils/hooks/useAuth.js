import { useSelector, useDispatch } from 'react-redux'
import { REDIRECT_URL_KEY, SIGNUP_REDIRECT_URL_KEY } from '../../constants/app.constant'
import { useNavigate } from 'react-router-dom'
import { initialState, setUser } from '../../store/auth/userSlice'
import useQuery from './useQuery'
import { apiSignIn, apiSignOut, apiSignUp } from '../../services/AuthService'
import { onSignInSuccess, onSignOutSuccess } from '../../store/auth/sessionSlice'
import appConfig from '../../configs/app.config'

function useAuth() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

	const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)
	const { userType } = useSelector((state) => state.auth.user)

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
					} || { 
						profile: {},
						userType: "",
						hasVisited: true,
					}))
				}
				// const redirectUrl = query.get(REDIRECT_URL_KEY)
				let redirectUrl

				if (userType === "Normal User") {
					redirectUrl = query.get(REDIRECT_URL_KEY)
				} else if (userType === "Service Provider") {
					redirectUrl = '/service-setup'
				}

				navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
				
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
					} || { 
						profile: {},
						userType: "",
						hasVisited: true,
					}))
				}

				let redirectUrl;

				if (userType === "Normal User") {
					redirectUrl = query.get(REDIRECT_URL_KEY)
				} else if (userType === "Service Provider") {
					redirectUrl = '/service-setup'
				}
				
				navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
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
        signOut
    }
}

export default useAuth