export const ADD_EXERCISE = "ADD_EXERCISE";
export const DELETE_EXERCISE = "DELETE_EXERCISE";

//dayIndex, exercise
export const addExercise = (dayIndex, exercise) =>{
    return {
        type: ADD_EXERCISE,
        payload: {
            dayIndex: dayIndex,
            exercise: exercise
        }
    }
}

export const deleteExercise = (dayIndex, exerciseIndex) =>{
    return {
        type: DELETE_EXERCISE,
        payload: {
            dayIndex: dayIndex,
            exerciseIndex: exerciseIndex
        }
    }
}

