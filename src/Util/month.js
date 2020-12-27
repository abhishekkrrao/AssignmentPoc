const getMonth=(m)=>{
    let value = ""
    if(m==12){
    value = "Dec"
    }else if(m==11){
    value = "Nov"
    }else if(m==10){
    value = "Oct"
    }else if(m==9){
    value = "Sep"
    }else if(m==8){
    value = "Aug"
    }else if(m==7){
    value = "Jul"
    }else if(m==6){
    value = "Jun"
    }else if(m==5){
    value = "May"
    }else if(m==4){
    value = "Apr"
    }else if(m==3){
    value = "Mar"
    }else if(m==2){
    value = "Feb"
    }else if(m==1){
    value = "Jan"
    }
      return value;
    }
    export default getMonth;