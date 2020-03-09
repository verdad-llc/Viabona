import React from 'react'

class Racedetailblocktwo extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
    render() {
        const list = this.props.list;
        const pushme = [];
        if (!list.trip_stop.forward){
            return (<div></div>);
        }else{
            return (
                <div  className="" style={{display: 'block'}}>
                    <div className="col flex">
                        <div><p>Отправление<br/>(местное время)</p></div>
                        <div>



                            {
                                list.trip_stop.forward.map((el, i) => {
                                    console.log(el.route[0].city);

                                    el.route.map((listen, ii) => {
                                        console.log('asd'+listen);
                                        pushme.push(listen);

                                    });
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
                                                <p className="nameCityStation"> {el.city} </p>
                                                <span style={{}}></span>
                                                <p className="botStation"> {el.timeDep} </p>
                                                <span className="botStation"></span>
                                            </div>
                                        </div>)
                                    }
                                }
                            )}
                        </div>
                    </div>
                </div>);
        }

    }
}
export default Racedetailblocktwo;