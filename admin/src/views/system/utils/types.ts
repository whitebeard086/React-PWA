import { CategoryWithSubCategories } from '@/@types/common'

export type GetCategoriesResponse = {
    status: string
    categories: CategoryWithSubCategories[]
}