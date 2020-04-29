import React,{useState} from 'react'
import { ScrollView, StyleSheet, Button, Text, View } from 'react-native'
import {useDispatch, useSelector} from 'react-redux';
import AddModal from '../components/AddModal';
import {global} from "../styles/global";
import { addRoutineExercise, editRoutineExercise, deleteRoutineExercise, addRoutineToDay } from '../redux/actions';
import Exercise from '../components/Exercise';
import MoreOptionsModal from '../components/MoreOptionsModal';

const RoutineDetailsScreen = ({route, navigation}) => {
    const {id} = route.params;
    const {friendlyName} = route.params;




    const [addModalVisible, setAddModalVisible] = useState(false);
    const [modalContext, setModalContext] = useState({});
    const [moreOptionsModalVisible, setMoreOptionsModalVisible] = useState(false);

    const dispatch = useDispatch();
    
    const closeAddModalHandler = () =>{
        setAddModalVisible(false);
    }
    const openAddModalHandler = () =>{
        setAddModalVisible(true);
    }
    
    const closeMoreOptionsModalHandler= ()=>{
        setMoreOptionsModalVisible(false);
    }

    const exerciseModalHandler = (exercise) =>{
        setModalContext(exercise);
        setMoreOptionsModalVisible(true);
    }
    const exercises = useSelector((state)=>state[`routine${id}Exercises`]);
    
    const add_routine_exercise = (title, weight, reps, sets, type, distance) => { 
        if(type=="weight"){ 
            return(dispatch(addRoutineExercise(id, {
             title: "" + title,
             weight: Number(weight),
             type: "weight",
             reps: Number(reps),
             sets: Number(sets),
             complete: false,
         })))
         }
         else{
             return(dispatch(addRoutineExercise(id, {
                 title: "" + title,
                 type: "distance",
                 distance: (Number(distance)),
                 complete:false,
             })))
         }
     };

    const delete_routine_exercise = (exerciseId) => {
        return (dispatch(deleteRoutineExercise(id, exerciseId)));
    }

    const edit_routine_exercise = ( exerciseId, newExercise)=>{
        return (dispatch(editRoutineExercise(id, exerciseId, newExercise)));
    }

    const add_routine_to_day = (dayIndex) =>{
        return (dispatch(addRoutineToDay(dayIndex, id)));
    }

    const moreOptionsModalEditHandler = (context, newDetails) =>{
        if(newDetails.type=="weight"){
            edit_routine_exercise(context.id, {
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
            edit_routine_exercise(context.id, {
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
        delete_routine_exercise(exerciseId);
        setMoreOptionsModalVisible(false);
    }

     const addModalAddRoutineExerciseHandler = (addedExerciseTitle, addedExerciseWeight, addedExerciseRepsCount, addedExerciseSetsCount, addedExerciseType, addedExerciseDistance) =>{
        add_routine_exercise(addedExerciseTitle, addedExerciseWeight, addedExerciseRepsCount,
             addedExerciseSetsCount, addedExerciseType, addedExerciseDistance); 
        setAddModalVisible(false);
    }
    const completeRoutineExerciseHandler = () =>{

    }
    return (
        <ScrollView style={global.bodyWrapper}>
            <Text style={global.label}>{friendlyName}</Text>
            <Text style={global.label}>{id}</Text>
            <View>
                {exercises.map(exercise=>{
                    return(
                        <React.Fragment key={exercise.id}>
                           <Exercise 
                                exercise={exercise}
                                modalHandler={exerciseModalHandler}
                                completeHandler={completeRoutineExerciseHandler}
                                type="routine"
                           />
                        </React.Fragment>
                    )
                })}
            </View>
            <Button
                onPress={openAddModalHandler}
                title="add exercise"
            />
            
            <AddModal 
                addModalVisible={addModalVisible}
                addExerciseHandler={addModalAddRoutineExerciseHandler}
                closeAddModalHandler={closeAddModalHandler}
            />
            <MoreOptionsModal 
                moreOptionsModalVisible={moreOptionsModalVisible}
                editExerciseHandler={moreOptionsModalEditHandler}
                deleteExerciseHandler={moreOptionsModalDeleteHandler}
                closeMoreOptionsModalHandler={closeMoreOptionsModalHandler}
                exercise={modalContext}
            />
        </ScrollView>
    )
}

export default RoutineDetailsScreen

const styles = StyleSheet.create({})
