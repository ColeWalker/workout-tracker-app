import {StyleSheet} from 'react-native';

export const global = StyleSheet.create({
    bodyWrapper:{
        backgroundColor: "#FAF9FE",
        flex:1,
        paddingHorizontal: 40,
    },
    deleteButton:{
        marginBottom:20,
        marginTop:20,
        backgroundColor:"#d11a2a",
    },
    addButtonWrapper:{
        paddingHorizontal: 10,
        paddingTop: 10,
        marginBottom: 25,
    },
    addButton:{
        borderRadius: 25,
        paddingVertical: 20,
    },
    modalWrapper:{
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 20,
        marginTop:10,
    },
    input:{ 
        padding: 12,
        borderColor: 'gray', 
        borderWidth: 1,
        marginTop:10,
        fontSize: 18, 
        backgroundColor: "#ffffff",
        
    },
    pickerWrapper:{
        backgroundColor: "#ffffff",
       
        borderRadius:15,
        marginTop:10,
        marginHorizontal:10,
        elevation:5,
        overflow:"hidden"
    },
    picker:{
        backgroundColor: "#ffffff",
        fontSize: 18, 
        padding: 12,
        
        borderRadius:26,
    },
    saveButton: {
        marginVertical:15,
        padding:10,
    },
    buttonWrapper:{
        marginTop:15,
        marginBottom:10,
    },
});