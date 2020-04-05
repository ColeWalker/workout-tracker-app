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
  navigation.setOptions({headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
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

  switch (routeName) {
    case 'Daily':
      return 'Daily View';
    case 'Weekly':
      return 'Weekly View';
    case 'Statistics':
      return 'Statistics';
    
  }
}
