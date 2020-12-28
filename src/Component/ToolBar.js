import React,{ Component } from 'react';
import { View,StyleSheet,Text,Image,TouchableOpacity,Platform,Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import assets from '../assets/index'

class ToolBar extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const { title,navigation,style,rightButtonComponent } = this.props;
        return (
            <View style={[styles.headerView,style]}>
                <TouchableOpacity
                    style={styles.backButtonView} onPress={() => navigation.goBack()}>
                    {this.getBackIconInApp(title)}
                </TouchableOpacity>
                {rightButtonComponent &&
                    <View
                        style={styles.rightButtonView}>{rightButtonComponent}</View>}
            </View>
        );
    }
    getBackIconInApp(title) {
        if (title == "") {
            return (<TouchableOpacity onPress={{}}>
            </TouchableOpacity>)
        } else {
            return (<Image
                source={assets.images.back} resizeMode='contain'
                style={styles.backIcon} />);
        }
    }
}
const styles = StyleSheet.create({
    headerView: {
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#01579b",
        zIndex: 1
    },
    headerTitleTexts: {
        fontSize: 18,marginTop: 5,color: "#fff",fontFamily: "Montserrat-Medium"
    },headerTitleText: {
        fontSize: 21,
        fontWeight: '600',
        alignSelf: 'center'
    },
    headerTitleTextMain: {
        backgroundColor: "#ccc",fontSize: 28,fontWeight: "900"
    },
    backButtonView: {
        position: 'absolute',
        left: 0,
        padding: 20
    },
    rightButtonView: {
        position: 'absolute',
        right: 0
    },
    backIcon: {
        width: 30,
        height: 30,
        tintColor: "white"
    }
})

export default withNavigation(ToolBar);