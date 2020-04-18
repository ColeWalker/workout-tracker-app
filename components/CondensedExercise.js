import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import MoreOptionsModal from './MoreOptionsModal';
import { useDispatch } from 'react-redux';
import { editExercise, deleteExercise } from '../redux/actions';


const CondensedExercise = (props) => {
    const exercise = props.exercise;
    const isLast = props.isLast;
    const dayNum = props.dayNum;
    const dispatch = useDispatch();
    
    const [moreOptionsModalVisible, setMoreOptionsModalVisible] = useState(false);
    
    const closeMoreOptionsModal = () =>{
        setMoreOptionsModalVisible(false);
    }

    const openMoreOptionsModal = () =>{
        setMoreOptionsModalVisible(true);
    }

    const delete_exercise = (exerciseId) => {
        return (dispatch(deleteExercise(dayNum, exerciseId)));
    }

    const edit_exercise = (exerciseId, newExercise)=>{
        return (dispatch(editExercise(dayNum, exerciseId, newExercise)));
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
        <View 
            style={isLast ? [styles.CondensedExerciseWrapper]: [styles.CondensedExerciseWrapper, styles.WithBorder]}
        >
            <View>
            	<Text style={styles.size}>{exercise.title}</Text>
            </View>
            <View>
                <Ionicons.Button
                backgroundColor="#ffffff" 
                color="#000000" 
                name="ios-more" 
                size={18}
                onPress={openMoreOptionsModal}
                ></Ionicons.Button>
            </View>
            <MoreOptionsModal 
                moreOptionsModalVisible={moreOptionsModalVisible}
                exercise={exercise}
                closeMoreOptionsModalHandler={closeMoreOptionsModal}
                editExerciseHandler={moreOptionsModalEditHandler}
                deleteExerciseHandler={moreOptionsModalDeleteHandler}
            />
        </View>
        
    )
}

export default CondensedExercise

const styles = StyleSheet.create({
    CondensedExerciseWrapper:{
        marginLeft: 15,
        marginRight: 15,
        marginTop:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: "center",
    },
    WithBorder:{
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd"
    },
    size:{
        fontSize: 18,
        paddingBottom: 5,
    },


})
