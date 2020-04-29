export const ADD_EXERCISE = "ADD_EXERCISE";
export const DELETE_EXERCISE = "DELETE_EXERCISE";
export const EDIT_EXERCISE = "EDIT_EXERCISE";
export const COMPLETE_EXERCISE = "COMPLETE_EXERCISE";
export const CREATE_ROUTINE ="CREATE_ROUTINE";
export const ADD_ROUTINE_EXERCISE = "ADD_ROUTINE_EXERCISE";
export const DELETE_ROUTINE_EXERCISE = "DELETE_ROUTINE_EXERCISE";
export const EDIT_ROUTINE_EXERCISE = "EDIT_ROUTINE_EXERCISE";
export const EDIT_ROUTINE_NAME = "EDIT_ROUTINE_NAME";
export const ADD_ROUTINE_TO_DAY = "ADD_ROUTINE_TO_DAY";
export const REMOVE_ROUTINE_FROM_DAY = "REMOVE_ROUTINE_FROM_DAY";
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


export const createRoutine = (friendlyName) => {
    return {
        type: CREATE_ROUTINE,
        payload:{
            friendlyName,
        }
    }
}

export const addRoutineExercise = (routineId, exercise) =>{
    return {
        type: ADD_ROUTINE_EXERCISE,
        payload:{
            routineId,
            exercise
        }
    }
}
export const editRoutineName = (routineId, title) => {
    return {
        type: EDIT_ROUTINE_NAME,
        payload:{
            routineId,
            title
        }
    }
}

export const deleteRoutineExercise = (routineId, exerciseId) =>{
    return {
        type: DELETE_ROUTINE_EXERCISE,
        payload: {
            routineId,
            exerciseId
        }
    }
};

export const editRoutineExercise = (routineId, exerciseId, newExercise)=>{
    return{
        type: EDIT_ROUTINE_EXERCISE,
        payload: {
            routineId,
            exerciseId,
            newExercise,
        }
    }
};

export const addRoutineToDay = (dayIndex,routineId) =>{
    return{
        type: ADD_ROUTINE_TO_DAY,
        payload:{
            routineId,
            dayIndex
        }
    }
}

export const removeRoutineFromDayReducer = (dayIndex,routineId) =>{
    return{
        type:REMOVE_ROUTINE_FROM_DAY,
        payload: {
            routineId,
            dayIndex
        }
    }
}