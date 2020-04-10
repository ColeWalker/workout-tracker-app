import React, {useState} from 'react'
import { StyleSheet, Text, ScrollView, TextInput, Button, View, Modal } from 'react-native'

const MoreOptionsModal = (props) => {
    let moreOptionsModalVisible = props.moreOptionsModalVisible;
    let editExerciseHandler = props.editExerciseHandler;
    let deleteExerciseHandler = props.deleteExerciseHandler;
    let closeMoreOptionsModalHandler = props.closeMoreOptionsModalHandler;
    let exercise = props.exercise; 

    const [editedExerciseTitle, setEditedExerciseTitle] = useState("title");
    const [editedExerciseWeight, setEditedExerciseWeight] = useState(0);
    const [editedExerciseRepsCount, setEditedExerciseRepsCount] = useState(0);
    const [editedExerciseSetsCount, setEditedExerciseSetsCount] = useState(0);


    const editExerciseHandlerCaller = () => {
        editExerciseHandler(exercise, {
            exerciseTitle: editedExerciseTitle,
            exerciseWeight: editedExerciseWeight,
            exerciseRepsCount: editedExerciseRepsCount,
            exerciseSetsCount: editedExerciseSetsCount,
            type: "weight",
        });
    }

    const deleteExerciseHandlerCaller=()=>{
        deleteExerciseHandler(exercise.id);
    }
    return (
        <Modal
            transparent={false}
            visible={moreOptionsModalVisible}  
        >   
            <ScrollView>
                <Text>Title</Text>
                <TextInput 
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop:10 }}
                onChangeText={text => setEditedExerciseTitle(text)} value={editedExerciseTitle}></TextInput>

                <Text>Weight (lbs)</Text>
                <TextInput 
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
                onChangeText={text => setEditedExerciseWeight(text)} value={"" + editedExerciseWeight}></TextInput>

                <Text>Reps</Text>
                <TextInput 
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
                onChangeText={text => setEditedExerciseRepsCount(text)} value={"" + editedExerciseRepsCount}></TextInput>

                <Text>Sets</Text>
                <TextInput 
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
                onChangeText={text => setEditedExerciseSetsCount(text)} value={"" + editedExerciseSetsCount}></TextInput>
                <Button onPress={deleteExerciseHandlerCaller} 
                title="Delete Exercise"
                style={styles.deleteButton}
                />
                <Button onPress={editExerciseHandlerCaller} 
                title="Save Changes"
                />
                <Button onPress={closeMoreOptionsModalHandler} title="Close Modal"></Button>
            </ScrollView>
        </Modal>

       
    )
}

export default MoreOptionsModal

const styles = StyleSheet.create({})
