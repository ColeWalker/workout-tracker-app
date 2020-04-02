import {createStore} from 'redux'
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist';
import {AsyncStorage} from 'react-native';

const initialState = {
    days:[
        {
            day:"Sunday",
            exercises:[
                {
                    title:"Test",
                    weight: 125,
                    type: "weight",
                    reps: 5,
                    sets: 3,

                }
            ]
        },
        {
            day:"Monday",
            exercises:[
                {
                    title:"Test",
                    weight: 125,
                    type: "weight",
                    reps: 5,
                    sets: 3,

                }
            ]
        },
        {
            day:"Tuesday",
            exercises:[
                {
                    title:"Test",
                    weight: 125,
                    type: "weight",
                    reps: 5,
                    sets: 3,

                }
            ]
        },
        {
            day:"Wednesday",
            exercises:[
                {
                    title:"Test",
                    weight: 125,
                    type: "weight",
                    reps: 5,
                    sets: 3,

                }
            ]
        },
        {
            day:"Thursday",
            exercises:[
                {
                    title:"Test",
                    weight: 125,
                    type: "weight",
                    reps: 5,
                    sets: 3,

                }
            ]
        },
        {
            day:"Friday",
            exercises:[
                {
                    title:"Test",
                    weight: 125,
                    type: "weight",
                    reps: 5,
                    sets: 3,

                }
            ]
        },
        {
            day:"Saturday",
            exercises:[
                {
                    title:"Test",
                    weight: 125,
                    type: "weight",
                    reps: 5,
                    sets: 3,

                }
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