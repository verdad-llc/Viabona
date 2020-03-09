import React from 'react'
import Moment from "react-moment";
import Racedetailblock from "./Racedetailblock";

class Raceblock extends React.Component{
    constructor(props){
        super(props);
    }
    render(){

        return(
            <div key={key} className="blockShow" >
                {/*//новый блок для вывода*/}
                <div className="showBlock" style={{display: this.state.blockShow}}>
                    <div className='upShowBlock'>
                        <div className='oneGridForShow'>
                            <div className='upOneGridForShow'>
                                <p className="timeShow">
                                    <Moment format="HH:MM" withTitle>
                                        {list.dtDep}
                                    </Moment>
                                </p>
                                <div className="dataShow"> <Moment format="D MMM" withTitle>
                                    {list.dtDep}
                                </Moment></div>
                                <div className="timeInRoad">{list.wayTimeH} ч {list.wayTimeM} мин. в пути</div>
                            </div>
                            <div className='upTwoGridForShow'>
                                <p className="cityName">{list.stDepName}</p>
                                <br/>
                                <p>{list.stDepAddr}</p>
                            </div>
                        </div>
                        <div className='twoGridForShow'>
                            <div className='upOneGridForShow'>
                                <p className="timeShow">
                                    <Moment format="HH:MM" withTitle>
                                        {list.dtArr}
                                    </Moment>
                                </p>
                                <div className="dataShow"> <Moment format="D MMM" withTitle>
                                    {list.dtArr}
                                </Moment></div>
                            </div>
                            <div className='upTwoGridForShow'>
                                <p className="cityName">{list.stArrName}</p>
                                <br/>
                                <p>{list.stArrAddr}</p>
                            </div>
                        </div>
                        <div className='threeGridForShow'>
                            <div className='leftShowBlock'>
                                <p className='textPrice' style={{float: 'right'}}>{list.price} {list.currName}</p>
                            </div>
                            <div className='rightShowBlock'>
                                <button className="butTic" onClick={() => this.showByTic(list.price, list.currency, list.racename, list.dtArr, list.stArrName, list.dtDep, list.stDepAddr, this.state.passengers, list.currName, list.id, list.tripId)}>Выбрать</button>
                                <br/>
                                <p className='textPass' style={{color: '#D50707'}}>{list.places} мест</p>
                            </div>
                        </div>
                    </div>
                    <div className='botShowBlock'>
                        <div className="col-md-2"><p className="trip__details__down" onClick={this.infoBlock(key)} style={{color: 'red'}}>Детали рейса</p></div>
                        <p style={{paddingBottom: "10px"}}>Перевозчик: {list.racename}.        Автобус: {list.backBusName}</p>
                    </div>

                </div>
                {list.showDateil ?
                    <Racedetailblock list={list}/>

                    :
                    null
                }
                {/*end new show*/}
            </div>
        );
    }
}
export default Raceblock;