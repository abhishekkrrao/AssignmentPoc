import React,{ Component } from 'react';
import { View,StyleSheet,Button } from 'react-native'
import Video from 'react-native-video';
class VideoPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            video: "",
            isloading: false
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>



                <Video
                    source={{ uri: this.state.video }}
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
        const { params } = this.props.navigation.state;
        console.log(params.item);
        if (params && params.item) {
            this.setState({
                video:params.item.video
            },() => { });
        }
    }
    videoError = (issue) => {
        console.log("issue ",issue)
    }
    onBuffer = (buffering) => {
        // console.log("buffering ",buffering)
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