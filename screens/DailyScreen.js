import React, {useCallback, useState} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Modal, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addExercise, deleteExercise, editExercise, completeExercise } from '../redux/actions';
import { Ionicons } from '@expo/vector-icons';
import Exercise from '../components/Exercise';
import AddModal from '../components/AddModal';
import MoreOptionsModal from '../components/MoreOptionsModal';
import {useNavigation } from '@react-navigation/native'
import { dayLookup } from '../redux/reducers';

const DailyScreen = (props) => {

    const now = new Date();
    //int 0-6, 0=Sunday
    const dayOfWeek = now.getDay(); 
    const friendlyDay = dayLookup[dayOfWeek];
    //Edit/Delete Modal 
    const [modalContext, setModalContext] = useState({});
    const [moreOptionsModalVisible, setMoreOptionsModalVisible] = useState(false);
 
    //Add Modal
    const [addModalVisible, setAddModalVisible] = useState(false);

    // let workoutDay = useSelector(state=> state.days[dayOfWeek].day); 
    let exercises = useSelector(state=> {
        console.log(state);
        console.log(state[friendlyDay])
        return state[friendlyDay]}
        );
    console.log(exercises);
    const dispatch = useDispatch();
    const add_exercise = (title, weight, reps, sets, type, distance) => { 
       if(type=="weight"){ 
           return(dispatch(addExercise(dayOfWeek, {
            title: "" + title,
            weight: Number(weight),
            type: "weight",
            reps: Number(reps),
            sets: Number(sets),
            complete: false,
        })))
        }
        else{
            return(dispatch(addExercise(dayOfWeek, {
                title: "" + title,
                type: "distance",
                distance: (Number(distance)),
                complete:false,
            })))
        }
    };
    
    const delete_exercise = (exerciseId) => {
        return (dispatch(deleteExercise(dayOfWeek, exerciseId)));
    }

    const edit_exercise = (exerciseId, newExercise)=>{
        return (dispatch(editExercise(dayOfWeek, exerciseId, newExercise)));
    }
    
    const complete_exercise = (exerciseId)=>{
        return (dispatch(completeExercise(dayOfWeek, exerciseId)));
    }

    const exerciseModalHandler = (exercise) =>{
        setModalContext(exercise);
        setMoreOptionsModalVisible(true);
    }

    const addModalAddExerciseHandler = (addedExerciseTitle, addedExerciseWeight, addedExerciseRepsCount, addedExerciseSetsCount, addedExerciseType, addedExerciseDistance) =>{
        add_exercise(addedExerciseTitle, addedExerciseWeight, addedExerciseRepsCount,
             addedExerciseSetsCount, addedExerciseType, addedExerciseDistance); 
        setAddModalVisible(false);
    }

    const closeAddModalHandler = () =>{
        setAddModalVisible(false);
    }
    const closeMoreOptionsModalHandler= ()=>{
        setMoreOptionsModalVisible(false);
    }

    const moreOptionsModalEditHandler = (context, newDetails) =>{
        if(newDetails.type=="weight"){
            edit_exercise(context.id, {
                title: newDetails.exerciseTitle,
                weight: newDetails.exerciseWeight,
                type: newDetails.type,
                reps: Number(newDetails.exerciseRepsCount),
                sets: Number(newDetails.exerciseSetsCount),
                complete: context.complete,
                id: context.id,
                }
            );
        }
        else{
            edit_exercise(context.id, {
                title: newDetails.exerciseTitle,
                type: newDetails.type,
                complete: context.complete,
                id: context.id,
                distance: newDetails.distance
                }
            );
        }
        setMoreOptionsModalVisible(false);
    }

    const moreOptionsModalDeleteHandler = (exerciseId)=>{
        delete_exercise(exerciseId);
        setMoreOptionsModalVisible(false);
    }

    return (
        <ScrollView style={styles.bodyWrapper}>
            <View style={styles.addButtonWrapper}>
                <Button style={styles.addButton} onPress={()=>{setAddModalVisible(true)}} title="+ Add Exercise" />
            </View> 

            {exercises.map((exercise)=>{
                return(
                    <React.Fragment key={exercise.id} >
                        <Exercise
                            exercise={exercise}
                            modalHandler={exerciseModalHandler}
                            completeHandler={complete_exercise}
                        >
                        </Exercise>
                    </React.Fragment>
                )
            
            })}

         
            
            <MoreOptionsModal
                moreOptionsModalVisible={moreOptionsModalVisible}
                editExerciseHandler={moreOptionsModalEditHandler}
                deleteExerciseHandler={moreOptionsModalDeleteHandler}
                exercise={modalContext}
                closeMoreOptionsModalHandler={closeMoreOptionsModalHandler}
            />

           <AddModal 
                addModalVisible={addModalVisible}
                addExerciseHandler={addModalAddExerciseHandler}
                closeAddModalHandler={closeAddModalHandler}
           />
        </ScrollView> 
    )
}

export default DailyScreen

const styles = StyleSheet.create({
    bodyWrapper:{
        backgroundColor: "#FAF9FE",
        flex:1,
        paddingHorizontal: 40,
    },
    deleteButton:{
        marginBottom:20,
        marginTop:20,
    },
    addButtonWrapper:{
        paddingHorizontal: 10,
        paddingTop: 10,
        marginBottom: 25,
    },
    addButton:{
        borderRadius: 25,
        paddingVertical: 20,
    },
    modalWrapper:{
        paddingHorizontal:10,
        paddingVertical: 20,
    }
   
});