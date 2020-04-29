import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RoutineDetailsScreen from '../screens/RoutineDetailsScreen';
import RoutinesScreen from '../screens/RoutinesScreen'
import { enableScreens } from 'react-native-screens';
enableScreens();
const Stack = createStackNavigator();

const RoutinesNavigator = () => {
    return (
        <Stack.Navigator headerMode="none" mode="modal">
            <Stack.Screen name="Routines" component={RoutinesScreen} />
            <Stack.Screen name="Details" component={RoutineDetailsScreen} />
        </Stack.Navigator>
    )
}

export default RoutinesNavigator
