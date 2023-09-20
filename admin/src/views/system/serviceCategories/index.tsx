import StatCards from '@/views/home/components/feed/StatCards'
import { useGetCategories } from '../utils/hooks'
import CategoryCard from './components/CategoryCard'
import GettingCategories from './components/GettingCategories'
import EditDialog from './components/EditDialog'
import reducer, { SLICE_NAME } from './store'
import { injectReducer } from '@/store'

injectReducer(SLICE_NAME, reducer)

const ServiceCategories = () => {
    const { data, isLoading } = useGetCategories()
    const categories = data?.categories

    return (
        <div>
            <StatCards />
            <h4 className="text-base mb-4 mt-4">Service Categories</h4>
            <div className='grid gap-4 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2'>
                {isLoading ? (
                    <GettingCategories />
                ):(
                    <CategoryCard 
                        categories={categories ?? []}
                    />
                )}
            </div>
            <EditDialog />
        </div>
    )
}
export default ServiceCategories