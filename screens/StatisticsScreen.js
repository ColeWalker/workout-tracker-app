import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {calculateLevelUpXp} from '../functions/stats'
import {MaterialCommunityIcons, AntDesign} from '@expo/vector-icons'

const StatisticsScreen = () => {
    const dispatch = useDispatch();
    let level = useSelector(state => state.stats.level);
    let currentXp = useSelector(state => state.stats.xp);
    let stats = useSelector(state=> state.stats);

    let neededXp = calculateLevelUpXp(level);
    let xpPercent = currentXp/neededXp * 100;

    return (
        <ScrollView
            style={styles.BodyWrapper}
        >
            <View
                style={styles.GamificationInfoWrapper}
            >
                <Text style={styles.Level} >Level {level}</Text>
                <View
                    style={styles.xpBarWrapper}
                >   
                    <View style={[{maxWidth: xpPercent +"%",}, styles.xpBar]}></View>
                    
                </View>
                <Text style={styles.Level}>{currentXp} xp / {neededXp} xp</Text>
            </View> 
            <View
                style={styles.StatsRow}
            >
                <View
                    style={styles.StatsBlock}
                >
                    <MaterialCommunityIcons
                        name="check-decagram"
                        size={75}
                    />
                    <Text style={styles.StatsTitle}>Reps Completed</Text>
                    <Text style={styles.Stat}>{stats.repsCompleted} reps</Text>
                </View>
                <View
                    style={styles.StatsBlock}
                >
                    <MaterialCommunityIcons
                        name="dumbbell"
                        size={75}
                    />
                    <Text style={styles.StatsTitle}>Weight Lifted</Text>
                    <Text style={styles.Stat}>{stats.weightLifted} lbs</Text>
                </View>
            </View>
            <View
                style={styles.StatsRow}
            >
                <View
                    style={styles.StatsBlock}
                >
                    <AntDesign
                        name="Trophy"
                        size={75}
                    />
                    <Text style={styles.StatsTitle}>Sets Completed</Text>
                    <Text style={styles.Stat}>{stats.setsCompleted} sets</Text>
                </View>
                <View
                    style={styles.StatsBlock}
                >
                    <MaterialCommunityIcons
                        name="run-fast"
                        size={75}
                    />
                    <Text style={styles.StatsTitle}>Distance Traveled</Text>
                    <Text style={styles.Stat}>{stats.distance} miles</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default StatisticsScreen

const styles = StyleSheet.create({
    BodyWrapper:{
        backgroundColor: "#FAF9FE",
        flex:1,
        paddingHorizontal: 40,
    },
    GamificationInfoWrapper:{
        backgroundColor: "#ffffff",
        borderRadius: 12,
        marginTop: 5,
        paddingHorizontal:10,
        paddingVertical:20,
        marginHorizontal:10,
        elevation: 5,
        marginBottom: 15,
        flexDirection:'column',
        justifyContent:"space-between",
        alignItems:"flex-start",
    },
    Level:{
        fontSize: 25,
    },
    xpBarWrapper:{
        backgroundColor:"#ffffff",
        height:15,
        marginVertical: 15,
        width:"100%",
        borderWidth: 2,
        borderColor: "#736b92",
        borderRadius: 15,
        overflow: 'hidden',
    },
    xpBar:{
        backgroundColor: "#736b92",
        height: 15,
        minWidth: 2,
    },
    StatsRow:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    StatsBlock:{
        backgroundColor: "#ffffff",
        borderRadius: 12,
        marginTop: 5,
        paddingHorizontal:10,
        paddingVertical:20,
        marginHorizontal:10,
        elevation: 5,
        marginBottom: 15,
        flexDirection:'column',
        justifyContent:"space-between",
        alignItems:"center",
        flex: 1,
        maxWidth:"50%"
    },
    StatsTitle:{
        fontSize: 22,
        marginTop: 10,
        textAlign:"center",
    },
    Stat:{
        fontSize:24,
        marginTop:10,
        fontWeight: "bold"
    }
    })
