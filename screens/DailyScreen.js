import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';

const DailyScreen = (props) => {
    const now = new Date();
    //int 0->6, 0=Sunday
    const dayOfWeek = now.getDay(); 
    const [workoutDay, exercises] = useSelector(state=> [...state.days[dayOfWeek]])
    console.log(workoutDay + "\n" + exercises);
    return (
        <View>
            <Text>{workoutDay}</Text>
            <Text>{exercises[0].title}</Text>
        </View>
    )
}

export default DailyScreen

const styles = StyleSheet.create({})
