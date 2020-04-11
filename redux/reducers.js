import { ADD_EXERCISE, DELETE_EXERCISE, EDIT_EXERCISE, COMPLETE_EXERCISE } from './actions';


export default rootReducer = (state, action) =>{
    switch(action.type){
        case ADD_EXERCISE:
            // type, payload{dayIndex, exercise}
            let aeNewDays = state.days;
            let aeModifiedExercise = {...action.payload.exercise};
            let modifiedExerciseNewId = aeNewDays[action.payload.dayIndex].exercises.length ? aeNewDays[action.payload.dayIndex].exercises[aeNewDays[action.payload.dayIndex].exercises.length-1].id+1 : 1;
            aeModifiedExercise.id = modifiedExerciseNewId;
         
            aeNewDays[action.payload.dayIndex].exercises = [...aeNewDays[action.payload.dayIndex].exercises, aeModifiedExercise];
            
            return {
                days:aeNewDays,
                ...state
            }
        case DELETE_EXERCISE:
            // type, payload{dayIndex, exerciseId}
        
            //setting local copy of state.days for easy use
            let deNewDays = [...state.days];
            //local copy of exercises of specified day
            let deTargetedExercises = [...deNewDays[action.payload.dayIndex].exercises];
            //return index num where we'll delete it at
            let deRealIndex = deTargetedExercises.findIndex( (obj) => {return (action.payload.exerciseId===obj.id)});
            if(deRealIndex==0){
                //if it's the first item, cut it off and return the rest of the array
                deTargetedExercises = [...deTargetedExercises.slice(1)];
                deNewDays[action.payload.dayIndex].exercises = deTargetedExercises;
            }
            else if(deRealIndex!=-1){
                //return concatenated array from 0 -> index we want to remove + array from after removed index to end
                deTargetedExercises = [...deTargetedExercises.slice(0, deRealIndex), ...deTargetedExercises.slice(deRealIndex + 1)];
                deNewDays[action.payload.dayIndex].exercises = deTargetedExercises;
            }
            //set the exercises to the new version
            return {
                days:deNewDays,
                ...state
            }
        case EDIT_EXERCISE: 
            //targetedExercises [payload.exerciseIndex] = payload.newExercise
            let edNewDays = state.days;
            let edTargetedExercises = [...edNewDays[action.payload.dayIndex].exercises];
            let edRealIndex = edTargetedExercises.findIndex( (obj) => {return (action.payload.exerciseId===obj.id)});

            edTargetedExercises[edRealIndex]= action.payload.newExercise;
            edNewDays[action.payload.dayIndex].exercises = edTargetedExercises;
            
            // console.log(edNewDays);
            return {
                days: edNewDays,
                ...state
            }
        case COMPLETE_EXERCISE:
            //TODO update statistics object
            console.log(action.payload.exerciseId);
            let coNewDays = state.days;
            let coTargetedExercises = [...coNewDays[action.payload.dayIndex].exercises];
            let coRealIndex = coTargetedExercises.findIndex( (obj) => {return (action.payload.exerciseId===obj.id)});
            // let newStats = state.statistics;

            coTargetedExercises[coRealIndex].complete=true;

            coNewDays[action.payload.dayIndex].exercises = coTargetedExercises;

            // console.log(cotargetedExercises[action.payload.exerciseIndex]).complete;
            return {
                days: coNewDays,
                ...state
            }
        default:
            return{...state}
    }
}