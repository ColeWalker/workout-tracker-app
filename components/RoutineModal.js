import React, {useState, useEffect} from 'react'
import { Modal,StyleSheet,Button, Picker, Text, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import {global} from '../styles/global'
import {useSelector, useDispatch} from 'react-redux'
import {routineExerciseLookup, dayLookup} from '../functions/utilities'
import { addRoutineExercise, editRoutineExercise, deleteRoutineExercise, addRoutineToDay } from '../redux/actions';
import {Feather, Ionicons} from '@expo/vector-icons'
import {editRoutineName} from '../redux/actions'
import AddModal from './AddModal'
import MoreOptionsModal from './MoreOptionsModal'
import Exercise from './Exercise'

const RoutineModal = ({routine, modalVisible, toggleVisibility, ...props}) => {
    // const friendlyName = routine.friendlyName;
    const id = routine.id;
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [modalContext, setModalContext] = useState({});
    const [moreOptionsModalVisible, setMoreOptionsModalVisible] = useState(false);
    const [editing, setEditing] = useState(false);
    const [titleText, setTitleText] = useState("" + routine.friendlyName);
    const [selectedDay, setSelectedDay] = useState(0);
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    
    const AllDayExercises= useSelector((state)=>{
        
        return [
            [...state['sundayExercises']], 
            [...state['mondayExercises']], 
            [...state['tuesdayExercises']],
            [...state['wednesdayExercises']],
            [...state['thursdayExercises']],
            [...state['fridayExercises']],
            [...state['saturdayExercises']],
        ]
    });
    
    
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
    const edit_routine_name = ()=>{
        return (dispatch(editRoutineName(id, titleText)))
    }

    const add_routine_to_day = (dayIndex) =>{
        return (dispatch(addRoutineToDay(dayIndex, id)));
    }

    const addRoutineToSelectedDay = () =>{
        const hasRoutineBeenAdded = AllDayExercises[selectedDay].some((value)=>{
            return value.routine===id;
        })

       if(hasRoutineBeenAdded){
        setShowError(true);
       }
       else{
           setShowError(false);
            add_routine_to_day(selectedDay);
       }
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

    const toggleEdit = () =>{
        setEditing(!editing);
    }
    

    useEffect(()=>{
        setTitleText(routine.friendlyName)
    }, [routine.friendlyName])
    
   
    const closeModalHandler = () =>{
        edit_routine_name()
        toggleVisibility();
    }

    const exercises = useSelector((state)=>state[routineExerciseLookup(routine.id)])
    return (
        <Modal
            visible={modalVisible}
        >
            <ScrollView 
                style={global.bodyWrapper}
            >
            <View
                style={styles.ModalHeader}
            >
                    <View
                        style={styles.CloseButtonWrapper}
                    >
                        <Ionicons.Button 
                            onPress={closeModalHandler} 
                            name="ios-close"
                            size={45}
                            backgroundColor="#FAF9FE"
                            color="#000000"
                        />
                    </View>
                </View>
                
            <View
                style={styles.titleWrapper}
            >   
                {editing ? <TextInput style={global.input} value={titleText} onChangeText={text=>setTitleText(text)} />:<Text style={global.label}>{titleText}</Text>}
                
                <Feather.Button
                    onPress={toggleEdit}
                    color="#a0a0a0"
                    size={32}
                    name="edit"
                    backgroundColor="rgba(0,0,0,0)"
                    activeOpacity={0}
                    underlayColor="rgba(0,0,0,0)"
                />
            </View>
            <View style={global.pickerWrapper}>
            <Picker
                selectedValue={selectedDay}
                onValueChange={(itemValue) => {
                    setShowError(false)
                    setSelectedDay(itemValue)
                }}
                style={global.picker}
            >
                    <Picker.Item 
                        label="Sunday"
                        value={0}
                    />
                    <Picker.Item 
                        label="Monday"
                        value={1}
                    />
                    <Picker.Item 
                        label="Tuesday"
                        value={2}
                    />
                    <Picker.Item 
                        label="Wednesday"
                        value={3}
                    />
                    <Picker.Item 
                        label="Thursday"
                        value={4}
                    />
                    <Picker.Item 
                        label="Friday"
                        value={5}
                    />
                    <Picker.Item 
                        label="Saturday"
                        value={6}
                    />
                </Picker>
            </View>
            {showError && <View style={styles.errorWrapper}>
                <Text>This routine is already in that day!</Text>
            </View>}
            <View style={global.buttonWrapper}>
                <Button 
                    onPress={addRoutineToSelectedDay}
                    title="Add routine to selected day"
                    
                    style={global.addButton}
                />
            </View>
            <View>
                {exercises && exercises.map(exercise=>{
                    return(
                        <React.Fragment key={exercise.id}>
                           <Exercise
                                exercise={exercise}
                                modalHandler={exerciseModalHandler}
                                type="routine"
                           />
                        </React.Fragment>
                    )
                })}
            </View>
            <Button
                onPress={openAddModalHandler}
                title="add exercise"
                color="#27F106"
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
        </Modal>
    )
}

export default RoutineModal

const styles = StyleSheet.create({
    ModalHeader:{
        flexDirection: "column-reverse",
        justifyContent:'flex-end',
        alignItems:"flex-end",
        marginBottom: -10
    },
    CloseButtonWrapper:{
        maxWidth:"50%",
        backgroundColor: "#FAF9FE",
    },
    titleWrapper:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
    },
    errorWrapper:{
        borderWidth: 2,
        borderRadius: 15,
        borderColor: "#ff3333",
        backgroundColor:"#f9ebeb",
        fontSize: 22,
        paddingVertical: 15,
        paddingHorizontal:10,
        alignItems:"center",
        marginVertical:10,
        marginHorizontal:10,
    },
    errorMessage: {
        fontSize:22,
        textAlign:"center",

    }
})

    
    
   

