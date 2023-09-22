import { persistor } from '@/store'
import { Outlet } from 'react-router-dom'
import { PersistGate } from 'redux-persist/lib/integration/react'

const Persistgate = () => {
  return (
    <PersistGate loading={null} persistor={persistor}>
        <Outlet />
    </PersistGate>
  )
}
export default Persistgate