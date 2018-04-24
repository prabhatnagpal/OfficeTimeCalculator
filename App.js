import React from 'react'
import {TabNavigator, TabBarTop} from 'react-navigation'
import Home from './tabs/Home'
import Dues from './tabs/Dues'
import Savings from "./tabs/Savings";

const AppNavigator = new TabNavigator(
    {
        Dues: {
            screen: Dues,
            navigationOptions: {
                tabBarLabel: 'Dues',
            },
        },

        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: 'Home',
            },

        },

        Savings: {
            screen: Savings,
            navigationOptions: {
                tabBarLabel: 'Savings',
            },
        },
    },
    {
        tabBarComponent: TabBarTop,
        initialRouteName: 'Home',
        tabBarOptions: {
            labelStyle: {
                fontSize: 23,
            },
            style: {
                backgroundColor: '#4CAF50'
            },
            indicatorStyle: {
                backgroundColor: 'white'
            },
            inactiveTintColor: '#1A237E',
            upperCaseLabel: false
        }
    }
);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: {}
        };
    }

    onNavigationChange = (prevState, currentState) => {
        this.setState({
            key: currentState.index
        });
        //alert(JSON.stringify(currentState))
    };

    render() {
        return (
            <AppNavigator onNavigationStateChange={this.onNavigationChange} screenProps={{key: this.state.key}}/>
        );
    }
}

/*
export default class App extends React.Component {

    render() {
        return (
            <AppNavigator onNavigationStateChange={(prevState, currentState) => {
                const currentScreen = getCurrentRouteName(currentState);
                const prevScreen = getCurrentRouteName(prevState);
                if (prevScreen !== currentScreen) {
                    this.setState({AppNavigator: currentScreen})
                }
            }} screenProps={{currentScreen: this.state.AppNavigator}}/>
        );

        function getCurrentRouteName(navigationState) {
            if (!navigationState) {
                return null;
            }
            const route = navigationState.routes[navigationState.index];
            if (route.routes) {
                return getCurrentRouteName(route);
            }
            return route.routeName;
        }
    }
}*/
