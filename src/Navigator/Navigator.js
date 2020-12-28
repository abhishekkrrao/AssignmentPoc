import React,{ Component } from "react";
import { Loading,HomePage,VideoPlayer } from '../screens'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,StackActions,NavigationActions } from 'react-navigation';
import { StatusBar,Platform } from "react-native";
console.disableYellowBox = true;
const AppNavigator = createStackNavigator({
    Loading: { screen: Loading },
    HomePage: { screen: HomePage },
    VideoPlayer: { screen: VideoPlayer }
},{
    headerMode: 'none'
});
const AppContainer = createAppContainer(AppNavigator);
export default class Navigator extends React.Component {

    render() {
        return (<AppContainer ref={(r) => { r != null ? this.navigation = r._navigation : ""; }} />);
    }
    componentDidMount() {
        Platform.OS == "android" ? StatusBar.setBackgroundColor("#4ba3c7") : "",
            setTimeout(() => { this.lounchApp('VideoPlayer'); },2000);
    }
    lounchApp = (initialRouteName) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: initialRouteName
            })],
        })
        this.navigation.dispatch(resetAction);
    }
}