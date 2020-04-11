import React, {useState} from 'react'
import { StyleSheet, Text, ScrollView, TextInput, Button, View, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const AddModal = (props) => {
    let addModalVisible = props.addModalVisible;
    let addExerciseHandler = props.addExerciseHandler;
    let closeAddModalHandler = props.closeAddModalHandler;
    const [addedExerciseTitle, setAddedExerciseTitle] = useState("Default Title");
    const [addedExerciseWeight, setAddedExerciseWeight] = useState(15);
    const [addedExerciseRepsCount, setAddedExerciseRepsCount] = useState(15);
    const [addedExerciseSetsCount, setAddedExerciseSetsCount] = useState(3);

    const addExerciseHandlerCaller = () => {
        addExerciseHandler(addedExerciseTitle, addedExerciseWeight, addedExerciseRepsCount, addedExerciseRepsCount);
        resetVariables();
    }

    const resetVariables = () => {
        setAddedExerciseTitle("Default Title");
        setAddedExerciseWeight(15);
        setAddedExerciseRepsCount(15);
        setAddedExerciseSetsCount(3);
    }

    return (
        <Modal
            transparent={false}
            visible={addModalVisible}  
        >   
            <ScrollView
                style={styles.ModalWrapper}
            >

                <View
                    style={styles.ModalHeader}
                >
                    <View
                        style={styles.CloseButtonWrapper}
                    >
                        <Ionicons.Button 
                            onPress={closeAddModalHandler} 
                            name="ios-close"
                            size={45}
                            backgroundColor="#ffffff"
                            color="#000000"
                        ></Ionicons.Button>
                    </View>
                </View>
                <Text style={styles.Label}>Title</Text>
                <TextInput 
                style={styles.Input}
                onChangeText={text => setAddedExerciseTitle(text)} value={addedExerciseTitle}></TextInput>

                <Text style={styles.Label}>Weight (lbs)</Text>
                <TextInput 
                style={styles.Input}
                onChangeText={text => setAddedExerciseWeight(text)} value={"" + addedExerciseWeight}></TextInput>

                <Text style={styles.Label}>Reps</Text>
                <TextInput 
                style={styles.Input}
                onChangeText={text => setAddedExerciseRepsCount(text)} value={"" + addedExerciseRepsCount}></TextInput>

                <Text style={styles.Label}>Sets</Text>
                <TextInput 
                style={styles.Input}
                onChangeText={text => setAddedExerciseSetsCount(text)} value={"" + addedExerciseSetsCount}></TextInput>

                <View
                    style={styles.ButtonWrapper}
                >
                    <Button 
                        title="Save Exercise" 
                        onPress={addExerciseHandlerCaller}
                        color="#1fa30a"
                        style={styles.SaveButton}
                    />
                </View>
            </ScrollView>
        </Modal>

       
    )
}

export default AddModal

const styles = StyleSheet.create({
    ModalWrapper:{
        paddingHorizontal: 20,
     },
     ModalHeader:{
         flexDirection: "column-reverse",
         justifyContent:'flex-end',
         alignItems:"flex-end",
         marginBottom: -10
     },
     CloseButtonWrapper:{
         maxWidth:"50%",
         backgroundColor: "#ffffff",
     },
     Label: {
        fontSize: 20,
        marginTop:10,
    },
    Input:{ 
        padding: 12,
        borderColor: 'gray', 
        borderWidth: 1,
        marginTop:10,
        fontSize: 18, 
    },
    DeleteButton: {
        backgroundColor:"#d11a2a",
    },
    SaveButton: {
        marginVertical:15,
        padding:10,
    },
    ButtonWrapper:{
        marginTop:15,
    },
})
