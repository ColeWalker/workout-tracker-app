import React from 'react'
import { StyleSheet, Button,TouchableOpacity , Text, View } from 'react-native'
import {global} from '../styles/global'
import {Ionicons} from '@expo/vector-icons';

const CondensedRoutine = ({routine, setModalContext, toggleModalVisibility}) => {
    const openDetailsHandler = () =>{
        setModalContext(routine);
        toggleModalVisibility();
    }

    return (
        <View style={styles.routineWrapperOuter}>
            <TouchableOpacity 
                style={styles.routineWrapperInner}
                onPress={openDetailsHandler}
                >
                <Text style={styles.routineTitle}>{routine.friendlyName}</Text>
              
                <Ionicons  
                    name="ios-arrow-forward" 
                    size={32}
                />
            </TouchableOpacity>
        </View>
    )
}

export default CondensedRoutine

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
