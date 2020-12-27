import React,{ Component } from "react";
import { StyleSheet,View,ActivityIndicator ,Image} from "react-native";
import assets from '../../assets/index'
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },

});
class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <ActivityIndicator size="large" color="#4ba3c7" /> */}
        {<Image
          style={{ width: 96,height: 96,borderRadius: 96,alignSelf: "center",backgroundColor:"#ffd54f" }}
          source={assets.images.loader} />}
      </View>
    );
  }
}
export default Loading;