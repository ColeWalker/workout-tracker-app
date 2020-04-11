import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

var defaultBgColor = "#ffffff";
var completeBgColor = "#f4fcf3";


const Exercise = (props) => {
    let exercise = props.exercise;
    let modalHandler = props.modalHandler;
    let completeHandler = props.completeHandler;
 



    const modalHandlerCaller = () =>
    {
        modalHandler(exercise);
    }

    const completeHandlerCaller = () =>{
        completeHandler(exercise.id);
    }

    return (
        <View style={exercise.complete ? [styles.exerciseWrapper,styles.exerciseWrapperComplete] : [styles.exerciseWrapper]}>
            <View style={styles.exerciseDetailsOuterWrapper}>
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                <View style={styles.exerciseDetailsWrapper}>
                    <Text style={styles.weight}>{exercise.weight}lbs</Text>
                    <Text style={styles.repsAndSets}>{exercise.sets} sets of {exercise.reps} reps</Text>
                </View>
            </View>
            <View style={styles.exerciseRight}>
                <Ionicons.Button 
                    backgroundColor={exercise.complete? completeBgColor : defaultBgColor } 
                    color="#000000" 
                    name="ios-more" 
                    size={25}
                    onPress={modalHandlerCaller}
                >
                </Ionicons.Button>
                <Ionicons.Button 
                    backgroundColor={exercise.complete? completeBgColor : defaultBgColor} 
                    color="#27F106" 
                    name="md-checkmark-circle"
                    exerciseId={exercise.id}
                    size={25}
                    onPress={completeHandlerCaller}
                >
                
                </Ionicons.Button>
            </View>
           
        </View>
    )
}

export default Exercise


const styles = StyleSheet.create({
    bodyWrapper:{
        backgroundColor: "#FAF9FE",
        flex:1,

    },
    exerciseWrapper: {
        backgroundColor: defaultBgColor,
        borderRadius: 12,
        paddingHorizontal:10,
        paddingVertical:20,
        marginHorizontal:10,
        elevation: 5,
        marginBottom: 15,
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"flex-start",
    },
    exerciseWrapperComplete: {
        backgroundColor: completeBgColor,
    },
    exerciseTitle:{
        fontSize: 22,
        fontWeight: 'bold',
    },  
    exerciseDetailsOuterWrapper:{
        
    },
    exerciseRight:{
        justifyContent:"space-between",
        
    },
    exerciseDetailsWrapper:{
        flexDirection: 'row',
        alignItems:'baseline',
    },
    weight:{
        fontSize:18,
    },
    repsAndSets:{
        fontSize:16,
        color:"#99879D",
        marginLeft: 15,
    },
    deleteButton:{
        marginBottom:20,
        marginTop:20,
    },
    addButton:{

    },
    modalWrapper:{
        paddingHorizontal:10,
        paddingVertical: 20,
    }
   
});
