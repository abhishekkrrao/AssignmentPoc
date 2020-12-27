import key from '../Util/apikey';
const getUrl=(latitude,longitude)=>{
    return "https://api.openweathermap.org/data/2.5/forecast?lat="+
    latitude+"&lon="+longitude+"&appid="+key;
}
export default getUrl;