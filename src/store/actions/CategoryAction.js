export const actions = {
    GET_ALL_CATEGORIES: 'CT_GET_ALL_CATEGORIES',
    SET_ALL_CATEGORIES: 'CT_SET_ALL_CATEGORIES',
    SET_CATEGORY: 'CT_SET_CATEGORY',
};

// --- ACTIONS ---

export const setAllCategories = (data) =>
    dispatch => {
        if (data instanceof Array) {
            dispatch({type: actions.SET_ALL_CATEGORIES, payload: data.map(createCategory)});
        }
    };

export const setCategoryById = (id , data) =>
    dispatch => dispatch({type: actions.SET_CATEGORY, payload: createCategory(data), id: id});

// --- SELECTORS ---
const getCategoryState = (state) => state.category;

export const getAllCategories = (state) =>  Object.values(getCategoryState(state).categories);

// --- Helper Methods ---
const createCategory = (category) => ({
    ...category,
    id: category.id,
    name: category.name,
});
