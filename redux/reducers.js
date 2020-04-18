import { ADD_EXERCISE, DELETE_EXERCISE, EDIT_EXERCISE, COMPLETE_EXERCISE } from './actions';
import { handleCountingStats,calculateEarnedXp, hasLeveledUp, levelUp } from '../functions/stats'


export const dayLookup = ['sundayExercises',
    'mondayExercises',
    'tuesdayExercises',
    "wednesdayExercises",
    "thursdayExercises",
    "fridayExercises",
    "saturdayExercises"]

const initialState = {
    sundayExercises:[],
    mondayExercises:[],
    tuesdayExercises:[],
    wednesdayExercises:[],
    thursdayExercises:[],
    fridayExercises:[],
    saturdayExercises:[],
    stats: {
        level: 1,
        xp: 0,
        weightLifted: 0,
        distance: 0,
        repsCompleted: 0,
        setsCompleted: 0,
        exercisesCompleted: 0,
    }
};

export default rootReducer = (state = {...initialState}, action) =>{
    switch(action.type){
        case ADD_EXERCISE:
            // type, payload{dayIndex, exercise}
            let aeStringDay = dayLookup[action.payload.dayIndex];
            let aeCurrDay = [...state[aeStringDay]];
            let aeModifiedExercise = {...action.payload.exercise};
            let modifiedExerciseNewId = aeCurrDay.length ? aeCurrDay[aeCurrDay.length-1].id+1 : 1;
            aeModifiedExercise.id = modifiedExerciseNewId;

            aeCurrDay = [...aeCurrDay, aeModifiedExercise];
            let aeReturnState ={...state};
            aeReturnState[aeStringDay] = aeCurrDay;
            
            return aeReturnState;
        case DELETE_EXERCISE:
            // type, payload{dayIndex, exerciseId}
            let deStringDay = dayLookup[action.payload.dayIndex];
            let deReturnState ={...state};
            //setting local copy of state.days for easy use

            //local copy of exercises of specified day
            let deTargetedExercises = [...state[deStringDay]];
            //return index num where we'll delete it at
            let deExerciseIndex = deTargetedExercises.findIndex( (obj) => {return (action.payload.exerciseId===obj.id)});
            if(deExerciseIndex==0){
                //if it's the first item, cut it off and return the rest of the array
                deTargetedExercises = [...deTargetedExercises.slice(1)];
                deReturnState[deStringDay]= deTargetedExercises;
            }
            else if(deExerciseIndex!=-1){
                //return concatenated array from 0 -> index we want to remove + array from after removed index to end
                deTargetedExercises = [...deTargetedExercises.slice(0, deExerciseIndex), ...deTargetedExercises.slice(deExerciseIndex + 1)];
                deReturnState[deStringDay] = deTargetedExercises;
            }
            //set the exercises to the new version
            return deReturnState;
            
        case EDIT_EXERCISE: 
            //targetedExercises [payload.exerciseIndex] = payload.newExercise
            let edStringDay = dayLookup[action.payload.dayIndex];
            let edReturnState ={...state};

            let edTargetedExercises = [...state[edStringDay]];
            let edExerciseIndex = edTargetedExercises.findIndex( (obj) => {return (action.payload.exerciseId===obj.id)});

            edTargetedExercises[edExerciseIndex]= action.payload.newExercise;
            edReturnState[edStringDay] = edTargetedExercises;
            
            return edReturnState;
        case COMPLETE_EXERCISE:
            let coStringDay = dayLookup[action.payload.dayIndex];
            let coReturnState = {...state};
            let coTargetedExercises = [...state[coStringDay]];
            let coExerciseIndex = coTargetedExercises.findIndex( (obj) => {return (action.payload.exerciseId===obj.id)});
            let newStats = state.stats;
            let totalXp = state.stats.xp;
            let coExercise = coTargetedExercises[coExerciseIndex];
            coTargetedExercises[coExerciseIndex].complete=true;
            
            coReturnState[coStringDay] = coTargetedExercises;

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

            coReturnState["stats"]=newStats;
            return coReturnState;
        default:
            return{...state}
    }
}