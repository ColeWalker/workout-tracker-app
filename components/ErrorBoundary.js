import React, { Component } from 'react'
import {Text} from 'react-native'

export default class ErrorBoundary extends Component {
    constructor(props){
     super(props);
     this.state = {hasError:false};   
    }

    static getDerivedStatefromError(error){
        return { hasError: true}
    }
    

    render() {
        if(this.state.hasError){
            return <Text>Something went wrong.</Text>
        }

        return this.props.children;
    } 
}
