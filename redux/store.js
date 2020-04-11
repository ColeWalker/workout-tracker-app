import {createStore} from 'redux'
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist';
import {AsyncStorage} from 'react-native';

const initialState = {
    days:[
        {
            day:"Sunday",
            exercises:[
               
            ]
        },
        {
            day:"Monday",
            exercises:[
               
            ]
        },
        {
            day:"Tuesday",
            exercises:[
                
            ]
        },
        {
            day:"Wednesday",
            exercises:[
              
            ]
        },
        {
            day:"Thursday",
            exercises:[
               
            ]
        },
        {
            day:"Friday",
            exercises:[
               
            ]
        },
        {
            day:"Saturday",
            exercises:[
            ]
        },
        
    ],
    stats: {
        weightLifted: 15,
        distance: 150,
        repsCompleted: 150,
        setsCompleted: 200,
        exercisesCompleted: 15,
    }

};






const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, initialState);
export const persistor = persistStore(store);