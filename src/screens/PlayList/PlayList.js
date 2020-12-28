import React,{ Component } from 'react';
import { View,TouchableOpacity,Image,Text,FlatList } from 'react-native';
import Video from 'react-native-video';
import ToolBar from '../../Component/ToolBar'
class PlayList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        let list = [{ video: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",title: "Play 1" },
        { video: "https://content.jwplatform.com/manifests/yp34SRmf.m3u8",title: "Play 2" },
        { video: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",title: "Play 3" }];
        this.setState({ list: list },() => { });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ToolBar style={{ backgroundColor: "#4ba3c7" }} title="Play List"></ToolBar>
                <FlatList
                    horizontal={false}
                    style={{ flex: 1,marginTop: 2 }}
                    numColumns={1}
                    extraData={this.state}
                    data={this.state.list}
                    renderItem={({ item,index }) => {
                        return this.singleItem(item,index)
                    }}
                    keyExtractor={({ index }) => index + '' + new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
                />
            </View>
        );
    }

    singleItem = (item,index) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('VideoPlayer',{ item: item })
                }}
                style={{
                    height: 120,backgroundColor: "#fff",
                    marginTop: 5,justifyContent: "center",
                    marginEnd: 5,marginLeft: 5,borderRadius: 5
                }}>
                <View
                    style={{
                        flexDirection: "row",marginLeft: 5
                        ,marginTop:10
                    }}>
                    <Video
                        style={{ height:96 ,width:96}}
                        source={{ uri: item.video }}
                        controls={false}
                        muted={true}
                    />
                    <Text
                        style={{ color: "#000",alignSelf: "center",marginLeft: 55 }}
                    >{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default PlayList;