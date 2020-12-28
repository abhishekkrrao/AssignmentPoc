import React,{ Component } from 'react';
import { View,StyleSheet,Button } from 'react-native'
import Video from 'react-native-video';
import Loading from '../Loading/Loading'
import ToolBar from '../../Component/ToolBar'
class VideoPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            video: undefined,
            isloading: false
        }
    }
    render() {
        return (
            <View
            style={{flex:1,backgroundColor: "#000"}}>
                <ToolBar  style={{backgroundColor:"#4ba3c7"}} title="Video Player"></ToolBar>
                <View style={{ flex: 1,justifyContent: "center" }}>

                    {this.state.video &&

                        <Video
                            source={{ uri: this.state.video }}
                            ref={(ref) => {
                                this.player = ref
                            }}
                            onBuffer={this.onBuffer}
                            onError={this.videoError}
                            onProgress={this.onProgress}
                            controls={true}
                            paused={false}
                            onEnd={this.onEnd}
                            fullscreen={false}
                            resizeMode="contain"
                            style={styles.backgroundVideo} />}

                </View>
            </View>
        );
    }
    componentDidMount() {
        const { params } = this.props.navigation.state;
        console.log(params.item);
        if (params && params.item) {
            this.setState({
                video: params.item.video
            },() => { });
        }
    }
    videoError = (issue) => {
        console.log("issue ",issue)
    }
    onBuffer = (buffering) => {
        // console.log("buffering ",buffering)
    }
    onBuffer = (buffering) => {
        // console.log("buffering ",buffering)
    }
    onProgress = (data) => {
        //  console.log("data ",data)
    }
    onEnd() {
        // this.props.navigation.goBack();
    }
}
var styles = StyleSheet.create({
    backgroundVideo: {
     position:"absolute",
     left:0,
     right:0,
     top:0,
     bottom:0
    },
});
export default VideoPlayer;