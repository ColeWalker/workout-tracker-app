import React, {useState} from 'react'
import { Picker,StyleSheet, Text, ScrollView, TextInput, Button, View, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const MoreOptionsModal = (props) => {
    let moreOptionsModalVisible = props.moreOptionsModalVisible;
    let editExerciseHandler = props.editExerciseHandler;
    let deleteExerciseHandler = props.deleteExerciseHandler;
    let closeMoreOptionsModalHandler = props.closeMoreOptionsModalHandler;
    let exercise = props.exercise; 

    const [editedExerciseTitle, setEditedExerciseTitle] =exercise.title ? useState(exercise.title) : useState("Default Title");
    const [editedExerciseWeight, setEditedExerciseWeight] =exercise.weight ? useState(exercise.weight) : useState(15);
    const [editedExerciseRepsCount, setEditedExerciseRepsCount] = exercise.reps ? useState(exercise.reps) : useState(15);
    const [editedExerciseSetsCount, setEditedExerciseSetsCount] = exercise.sets ? useState(exercise.sets) : useState(3);
    const [editedExerciseDistance, setEditedExerciseDistance] = exercise.distance ? useState(exercise.distance) : useState(0);
    const [editedExerciseType, setEditedExerciseType ] = exercise.type ? useState(exercise.type) : useState("weight");
    
    const editExerciseHandlerCaller = () => {
       if(editedExerciseType=="weight"){ 
           editExerciseHandler(exercise, {
                exerciseTitle: editedExerciseTitle,
                exerciseWeight: editedExerciseWeight,
                exerciseRepsCount: editedExerciseRepsCount,
                exerciseSetsCount: editedExerciseSetsCount,
                type: "weight",
            });
        }
        else{
            editExerciseHandler(exercise, {
                type: "distance",
                distance: editedExerciseDistance
            });
        }
    }

    const deleteExerciseHandlerCaller=()=>{
        deleteExerciseHandler(exercise.id);
    }
    const resetState = ()=>{
        exercise.title ? setEditedExerciseTitle(exercise.title) : setEditedExerciseTitle("Default Title");
        exercise.weight ? setEditedExerciseWeight(exercise.weight) : setEditedExerciseWeight(15);
        exercise.reps ? setEditedExerciseRepsCount(exercise.reps) : setEditedExerciseRepsCount(15);
        exercise.sets ? setEditedExerciseSetsCount(exercise.sets) : setEditedExerciseSetsCount(3);
        exercise.distance ? setEditedExerciseDistance(exercise.distance) : setEditedExerciseDistance(0);
        exercise.type ? setEditedExerciseType(exercise.type) : setEditedExerciseType("weight");
    }
    return (
        <Modal
            transparent={false}
            visible={moreOptionsModalVisible}  
            onShow={resetState}
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
                            onPress={closeMoreOptionsModalHandler} 
                            name="ios-close"
                            size={45}
                            backgroundColor="#ffffff"
                            color="#000000"
                        ></Ionicons.Button>
                    </View>
                </View>
                <Picker
                    selectedValue={editedExerciseType}
                    onValueChange={(itemValue) => setEditedExerciseType(itemValue)}
                    style={styles.Input}
                >
                    <Picker.Item 
                        label="Weight"
                        value="weight"
                    />
                    <Picker.Item 
                        label="Distance"
                        value="distance"
                    />
                </Picker>

                <Text style={styles.Label}>Title</Text>

                <TextInput 
                    style={styles.Input}
                    onChangeText={text => setEditedExerciseTitle(text)} 
                    value={editedExerciseTitle}
                />

               { editedExerciseType=="weight" ? <View>
                    <Text style={styles.Label}>Weight (lbs)</Text>
    
                    <TextInput 
                        style={styles.Input}
                        onChangeText={text => setEditedExerciseWeight(text)} value={"" + editedExerciseWeight}
                    />
    
                    <Text style={styles.Label}>Reps</Text>
    
                    <TextInput 
                    style={styles.Input}
                        onChangeText={text => setEditedExerciseRepsCount(text)} 
                        value={"" + editedExerciseRepsCount}
                    />
    
                    <Text style={styles.Label}>Sets</Text>
    
                    <TextInput 
                        style={styles.Input}
                        onChangeText={text => setEditedExerciseSetsCount(text)} 
                        value={"" + editedExerciseSetsCount}
                    />
                    
                </View> : <View>
                    <Text style={styles.Label}>Distance (mi)</Text>
                    <TextInput 
                        style={styles.Input}
                        onChangeText={text => setEditedExerciseDistance(text)} 
                        value={"" + editedExerciseDistance}
                    />
                </View>
                }
                <View
                    style={styles.ButtonWrapper}
                >
                    <Button 
                        onPress={deleteExerciseHandlerCaller} 
                        title="Delete Exercise"
                        style={styles.DeleteButton}
                        color="#d11a2a"
                    />
                </View>
                <View
                    style={styles.ButtonWrapper}
                >
                    <Button 
                        onPress={editExerciseHandlerCaller} 
                        title="Save Changes"
                        style={styles.SaveButton}
                        color="#1fa30a"
                    />
                </View>
                
            </ScrollView>
        </Modal>

       
    )
}

export default MoreOptionsModal

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
    },
    ButtonWrapper:{
        marginTop:15,
    },


})
