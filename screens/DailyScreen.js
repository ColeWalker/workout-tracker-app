import React, {useCallback, useState} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Modal, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addExercise, deleteExercise } from '../redux/actions';


const DailyScreen = (props) => {
    const now = new Date();
    //int 0->6, 0=Sunday
    const dayOfWeek = now.getDay(); 
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [addedExerciseTitle, setAddedExerciseTitle] = useState("title");

    const dayState = useSelector(state=> state.days[dayOfWeek]);
    let workoutDay = useSelector(state=> state.days[dayOfWeek].day);
    let exercises = useSelector(state=> state.days[dayOfWeek].exercises);  

    const dispatch = useDispatch();
    const add_exercise = (title) => { 
        return(dispatch(addExercise(dayOfWeek, {
            title: "" + title,
            weight: 125,
            type: "weight",
            reps: 5,
            sets: 3,})))
    };
    
    const delete_exercise = (index) => {
        return (dispatch(deleteExercise(dayOfWeek, index)));
    }

    return (
        <ScrollView>
            <Text>{workoutDay}</Text>
            {exercises.map((exercise, index)=>{
                return(
                    <View key={index}>
                        <Text>{exercise.title}</Text>
                        <Button onPress={()=>{delete_exercise(index)}} title="Delete this!"/>
                    </View>
                )
            })}
            <Button onPress={()=>{setAddModalVisible(true)}} title="Click Me" /> 
            <Modal
                transparent={false}
                visible={addModalVisible}
                onRequestClose={() => {
                    
                  }}
            >   
                <Text>Modal is visible</Text>
                <TextInput 
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setAddedExerciseTitle(text)} value={addedExerciseTitle}></TextInput>
                <Button title="Close Modal Without Saving" onPress={()=>{setAddModalVisible(false)}}/>
                <Button title="Save Exercise" onPress={()=>{add_exercise(addedExerciseTitle); setAddModalVisible(false);}}/>
            </Modal>

        </ScrollView> 
    )
}

export default DailyScreen

const styles = StyleSheet.create({})
