import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import DailyScreen from '../screens/DailyScreen.js';
import WeeklyScreen from '../screens/WeeklyScreen.js';
import StatisticsScreen from '../screens/StatisticsScreen.js';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerTitle: getHeaderTitle(route), 
    headerTitleStyle:{
      fontSize: 40,
      marginTop:30,
      marginBottom:30
    },
    headerStyle:{
      borderBottomWidth:0,
      shadowOpacity:0,
      elevation:0,
      backgroundColor:"#FAF9FE",
      
    } 
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} 
    >
      <BottomTab.Screen
        name="Daily"
        component={DailyScreen}
        options={{
          title: 'Daily',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-fitness" />, 
         
        }}
      />
      <BottomTab.Screen
        name="Weekly"
        component={WeeklyScreen}
        options={{
          title: 'Weekly',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-calendar" />,
        }}
      />
      <BottomTab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          title: 'Statistics',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-podium" />,
        }}
      />
      
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  const now = new Date();
  //int 0-6, 0=Sunday
  const dayOfWeek = now.getDay(); 
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const friendlyDay = days[dayOfWeek];
  switch (routeName) {
    case 'Daily':
      return friendlyDay;
    case 'Weekly':
      return 'Weekly View';
    case 'Statistics':
      return 'Statistics';
    
  }
}
