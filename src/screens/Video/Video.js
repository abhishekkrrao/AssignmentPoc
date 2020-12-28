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
            isloading: false,
            v1: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
            v2: "https://content.jwplatform.com/manifests/yp34SRmf.m3u8",
            v3: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",

        }
    }
    render() {
        return (
            <View
            style={{flex:1,backgroundColor: "#000"}}>
                <ToolBar  style={{backgroundColor:"#4ba3c7"}} title="Video Player"></ToolBar>
                <View style={{ flex: 1,justifyContent: "center" }}>
                    {this.state.v1 &&
                        <Video
                            source={{ uri: this.state.v1 }}
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

                <View style={{ flex: 1,justifyContent: "center" }}>
                    {this.state.v1 &&
                        <Video
                            source={{ uri: this.state.v2 }}
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

                <View style={{ flex: 1,justifyContent: "center" }}>
                    {this.state.v1 &&
                        <Video
                            source={{ uri: this.state.v3 }}
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
        // const { params } = this.props.navigation.state;
        // console.log(params.item);
        // if (params && params.item) {
        //     this.setState({
        //         video: params.item.video
        //     },() => { });
        // }
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