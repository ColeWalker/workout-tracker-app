import { handleCountingStats,calculateEarnedXp, hasLeveledUp, levelUp } from '../../functions/stats'; 
import { dayLookup, routineExerciseLookup } from '../../functions/utilities.js'

export const addExerciseReducer = (state, action) => {
    // type, payload{dayIndex, exercise}
    let stringDay = dayLookup[action.payload.dayIndex];
    let currentDay = [...state[stringDay]];
    let modifiedExercise = {...action.payload.exercise};
    let exerciseId = currentDay.length ? currentDay[currentDay.length-1].id+1 : 1;
    modifiedExercise.id = exerciseId;

    currentDay = [...currentDay, modifiedExercise];
    let returnState ={...state};
    returnState[stringDay] = currentDay;
    
    return returnState;
}

export const deleteExerciseReducer = (state, action) => {
     // type, payload{dayIndex, exerciseId}
     let stringDay = dayLookup[action.payload.dayIndex];
     let returnState ={...state};
     //setting local copy of state.days for easy use

     //local copy of exercises of specified day
     let targetedExercises = [...state[stringDay]];
     //return index num where we'll delete it at
     let exerciseIndex = targetedExercises.findIndex( (obj) => {return (action.payload.exerciseId===obj.id)});
     if(exerciseIndex==0){
         //if it's the first item, cut it off and return the rest of the array
         targetedExercises = [...targetedExercises.slice(1)];
         returnState[stringDay]= targetedExercises;
     }
     else if(exerciseIndex!=-1){
         //return concatenated array from 0 -> index we want to remove + array from after removed index to end
         targetedExercises = [...targetedExercises.slice(0, exerciseIndex), ...targetedExercises.slice(exerciseIndex + 1)];
         returnState[stringDay] = targetedExercises;
     }
     //set the exercises to the new version
     return returnState
}

export const editExerciseReducer = (state,action) =>{
    //targetedExercises [payload.exerciseIndex] = payload.newExercise
    let stringDay = dayLookup[action.payload.dayIndex];
    let returnState ={...state};

    let targetedExercises = [...state[stringDay]];
    let exerciseIndex = targetedExercises.findIndex( (obj) => {return (action.payload.exerciseId===obj.id)});

    targetedExercises[exerciseIndex]= action.payload.newExercise;
    returnState[stringDay] = targetedExercises;
    return returnState
}

export const completeExerciseReducer = (state,action)=>{
    let stringDay = dayLookup[action.payload.dayIndex];
    let returnState = {...state};
    let targetedExercises = [...state[stringDay]];
    let exerciseIndex = targetedExercises.findIndex( (obj) => {return (action.payload.exerciseId===obj.id)});
    let newStats = state.stats;
    let totalXp = state.stats.xp;
    let coExercise = targetedExercises[exerciseIndex];
    targetedExercises[exerciseIndex].complete=true;
    
    returnState[stringDay] = targetedExercises;

    //newStats is going to update all of the counting stats
    newStats = handleCountingStats(coExercise,newStats);

    //newStats is going to add xp from completed exercise
    let earnedXp = calculateEarnedXp(coExercise);
    totalXp += earnedXp;
    newStats.xp = totalXp;

    
    
    while(hasLeveledUp(newStats.level, newStats.xp)){
        let levelUpInfo = levelUp(newStats.level, newStats.xp);
        newStats.level = levelUpInfo.newLevel;
        newStats.xp = levelUpInfo.leftoverXp;
    }

    returnState["stats"]=newStats;
    return returnState;
}

export const addRoutineToDayReducer = (state, action)=>{
    let stringDay = dayLookup[action.payload.dayIndex];
    let routineExercisesString = routineExerciseLookup(action.payload.routineId)
    let returnState = {...state};
    let dayExercises = [...state[stringDay]]
    let routineExercises = [...state[routineExercisesString]]
    dayExercises= [...dayExercises, ...routineExercises];
    returnState[stringDay]=dayExercises;
    
    return returnState;
}

export const removeRoutineFromDayReducer = (state, action)=>{
    
}

