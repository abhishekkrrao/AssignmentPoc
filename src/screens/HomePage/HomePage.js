import React,{ Component } from 'react';
import { View,Text,Image,FlatList,Platform,TouchableOpacity } from 'react-native';
import GetLocation from 'react-native-get-location'
import assets from '../../assets/index'
import { Dimensions } from 'react-native';
import moment from 'moment';
import getMonth from '../../Util/month';
// import { makeObservable,reaction,observable,observe,computed,autorun,action } from 'mobx';
// import  * as api from '../../Util/api';
import { check,PERMISSIONS,RESULTS,requestMultiple } from 'react-native-permissions';
import getUrl from '../../Util/url';
const width = Dimensions.get('window').width;
import { create } from 'apisauce'
const api = create({
    baseURL: '',
    headers: { Accept: 'application/json' },
});
const latitude = "26.4832";
const longitude = "84.436";
class HomePage extends Component {
    value
    constructor(props) {
        super(props);
        this.state = { latitude: "",longitude: "",data: {},isloading: false,current: "",currentTemp: "" }
    }
    render() {
        return (
            <View style={{ flex: 1,backgroundColor: "#4dd0e1" }}>

                <View style={{ padding: 20,flex: 1,justifyContent: "center" }}>
                    {!this.state.isloading && <Image
                        style={{ width: 96,height: 96,borderRadius: 96,alignSelf: "center",backgroundColor: "#ffd54f" }}
                        source={assets.images.loader} />}
                    {this.state.data && this.state.data.city && this.state.data.city.name && <Text
                        style={{ textAlign: "center",color: "#fff",fontSize: 29,paddingTop: 35,fontFamily: "montserrat" }}>
                        {this.state.data.city.name}</Text>}

                    {this.state.isloading && <View style={{ flex: 1 }}>
                        <View style={{ justifyContent: "center",flex: 1 }}>

                            {this.state.currentTemp && <Text
                                style={{ textAlign: "center",color: "#fff",fontSize: 39,fontFamily: "montserrat" }}>
                                {this.convertKelvintoCelcious(this.state.currentTemp) + " °C"}</Text>}

                            <Image
                                style={{ width: 196,height: 196,borderRadius: 96,alignSelf: "center" }}
                                source={assets.images.day}></Image>


                        </View>
                    </View>}



                </View>

                {this.state.isloading && <FlatList
                    horizontal={true}
                    style={{
                        height: 100,
                        position: "absolute",bottom: 20,left: 15,elevation: 5
                    }}
                    numColumns={1}
                    extraData={this.state}
                    data={this.state.data.list}
                    renderItem={({ item,index }) => {
                        return this.singleView(item,index)
                    }}
                    keyExtractor={({ index }) => index + '' + new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
                />}
            </View>
        );
    }

    singleView = (item,index) => {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,backgroundColor: "#ffd54f",
                    elevation: 5,marginTop: 5,borderRadius: 66,
                    justifyContent: "center",width: width / 5.6,marginEnd: 5,height: 70
                }}
                onPress={() => {
                    this.props.navigation.navigate('PlayList')
                }}>
                <View
                    style={{
                        flex: 1,paddingTop: 5,justifyContent: "center"
                    }}>
                    <Text style={{ textAlign: "center",fontSize: 9,color: "red",fontFamily: "montserrat" }}>
                        {"" + this.getLocaletime(item.dt)}</Text>

                    <Text style={{ textAlign: "center",fontSize: 9,paddingTop: 5,fontFamily: "montserrat" }}>
                        {" " + this.convertKelvintoCelcious(item.main.temp) + " °C"}</Text>
                    <Text style={{ textAlign: "center",fontSize: 9,paddingTop: 5,fontFamily: "montserrat" }}>
                        {"" + this.getDate(item.dt_txt)}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    componentDidMount() {
        this.checkPermission();
        this.getCurrentLocation();
    }

    getCurrentLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then(location => {
            console.log(location);
            this.setState({
                latitude: location.latitude,
                longitude: location.longitude
            },() => {

                this.apiCall(getUrl(this.state.latitude,this.state.longitude))


            });


        }).catch(error => {
            const { code,message } = error;
            console.warn(code,message);

            this.apiCall(getUrl(latitude,longitude))


        });
    }
    getDate = (date) => {
        let formatted = moment(date).date() + "-" + getMonth(moment(date).month() + 1);
        return formatted;
    }
    getLocaletime = (time) => {
        return moment(new Date(time * 1000)).format('LT');
    }
    convertKelvintoCelcious = (kelvin) => {
        let k = parseFloat(kelvin).toFixed(2);
        let c = k - 273.15;
        return c.toFixed(2);
    }
    apiCall = (url) => {
        // console.log("url ",url)
        try {
            api
                .get(url)
                .then((response) => {
                    // console.log(response);
                    this.setState({ data: response.data },() => {
                        // console.log(this.state.data);
                        {
                            this.state.data.list && this.state.data.list.length > 0 ? this.setState({
                                current: this.state.data.list[0].dt_txt,
                                currentTemp: this.state.data.list[0].main.temp
                            },() => { }) : ""
                        }
                        setTimeout(() => { this.setState({ isloading: true }) },1000);
                    });

                })
                .then(console.log)

        } catch (errors) {

        }
    }

    checkPermission = () => {
        if (Platform.OS == "ios") {
            check(PERMISSIONS.IOS.LOCATION_ALWAYS)
                .then((result) => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            console.log('This feature is not available (on this device / in this context)');
                            break;
                        case RESULTS.DENIED:
                            requestMultiple([PERMISSIONS.IOS.LOCATION_ALWAYS])
                                .then((perm) => {
                                    console.log("perm ",perm);
                                })
                                .catch((issue) => {
                                    console.log("issue ",issue);
                                })
                            console.log('The permission has not been requested / is denied but requestable');
                            break;
                        case RESULTS.LIMITED:
                            console.log('The permission is limited: some actions are possible');
                            break;
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            break;
                        case RESULTS.BLOCKED:
                            console.log('The permission is denied and not requestable anymore');
                            break;
                    }
                })
                .catch((error) => {

                });
        } else if (Platform.OS == "android") {
            check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                .then((result) => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            console.log('This feature is not available (on this device / in this context)');
                            break;
                        case RESULTS.DENIED:
                            console.log('The permission has not been requested / is denied but requestable');
                            break;
                        case RESULTS.LIMITED:
                            console.log('The permission is limited: some actions are possible');
                            break;
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            break;
                        case RESULTS.BLOCKED:
                            console.log('The permission is denied and not requestable anymore');
                            break;
                    }
                })
                .catch((error) => {

                });
        }



    };
}

export default HomePage;