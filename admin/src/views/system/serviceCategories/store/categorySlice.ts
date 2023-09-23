import { CategoryWithSubCategories, SubCategory } from '@/@types/common'
import { createSlice } from '@reduxjs/toolkit'

export interface CategoryState {
    deleteDialog: boolean
    categoryDialog: boolean
    category: Partial<CategoryWithSubCategories>
    subCategory: Partial<SubCategory>
}

export const SLICE_NAME = 'categories'

const initialState: CategoryState = {
    deleteDialog: false,
    categoryDialog: false,
    category: {},
    subCategory: {},
}

const categorySlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload
        },
        setSubCategory: (state, action) => {
            state.subCategory = action.payload
        },
        toggleDeleteDialog: (state, action) => {
            state.deleteDialog = action.payload
        },
        toggleCategoryDialog: (state, action) => {
            state.categoryDialog = action.payload
        },
        closeCategoryDialog: (state) => {
            state.categoryDialog = false
            state.category = {}
        },
    },
})

export const {
    setCategory,
    setSubCategory,
    toggleDeleteDialog,
    closeCategoryDialog,
    toggleCategoryDialog,
} = categorySlice.actions

export default categorySlice.reducer