import { CategoryWithSubCategories, SubCategory } from '@/@types/common'
import { createSlice } from '@reduxjs/toolkit'

export interface CategoryState {
    deleteDialog: boolean
    editCategory: boolean
    newSubCategory: boolean
    categoryDialog: boolean
    editSubCategory: number
    image: Partial<Blob>
    category: Partial<CategoryWithSubCategories>
    subCategory: Partial<SubCategory>
}

export const SLICE_NAME = 'categories'

const initialState: CategoryState = {
    deleteDialog: false,
    editCategory: false,
    editSubCategory: 0,
    newSubCategory: false,
    categoryDialog: false,
    image: {},
    category: {},
    subCategory: {},
}

const categorySlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setImage: (state, action) => {
            state.image = action.payload
        },
        setCategory: (state, action) => {
            state.category = action.payload
        },
        setSubCategory: (state, action) => {
            state.subCategory = action.payload
        },
        setEditCategory: (state, action) => {
            state.editCategory = action.payload
        },
        setNewSubCategory: (state, action) => {
            state.newSubCategory = action.payload
        },
        setEditSubCategory: (state, action) => {
            state.editSubCategory = action.payload
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
    setEditSubCategory,
    setNewSubCategory,
    setImage,
    setCategory,
    setSubCategory,
    setEditCategory,
    toggleDeleteDialog,
    closeCategoryDialog,
    toggleCategoryDialog,
} = categorySlice.actions

export default categorySlice.reducer