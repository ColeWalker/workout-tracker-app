import { ADD_EXERCISE, DELETE_EXERCISE } from './actions';


export default rootReducer = (state, action) =>{
   
    switch(action.type){
        case ADD_EXERCISE:
            // type, payload{dayIndex, exercise}
            let aeNewDays = state.days;
            aeNewDays[action.payload.dayIndex].exercises = [...aeNewDays[action.payload.dayIndex].exercises, action.payload.exercise];
            return {
                days:aeNewDays,
                ...state
            }
        case DELETE_EXERCISE:
            // type, payload{dayIndex, exerciseIndex}
            let deNewDays = state.days;
            let deTargetedExercises = [...deNewDays[action.payload.dayIndex].exercises];
            deTargetedExercises = [...deTargetedExercises.slice(0, action.payload.exerciseIndex), ...deTargetedExercises.slice(action.payload.exerciseIndex + 1)];
            
            deNewDays[action.payload.dayIndex].exercises = deTargetedExercises;
            return {
                days:deNewDays,
                ...state
            }
        default:
            return{...state}
    }
}