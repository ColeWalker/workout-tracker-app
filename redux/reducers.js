import { ADD_ROUTINE_TO_DAY, REMOVE_ROUTINE_FROM_DAY, 
    EDIT_ROUTINE_NAME,ADD_EXERCISE,EDIT_ROUTINE_EXERCISE, 
    DELETE_ROUTINE_EXERCISE, DELETE_EXERCISE, EDIT_EXERCISE,
     COMPLETE_EXERCISE,ADD_ROUTINE_EXERCISE, CREATE_ROUTINE } from './actions';

import { createRoutineReducer, addRoutineExerciseReducer, editRoutineExerciseReducer, deleteRoutineExerciseReducer, editRoutineNameReducer} from './reducers/routineReducers'
import { addExerciseReducer, deleteExerciseReducer,
    addRoutineToDayReducer,
    completeExerciseReducer, editExerciseReducer } from './reducers/dayReducers'



const initialState = {
    sundayExercises:[],
    mondayExercises:[],
    tuesdayExercises:[],
    wednesdayExercises:[],
    thursdayExercises:[],
    fridayExercises:[],
    saturdayExercises:[],
    routines:[],

    stats: {
        level: 1,
        xp: 0,
        weightLifted: 0,
        distance: 0,
        repsCompleted: 0,
        setsCompleted: 0,
        exercisesCompleted: 0,
    },
    settings:{
        weightUnit: 'lbs',
        distanceUnit: 'miles',
        
    }
};



export default rootReducer = (state = {...initialState}, action) =>{
    switch(action.type){
        case ADD_EXERCISE:
            return addExerciseReducer(state, action);
        case DELETE_EXERCISE:
            return deleteExerciseReducer(state,action);
        case EDIT_EXERCISE: 
            return editExerciseReducer(state,action);
        case COMPLETE_EXERCISE:
          return completeExerciseReducer(state,action);
        case CREATE_ROUTINE:
           return createRoutineReducer(state,action);
        case EDIT_ROUTINE_NAME:
            return editRoutineNameReducer(state,action);
        case ADD_ROUTINE_EXERCISE:
            return addRoutineExerciseReducer(state,action);
        case DELETE_ROUTINE_EXERCISE:
            return deleteRoutineExerciseReducer(state,action);   
        case EDIT_ROUTINE_EXERCISE: 
           return editRoutineExerciseReducer(state,action);
        case ADD_ROUTINE_TO_DAY:
            return addRoutineToDayReducer(state,action);
        case REMOVE_ROUTINE_FROM_DAY:
            break;
        default:
            return{...state}
    }
}