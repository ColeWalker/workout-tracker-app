import React, {useState} from 'react'
import { StyleSheet, Text, ScrollView, TextInput, Button, View, Modal } from 'react-native'

const AddModal = (props) => {
    let addModalVisible = props.addModalVisible;
    let addExerciseHandler = props.addExerciseHandler;
    let closeAddModalHandler = props.closeAddModalHandler;
    const [addedExerciseTitle, setAddedExerciseTitle] = useState("title");
    const [addedExerciseWeight, setAddedExerciseWeight] = useState(0);
    const [addedExerciseRepsCount, setAddedExerciseRepsCount] = useState(0);
    const [addedExerciseSetsCount, setAddedExerciseSetsCount] = useState(0);

    const addExerciseHandlerCaller = () => {
        addExerciseHandler(addedExerciseTitle, addedExerciseWeight, addedExerciseRepsCount, addedExerciseRepsCount);
    }

    return (
        <Modal
                transparent={false}
                visible={addModalVisible}  
            >   
            <ScrollView>
                <Text>Title</Text>
                <TextInput 
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop:10 }}
                onChangeText={text => setAddedExerciseTitle(text)} value={addedExerciseTitle}></TextInput>

                <Text>Weight (lbs)</Text>
                <TextInput 
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
                onChangeText={text => setAddedExerciseWeight(text)} value={"" + addedExerciseWeight}></TextInput>

                <Text>Reps</Text>
                <TextInput 
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
                onChangeText={text => setAddedExerciseRepsCount(text)} value={"" + addedExerciseRepsCount}></TextInput>

                <Text>Sets</Text>
                <TextInput 
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
                onChangeText={text => setAddedExerciseSetsCount(text)} value={"" + addedExerciseSetsCount}></TextInput>

                    <Button title="Close Modal Without Saving" onPress={closeAddModalHandler}/>
                    <Button title="Save Exercise" 
                    onPress={addExerciseHandlerCaller}
                    />
            </ScrollView>
        </Modal>

       
    )
}

export default AddModal

const styles = StyleSheet.create({})
