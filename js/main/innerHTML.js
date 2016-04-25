function innerHTMLonPallet(element,place,length,cost,address){
    element.innerHTML=  
                "<div hidden class=length title =" +
                length +
                "></div>"+

                "<div hidden class=cost title=" +
                cost +
                "></div>"+

                "<div hidden class=address title="+
                address +
                "></div>"+

                place +

                "<br>"+

                length +
                "時間   " +

                cost +
                "円" +
                "<button" +
                " onclick='deleteSchedule(this)'>削除</button>"+

                "<button" +
                " onclick='editSchedule(this)'>編集</button>" 

                ;
}

function innerHTMLofRecommend(element,place,length,cost,address,website){
    element.innerHTML=  
                "<div hidden class=length title =" +
                length +
                "></div>"+

                "<div hidden class=cost title=" +
                cost +
                "></div>"+

                "<div hidden class=address title="+
                address +
                "></div>"+

                "<a href='" + 

                website + 

                "' style='color:black;' target='_blank'>"+

                place +

                "</a>" + 

                "<br>"+

                 length +
                "時間   " +

                cost +
                "円" +
                "<button" +
                " onclick='deleteSchedule(this)'>削除</button>"+

                "<button" +
                " onclick='editSchedule(this)'>編集</button>" 

                ;
}

function innerHTMLonSchedule(element,parent,place,length,cost,address){
    element.innerHTML=  
                "<div hidden class=length title=" +
                length +
                "></div>"+

                "<div hidden class=cost title=" +
                cost +
                "></div>"+

            
                "<div hidden class=address title=" +
                address +
                "></div>"+

                place +

                "<br>"+

                 Math.floor(Number(parent.id)/number_of_days)  +
                "時〜" +

                Math.floor(Number(parent.id)/number_of_days + Number(length)) +
                "時　" +

                cost +
                "円"+

                "<button" +
                " onclick='deleteSchedule(this)'>削除</button>"+

                "<button" +
                " onclick='editSchedule(this)'>編集</button>"
                ;
}

function innerHTMLofReservedSchedule(element,parent,place,length,cost,address){
    element.innerHTML=  
                "<div hidden class=length title=" +
                length +
                "></div>"+

                "<div hidden class=cost title=" +
                cost +
                "></div>"+

                
                "<div hidden class=address title=" +
                address +
                "></div>"+

                place +

                "<br>"+
                    
                 length +
                "時間(" +

                 Math.floor(Number(parent.id)/number_of_days)  +
                "時〜" +

                Math.floor(Number(parent.id)/number_of_days + Number(length)) +
                "時)   " +

                cost +
                "円"+

                "<button" +
                " onclick='deleteSchedule(this)'>削除</button>"

                ;
}
function innerHTMLofHotel(element,place,span,start_time,end_time,cost){
    element.innerHTML=  
                "<div hidden class=length title=" +
                span +
                "></div>"+

                "<div hidden class=cost title=" +
                cost +
                "></div>"+
                
                "<div hidden class=address title='null'></div>"+

                place +

                "<button" +
                " onclick='deleteSchedule(this)'>削除</button>"+

                "<br>"+
                    
                "in:" +
                start_time  +
                "時" +
                "out:" +
                end_time +
                "時" +

                cost +
                "円/人"


                ;
}
function innerHTMLofReservedTransfer(element,parent,name,length,cost,departure_place,arrival_place){
    element.innerHTML=  
                "<div hidden class=length title=" +
                length +
                "></div>"+

                "<div hidden class=cost title=" +
                cost +
                "></div>"+

                
                "<div hidden class=departure_place title=" +
                departure_place +
                "></div>"+

                "<div hidden class=arrival_place title=" +
                arrival_place +
                "></div>"+

                name +
                "<button" +
                " onclick='deleteTransfer(this)'>削除</button>"+
                "<br>"+
            
                departure_place +
                "〜"+
                arrival_place +

                "<br>"+
                    
                 length +
                "時間(" +

                 Math.floor(Number(parent.id)/number_of_days)  +
                "時〜" +

                Math.floor(Number(parent.id)/number_of_days + Number(length)) +
                "時)   " +

                cost +
                "円"
                ;
}