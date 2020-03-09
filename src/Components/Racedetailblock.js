import React from 'react'

class Racedetailblock extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
    render() {
        const list = this.props.list;
        const pushme = [];
        const pushmeTwo = [];
        const pushmeThree = [];
        const pushmeFour = [];
        const pushmeFive = [];
        const pushmeSix = [];
        if (!list.trip_stop.forward){
            return (<div></div>);
        }else{
            return (
                <div  className="detailsShow" style={{display: list.showDateil ? 'flex' : 'none', padding: '10px' }}>
                    {/* <div className="col flex"> */}
                        
                        <div className="detailsShowX"><p id="bold">Отправление<br/>(местное время)</p><br/>
                             {
                                list.trip_stop.forward.map((el, i) => {                                                            
                                    el.route.map((listen, ii) => {
                                    pushme.push(listen);            
                                })
                                })
                            }                        

                            {pushme.map((el, kkey) => {
                                    if (el.city !== "") {
                                        return (<div className="stationBlock" key={kkey}>
                                            <div className="imgBlock">
                                                <div className="imgClass">
                                                </div>
                                                <div className="imgClassBot">
                                                </div>
                                            </div>
                                            <div>
                                                <p className="nameCityStation">{el.stArrName}  {el.stAddr} <br/></p>
                                                <p style={{display: el.descript ? 'block' : 'none'}} >({el.descript})</p>                                                                                               
                                                <span style={{}}></span>
                                                <p className="botStation"> {el.timeDep} </p>
                                                <span className="botStation"></span>
                                            </div>
                                        </div>)
                                    }
                                }
                            )}
                        </div>
                        {/* </div> */}
                        <div>
                        <div className="busStyle"><p id="bold"><img src="https://img.icons8.com/wired/30/000000/bus.png"/> Автобус:</p></div>
                        <div className="busStyle">
                             {
                                list.trip_stop.forward.map((el, i) => {                                                            
                                    pushmeFive.push(el.info);
                                })
                            }                        

                            {pushmeFive.map((el, kkey) => {
                                    if (el.city !== "") {
                                        return (<div key={kkey}>                                                    
                                    <p>{el.bus}</p>                                                
                                        </div>)
                                    }
                                }
                            )}
                        </div>

                        
                        <div style={{display: list.trip_stop.forward[0].info.comfort ? 'block' : 'none' }}><p id="bold"><img src="https://img.icons8.com/android/30/000000/wifi-logo.png" />Условия на рейсе:</p></div>
                        <div>
                             {
                                list.trip_stop.forward.map((el, i) => {                                                            
                                    pushmeSix.push(el.info);
                                })
                            }                        

                            {pushmeSix.map((el, kkey) => {
                                    if (el.city !== "") {
                                        return (<div key={kkey}>                                                    
                                    <p>{el.comfort}</p>                                                
                                        </div>)
                                    }
                                }
                            )}
                        </div><br/><br/>
                
                        <div style={{display: list.trip_stop.forward[0].regular ? 'block' : 'none' }}><p id="bold"><img src="https://img.icons8.com/dotty/30/000000/calendar-16.png" />Регулярность рейса:</p></div>        
                        <div>      

                             {                                            
                                    list.trip_stop.forward.map((el, i) => {  
                                        if (list.trip_stop.forward[0].regular.days){                                                                                                  
                                        el.regular.days.map((listen, ii) => {                                            
                                                pushmeFour.push(listen['name']);                                         
                                    })  
                                } else{
                                    pushmeFour.push(el.regular);
                                }                                                                       
                                    })                                                                                 
                                
                            }                        
                        
                            {pushmeFour.map((el, kkey) => {
                                    if (list.trip_stop.forward[0].regular.days) {
                                        return (<div key={kkey} style={{float:'left'}}>       
                                    <p>{el}. </p>                                               
                                        </div>)
                                    }
                                    else{
                                        return (<div key={kkey}>       
                                            <p>{el.name}</p>                                                
                                                </div>)
                                    }                                   
                                }
                            )}
 
                        </div><br/><br/>     


                        <div style={{display: list.trip_stop.forward[0].info.discount ? 'block' : 'none' }}><p id="bold"><img src="https://img.icons8.com/pastel-glyph/30/000000/get-a-discount.png" />Скидки:</p></div>
                        <div>
                             {
                                 list.trip_stop.forward[0].info.discount ?
                                list.trip_stop.forward.map((el, i) => {                                                            
                                    el.info.discount.map((listen, ii) => {
                                        pushmeTwo.push(listen);
                                    });
                                })
                                : ''
                            }                        

                            {pushmeTwo.map((el, kkey) => {
                                    if (el.city !== "") {
                                        return (<div key={kkey}>       
                                            <p>{el}</p>                                                
                                        </div>)
                                    }
                                }
                            )}
                        </div><br/><br/>


                        <div><p id="bold"><img src="https://img.icons8.com/dotty/30/000000/return-purchase.png" />Условия возврата билета:</p></div>
                        <div>
                             {
                                 list.trip_stop.forward.map((el, i) => { 
                                el.info.refund.map((listen, ii) => {
                                    pushmeThree.push(listen);
                                })
                                })
                            }                        

                            {pushmeThree.map((el, kkey) => {
                                    if (el.city !== "") {
                                        return (<div key={kkey}>       
                                            <li>{el}</li>                                                
                                        </div>)
                                    }
                                }
                            )}
                        </div><br/><br/>  
                        </div>                          

                </div>
                                
                );
        }
    }
}
export default Racedetailblock;


// import React from 'react'

// class Racedetailblock extends React.Component {
//     // eslint-disable-next-line no-useless-constructor
//     constructor(props){
//         super(props);
//     }
//     render() {
//         const list = this.props.list;
//         const pushme = [];
//         if (!list.trip_stop.forward){
//             return (<div></div>);
//         }else{
//             return (
//                 <div  className="detailsShow" style={{display: list.showDateil ? 'block' : 'none' }}>
//                     <div className="col flex">
//                         <div><p>Отправление<br/>(местное время)</p></div>
//                         <div>



//                             {
//                                 list.trip_stop.forward.map((el, i) => {
//                                     console.log(el.route[0].city);

//                                     el.route.map((listen, ii) => {
//                                         console.log('asd'+listen);
//                                         pushme.push(listen);

//                                     });
//                                 })

//                             }
//                             {pushme.map((el, kkey) => {
//                                     if (el.city !== "") {
//                                         return (<div className="stationBlock" key={kkey}>
//                                             <div className="imgBlock">
//                                                 <div className="imgClass">
//                                                 </div>
//                                                 <div className="imgClassBot">

//                                                 </div>

//                                             </div>
//                                             <div>
//                                                 <p className="nameCityStation"> {el.city} </p>
//                                                 <span style={{}}></span>
//                                                 <p className="botStation"> {el.timeDep} </p>
//                                                 <span className="botStation"></span>
//                                             </div>
//                                         </div>)
//                                     }
//                                 }
//                             )}
//                         </div>
//                     </div>
//                 </div>);
//         }

//     }
// }
// export default Racedetailblock;