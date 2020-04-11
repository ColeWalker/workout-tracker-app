import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import CollapsibleDay from '../components/CollapsibleDay'

export default class WeeklyScreen extends Component {
    render() {
        return (
            <ScrollView style={styles.bodyWrapper}>
                <CollapsibleDay
                    day={0}
                />
                <CollapsibleDay
                    day={1}
                />
                <CollapsibleDay
                    day={2}
                />
                <CollapsibleDay
                    day={3}
                />
                <CollapsibleDay
                    day={4}
                />
                <CollapsibleDay
                    day={5}
                />
                <CollapsibleDay
                    day={6}
                />
            </ScrollView>
        )
    }
}

const styles= StyleSheet.create({
    bodyWrapper:{
        backgroundColor: "#FAF9FE",
        flex:1,
        paddingHorizontal: 40,
    },
})