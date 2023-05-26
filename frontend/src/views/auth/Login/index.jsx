import { Container } from "../../../components/shared"
import SignInForm from "./components/SignInForm"

const Login = () => {
    return (
        <Container className="max-w-sm h-screen">
            <div className="h-full flex flex-col justify-center">
                <div className="w-full flex justify-center">
                    <img className="w-80" src="/img/signin.png" alt="" />
                </div>

                <div className="">
                    <h1 className="font-bold text-lg text-center">Login to continue to Taskitly</h1>
                </div>

                <div className="mt-4">
                    <SignInForm />
                </div>
            </div>
        </Container>
    )
}
export default Login