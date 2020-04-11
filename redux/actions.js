export const ADD_EXERCISE = "ADD_EXERCISE";
export const DELETE_EXERCISE = "DELETE_EXERCISE";
export const EDIT_EXERCISE = "EDIT_EXERCISE";
export const COMPLETE_EXERCISE = "COMPLETE_EXERCISE";
//dayIndex, exercise
export const addExercise = (dayIndex, exercise) =>{
    return {
        type: ADD_EXERCISE,
        payload: {
            dayIndex,
            exercise
        }
    }
}

export const deleteExercise = (dayIndex, exerciseId) =>{
    return {
        type: DELETE_EXERCISE,
        payload: {
            dayIndex,
            exerciseId
        }
    }
}

export const editExercise = (dayIndex, exerciseId, newExercise)=>{
    return{
        type: EDIT_EXERCISE,
        payload: {
            dayIndex,
            exerciseId,
            newExercise,
        }
    }
};

export const completeExercise = (dayIndex, exerciseId) =>{
    return{
        type: COMPLETE_EXERCISE,
        payload: {
            dayIndex,
            exerciseId,
        }
    }
};
