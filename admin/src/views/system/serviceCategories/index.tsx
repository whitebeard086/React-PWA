import StatCards from '@/views/home/components/feed/StatCards'
import { useGetCategories } from '../utils/hooks'
import CategoryCard from './components/CategoryCard'
import GettingCategories from './components/GettingCategories'
import reducer, { SLICE_NAME } from './store'
import { injectReducer } from '@/store'
import Header from './components/Header'
import NewDialog from './components/NewDialog'

injectReducer(SLICE_NAME, reducer)

const ServiceCategories = () => {
    const { data, isLoading } = useGetCategories()
    const categories = data?.categories

    return (
        <div>
            <StatCards />
            <Header />
            <div className='grid gap-4 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2'>
                {isLoading ? (
                    <GettingCategories />
                ):(
                    <CategoryCard 
                        categories={categories ?? []}
                    />
                )}
            </div>
            <NewDialog />
        </div>
    )
}
export default ServiceCategories