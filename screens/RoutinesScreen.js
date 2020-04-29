import React,{useState} from 'react'
import { StyleSheet, TouchableOpacity, TextInput, Button , Text, View, ScrollView } from 'react-native'
import { createRoutine } from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux';
import { global } from '../styles/global';
import CondensedRoutine from '../components/CondensedRoutine';
import {Ionicons } from '@expo/vector-icons'
import RoutineModal from '../components/RoutineModal'

const RoutinesScreen = ({navigation, ...props}) => {
    const [addFormVisible, setAddFormVisible ] = useState(false);
    const [addRoutineName, setAddRoutineName] = useState("Routine Name");
    const [modalContext, setModalContext] = useState({});
    const [routineDetailsModalVisible, setRoutineDetailsModalVisible] = useState(false);
    const routines = useSelector((state)=>state.routines);
    const dispatch = useDispatch();


    const create_routine = (friendlyName) =>{
        return dispatch(createRoutine(friendlyName));
    }

    const showAddRoutineForm = () =>{
        setAddFormVisible(true);
    }

    const handleSaveAddRoutine = () =>{
        create_routine(addRoutineName);
        setAddFormVisible(false);
    }

    const hideAddRoutineForm = () =>{
        setAddFormVisible(false);
    }

    const detailNavigationHandler = (friendlyName, id) =>{
        navigation.navigate('Details', {
            friendlyName,
            id
        })
    }
     
    const toggleRoutineDetailsModalVisible = () => {
        setRoutineDetailsModalVisible(!routineDetailsModalVisible);
    }

    const modalContextHandler = (routine) =>{
        setModalContext(routine);
    }
    return (
        <ScrollView style={global.bodyWrapper}>
            {addFormVisible ? <View style={styles.AddForm}>
                <Text style={global.label}>Routine Name</Text>
                <TextInput
                    value={addRoutineName}
                    onChangeText={(value)=>{setAddRoutineName(value)}}
                    style={global.input}
                /> 
                <View style={global.buttonWrapper}>
                    <Button onPress={hideAddRoutineForm} title="Cancel"/>
                </View>
                <View style={global.buttonWrapper}>
                    <Button onPress={handleSaveAddRoutine} title="Save"/>
                </View>
                </View> : <View style={global.buttonWrapper}>
                    <Button onPress={showAddRoutineForm} title="Add Routine" />
                </View>}
            
                {routines.map(routine=>{
                return(
                    <React.Fragment key={routine.id}>
                        
                            <CondensedRoutine 
                            routine={routine}
                            setModalContext={modalContextHandler}
                            toggleModalVisibility={toggleRoutineDetailsModalVisible}
                            detailNavigationHandler={detailNavigationHandler}
                        />
                        
                       
                    </React.Fragment>
                )
            })

            }
            
            <RoutineModal 
                routine={modalContext}
                modalVisible={routineDetailsModalVisible}
                toggleVisibility={toggleRoutineDetailsModalVisible}
            />
        </ScrollView>
    )
}

export default RoutinesScreen

const styles = StyleSheet.create({
    routineWrapperOuter:{
        padding: 25,
        backgroundColor:"#ffffff",
        elevation:5,
        marginHorizontal: 5,
        marginBottom:15,
        borderRadius: 15,
    },
    routineWrapperInner:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    routineTitle:{
        fontSize:22,
        marginTop:0,
    }
})
