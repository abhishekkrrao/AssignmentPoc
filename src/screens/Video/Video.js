import React,{ Component } from 'react';
import { View,StyleSheet,Button } from 'react-native'
import Video from 'react-native-video';
class VideoPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            v1: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
            v2: "https://content.jwplatform.com/manifests/yp34SRmf.m3u8",
            v3: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
            isloading:false
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>

                <Button
                    onPress={() => { }}
                    title="*">

                </Button>

                <Video
                    source={{ uri: this.state.v1 }}
                    ref={(ref) => {
                        this.player = ref
                    }}
                    onBuffer={this.onBuffer}
                    onError={this.videoError}
                    controls={true}
                    paused={false}
                    fullscreen={false}
                    resizeMode="cover"
                    style={styles.backgroundVideo} />


            </View>
        );
    }
    componentDidMount() {

    }
    videoError=(issue)=>{
        console.log("issue ",issue)
    }
    onBuffer=(buffering)=>{
        console.log("buffering ",buffering)
    }
}
var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
export default VideoPlayer;