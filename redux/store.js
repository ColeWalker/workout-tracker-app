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
        level: 1,
        xp: 0,
        weightLifted: 0,
        distance: 0,
        repsCompleted: 0,
        setsCompleted: 0,
        exercisesCompleted: 0,
    }

};






const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, initialState);
export const persistor = persistStore(store);