import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addExercise } from '../redux/actions'
import CondensedExercise from './CondensedExercise';
import AddModal from './AddModal'

const CollapsibleDay = (props) => {
    const friendlyDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayNum = props.day;
    const dayName = friendlyDays[dayNum];

    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    //array[object]
    const exercises = useSelector( state => state.days[dayNum].exercises);

    const closeAddModalHandler = () =>{
        setAddModalVisible(false);
    }

    const openAddModal = () =>{
        setAddModalVisible(true);     
    }

    const add_exercise = (title, weight, reps, sets) => { 
        return(dispatch(addExercise(dayNum, {
            title: "" + title,
            weight: Number(weight),
            type: "weight",
            reps: Number(reps),
            sets: Number(sets),
            complete: false,
        })))
    };

    const addModalAddExerciseHandler = (addedExerciseTitle, addedExerciseWeight, addedExerciseRepsCount, addedExerciseSetsCount) =>{
        add_exercise(addedExerciseTitle, addedExerciseWeight, addedExerciseRepsCount, addedExerciseSetsCount); 
        setAddModalVisible(false);
    } 

    const expandDayHandler = () =>{
        setIsExpanded(true);
    }

    const collapseDayHandler = ()=>{
        setIsExpanded(false);
    }

 
    return (
        <View style={styles.DayWrapper}
        >
            <TouchableHighlight
                onPress={ isExpanded ? collapseDayHandler : expandDayHandler}
                activeOpacity={1}
                underlayColor="#ffffff"
            >
                <View style={styles.DayHeader}>
                    <View style={styles.DayHeaderLeft}>
                        <Text style={styles.DayName}>{dayName}</Text>
                        <Text style={styles.ExerciseCount}>{exercises.length} exercises</Text>
                    </View>
                    <View
                        style={styles.DayHeaderRight}
                    >
                        <Ionicons
                            backgroundColor="#ffffff" 
                            color="#000000" 
                            name={ isExpanded ? "ios-arrow-back" : "ios-arrow-down"} 
                            size={30}
                           
                        ></Ionicons>
                    </View>
                </View>
            </TouchableHighlight>
            { isExpanded && <View styles={isExpanded ? [styles.ListWrapper, styles.ListWrapperVisible]: [styles.ListWrapper]}>
                {exercises.map((exercise, index)=>{
                    
                    return (
                        <CondensedExercise 
                            exercise={exercise}
                            key={exercise.id}
                            isLast={index==exercises.length-1}
                            dayNum={dayNum}
                        />
                    )
                    })
                }
                    <View
                        style={styles.Footer}
                    >
                        <View
                            style={styles.AddButtonWrapper}
                        >
                            <Button
                                title="Add Item +"
                                onPress={openAddModal}
                                color="#1fa30a"
                            /> 
                        </View>
                    </View>
                </View>  
            }
           
            <AddModal
                addModalVisible={addModalVisible}
                closeAddModalHandler={closeAddModalHandler}
                addExerciseHandler={addModalAddExerciseHandler}
            />
        </View>
    )
}

export default CollapsibleDay

const styles = StyleSheet.create({
    DayWrapper:{
        padding: 15,
        backgroundColor:"#ffffff",
        marginVertical: 10,
        marginHorizontal: 10,
        elevation: 5,
        borderRadius: 15,
    },
    DayHeader:{
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: 'center',

    },
    DayHeaderLeft:{
        flexDirection:"row",
        alignItems: "baseline",
    },
    DayHeaderRight:{
        flexDirection:"row",
    },
    ExerciseCount:{
        color: "#99879D",
        marginLeft:20,
        fontSize: 16,
    },
    ListWrapper:{
        display:"none",
       
    },
    ListWrapperVisible:{
        display:"flex",
    },
    DayName:{
        fontSize: 20,
        minWidth: 100,
    },
    Footer:{
        flexDirection: "column",
        alignItems: "flex-end",
        paddingTop: 15,

    },
    AddButtonWrapper:{
        width: "40%",
        borderRadius: 15,
        paddingHorizontal:10,
    },

})
