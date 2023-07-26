import { useEffect } from "react"

const Step1 = ({ onNext }) => {
    useEffect(() => {
        setTimeout(() => {
            onNext();
        }, 5000)
    })
    return (
        <div className="bg-primary-500 w-full h-screen flex justify-center items-center">
            <img className="w-1/2" src="/img/logo-white.png" alt="Taskitly" />
        </div>
    )
}
export default Step1