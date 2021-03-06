import React from 'react'

class Racedetailblockback extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const list = this.props.list;
        const pushme = [];
        if (!list.trip_stop_back.backward){
            return (<div></div>);
        }else {
            return (
                <div className="detailsShow" style={{display: list.showDateil2 ? 'block' : 'none', paddingTop: '30px'}}>
                    <div className="col flex">
                        <div><p>Отправление<br/>(местное время)</p></div>
                        <div>
                            {
                                list.trip_stop_back.backward.map((el, i) => {
                                    console.log(el.route[0].city);
                                    el.route.map((listen, ii) => {
                                        console.log(listen.city);
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
export default Racedetailblockback;