import {routineExerciseLookup} from '../../functions/utilities'

export const createRoutineReducer = (state, action) => {
    let returnState = {...state};
    let routines = [...state.routines];
    let id = routines.length ? routines[routines.length -1].id + 1 : 1;
    let routineExercisesName= routineExerciseLookup(id);
    routines = [...routines, {
        friendlyName: action.payload.friendlyName, 
        id: id}];
    returnState["routines"] = routines;
    returnState[routineExercisesName]=[];
   return returnState;
}

export const editRoutineNameReducer = (state,action) =>{
    //action - type, payload{routineId, title}
    let returnState = {...state};
    const id = action.payload.routineId;
    let modifiedRoutines= [...state['routines']];
    let routineIndex = modifiedRoutines.findIndex( (obj) => {return (id===obj.id)});
    modifiedRoutines[routineIndex]['friendlyName'] = action.payload.title;
   
    returnState['routines']=modifiedRoutines;
    return returnState;
}

export const addRoutineExerciseReducer = (state,action) =>{
    // type, payload{dayIndex, exercise}
    let returnState ={...state};
    const id = action.payload.routineId;
    let exerciseLookup = routineExerciseLookup(id);
    let exercises= [...state[exerciseLookup]];
    let modifiedExercise = {...action.payload.exercise};
    let modifiedExerciseNewId = exercises.length ? exercises[exercises.length-1].id+1 : 999;
    modifiedExercise.id = modifiedExerciseNewId;
    modifiedExercise.routine = id;

    exercises = [...exercises, modifiedExercise];
    returnState[exerciseLookup] = exercises;
    return returnState;
}   

export const deleteRoutineExerciseReducer = (state, action)=>{
    // type, payload{dayIndex, exerciseId}
    const id = action.payload.routineId;
    let exerciseLookup = routineExerciseLookup(id);
    let returnState ={...state};
    //setting local copy of state.days for easy use

    //local copy of exercises of specified day
    let exercises = [...state[exerciseLookup]];
    //return index num where we'll delete it at
    let exerciseIndex = exercises.findIndex( (obj) => {return (action.payload.exerciseId===obj.id)});
    if(exerciseIndex==0){
        //if it's the first item, cut it off and return the rest of the array
        exercises = [...exercises.slice(1)];
        returnState[exerciseLookup]= exercises;
    }
    else if(exerciseIndex!=-1){
        //return concatenated array from 0 -> index we want to remove + array from after removed index to end
        exercises = [...exercises.slice(0, exerciseIndex), ...exercises.slice(exerciseIndex + 1)];
        returnState[exerciseLookup] = exercises;
    }
    //set the exercises to the new version
    return returnState;
}

export const editRoutineExerciseReducer = (state, action) =>{
     //targetedExercises [payload.exerciseIndex] = payload.newExercise
     const id = action.payload.routineId;
     let exerciseLookup = routineExerciseLookup(id);
     let returnState ={...state};

     let exercises = [...state[exerciseLookup]];
     let exerciseIndex = exercises.findIndex( (obj) => {return (action.payload.exerciseId===obj.id)});

     exercises[exerciseIndex]= action.payload.newExercise;
     returnState[exerciseLookup] = exercises;
     
     return returnState;
}
