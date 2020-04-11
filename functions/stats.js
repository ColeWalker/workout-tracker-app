
//return Number
export const calculateLevelUpXp = (level) =>{
    return (level * 2500);
}

//return boolean
export const hasLeveledUp = (level, currentXp) => {
    return (currentXp >= calculateLevelUpXp(level))
}

//return object
export const levelUp = (level, currentXp) =>{
    let newLevel = level + 1;
    let leftoverXp = currentXp - calculateLevelUpXp(level);
    if(leftoverXp < 0){
        newLevel = level;
        leftoverXp = currentXp;
    }
    return {
        newLevel,
        leftoverXp,
    }
}

export const calculateEarnedXp = (exercise)=>{
    let earnedXp = 0;
    if(exercise.type == 'weight'){
        earnedXp = exercise.reps * exercise.sets * 100;
        earnedXp = exercise.weight ? earnedXp*2 : earnedXp * exercise.weight;
    }
    else{
        earnedXp = exercise.distance * 1000;
    }
    return earnedXp;
}

export const handleCountingStats = (exercise, currentStats)=>{
    //repsCompleted, setsCompleted, exercisesCompleted
    let newStats = {...currentStats};
    if(exercise.type =='weight'){
        newStats.weightLifted += exercise.weight * exercise.sets * exercise.reps;
        newStats.repsCompleted += exercise.reps;
        newStats.setsCompleted+= exercise.sets;
    }
    newStats.exercisesCompleted++;

    return newStats;
}