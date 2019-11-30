import React from 'react';
import { Lines } from 'react-preloaders';
import Moment from 'react-moment';
import 'moment-timezone';
import '../Styles/style.css';
import '../Styles/styleShowBlock.css';
import '../Styles/teststyle.css';
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/ru';

import 'moment/min/moment-with-locales'
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import Switch from "react-switch";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import App from "../App";


class Finder extends React.Component{
    constructor(props){

        super(props);
        this.state = { showMe:true};
        this.state = {
            from : 'Киев',
            fromID : 2,
            displayLogin : 'none',
            errorLogin : '',
            //error block
            erLogin : 'errorLoginNone',
            erPassword : 'errorPasswordNone',
            erSurname: 'errorSurnameNone',
            erName:'errorNameNone',
            erEmail: 'errorEmailNone',
            erPhone:'errorPhoneNone',
            //end error
            toID : 1,
            minusone : new Date(),
            value : '',
            testValue : '',
            visibleCalendar : 'none',
            direct : false,
            goback : false,
            loading: true,
            to : 'Варшава',
            displayCalendar : 'none',
            showByTic: 'none',
            blockShow: 'block',
            on : new Date(),
            passengers : '1',
            cityList: [],
            tripList: [],
            dataCalendar: [],
            //data for register
            login: "",
            password:"",
            surname:"",
            nameTest:"",
            email:"",
            phone:"",
            //end data for register
            //data gor auth
            loginAuth: "",
            passwordAuth: "",
            erAuth: "erAuthNone",
            //end data for auth
            showSign:true,
            showReg:false,
            showBlockNone: false,
            loadingTwo: false,
            NameUser: "Вход/Регистрация",
            sessionUserActiv: [],
            //переменные для сесии
            nameS: "",
            surnameS: "",
            emailS: "",
            phoneS: "",
            //end session
            arrTic: {},
            arrBy: {},
            infForLiq: [],
            priceBy: '',
            currNameBy: '',
            resErrorRace: false,
            tripInfForBy: '',
            stDepAddrInfForBy: '',
            stArrNameInfForBy: '',
            DepInfForBy: '',
            ArrInfForBy: '',



        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displayCalendar = this.displayCalendar.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleReverseCities = this.handleReverseCities.bind(this);
        this.handleDirectChange = this.handleDirectChange.bind(this);
        this.handleGoBackChange = this.handleGoBackChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        //this.handClickTest = this.handClickTest.bind(this);
        this.testFunction  = this.testFunction.bind(this);
        this.signFunction = this.signFunction.bind(this);
        this.regFunction  = this.regFunction.bind(this);
        this.subDataForReg = this.subDataForReg.bind(this);
        this.subDataForAuth = this.subDataForAuth.bind(this);
        this.showBlockRegister = this.showBlockRegister.bind(this);
        this.passInp = this.passInp.bind(this);
        this.sessionUser = this.sessionUser.bind(this);
        this.dataSessionUser = this.dataSessionUser.bind(this);
        this.deleteLocal = this.deleteLocal.bind(this);
        //заказ билета
        this.nameS = this.nameS.bind(this);
        this.surnameS = this.surnameS.bind(this);
        this.emailS = this.emailS.bind(this);
        this.phoneS = this.phoneS.bind(this);
        this.showByTic = this.showByTic.bind(this);
        this.backStup =  this.backStup.bind(this);
        this.PayArr = this.PayArr.bind(this);
        this.loadin = this.loadin.bind(this);
        // this.manageDay = this.manageDay.bind(this);
        //this.handleSelectTrip = this.handleSelectTrip.bind(this);

    }
    PayArr(name, surname, email, phone) {
        let arrBy = this.state.arrBy;
        arrBy.name = name;
        arrBy.surname = surname;
        arrBy.email = email;
        arrBy.phone = phone;

            let infForLiq1 = this.state.infForLiq;
            infForLiq1.arrBy = arrBy;
            infForLiq1.arrTic = this.state.arrTic;
        console.log(this.state.infForLiq);
    }
    backStup(){
        this.setState({
            showByTic: 'none',
            blockShow: 'block'
        })
    }
    showByTic(price, currency, trip, dtArr, stArrName, dtDep, stDepAddr, pass, currName){
        this.setState({
            showByTic: 'block',
            blockShow: 'none'
        });
        let arrUser = this.state.arrTic;
        arrUser.price = price;
        arrUser.currency = currency;
        arrUser.trip = trip;
        arrUser.dtArr = dtArr;
        arrUser.stArrName = stArrName;
        arrUser.dtDep = dtDep;
        arrUser.stDepAddr = stDepAddr;
        arrUser.passengers = pass;
        arrUser.currName = currName;
        this.setState({
            priceBy: price * pass,
            currNameBy: currName,
            tripInfForBy: trip,
            stDepAddrInfForBy: stDepAddr,
            stArrNameInfForBy: stArrName,
            DepInfForBy: dtDep,
            ArrInfForBy: dtArr

        })

        // this.setState({
        //     arrTic: arrUser,
        // })
        // arrUser.name = this.state.nameS;
        // arrUser.surname = this.state.surnameS;
        // arrUser.email = this.state.emailS;
        // arrUser.phone = this.state.phoneS;


        console.log(this.state.arrTic);
    }
    nameS(el){
            this.setState({nameS: el.target.value});
    }
    surnameS(el){
        this.setState({surnameS: el.target.value});
    }
    emailS(el){
        this.setState({emailS: el.target.value});
    }
    phoneS(el){
        this.setState({phoneS: el.target.value});
    }

    deleteLocal() {

        localStorage.removeItem("name");
        localStorage.removeItem("surname");
        localStorage.removeItem("email");
        localStorage.removeItem("phone");
        this.setState({
            nameS: "",
            surnameS: "",
            emailS: "",
            phoneS: ""
        })

    }

    passInp(data) {
        let temp_pas = this.state.passengers;
        temp_pas = parseInt(temp_pas)+parseInt(data);
        if (temp_pas == 0){
            temp_pas = 1;
        }
        this.setState({passengers: temp_pas});
        // if(this.state.passengers > 1) {
        //     this.setState({
        //         passengers: this.state.passengers + data,
        //     })
        // } else {
        //     this.setState({
        //         passengers: '1',
        //     })
        // }



    }
    showBlockRegister() {
        this.setState({
            showBlockNone: !this.state.showBlockNone
        })
    }
    subDataForReg() {
        let canSentForm = true;
        this.setState({
            erLogin : 'errorLoginNone',
            erPassword : 'errorPasswordNone',
            erSurname: 'errorSurnameNone',
            erName:'errorNameNone',
            erEmail: 'errorEmailNone',
            erPhone:'errorPhoneNone',
        });

        if (this.state.login.length < 5) {
            canSentForm = false;
            this.setState({
                errorLogin: 'blabla',
                displayLogin: 'block',
                erLogin: 'errorLogin',
            });
        }
        if(this.state.password.length < 8 ) {
            canSentForm = false;
            this.setState({
                erPassword: 'errorPassword',
            });
        }
        if(this.state.surname.length < 4 ) {
            canSentForm = false;
            this.setState({
                erSurname: 'errorSurname'
            });
        }
        if(this.state.nameTest.length < 4 ) {
            canSentForm = false;
            this.setState({
                erName: 'errorName'
            });
        }
        if(this.state.email.length < 8 ) {
            canSentForm = false;
            this.setState({
                erEmail: 'errorEmail'
            });
        }
        if(this.state.phone.length < 8 ) {
            canSentForm = false;
            this.setState({
                erPhone:'errorPhone',
            });
        }
        if (canSentForm) {
            axios.get('http://new.viabona.com.ua/api/index.php/api/octobus/buyerreg?login=' + this.state.login + '&password=' + this.state.password + '&surname=' + this.state.surname + '&name=' + this.state.nameTest + '&email=' + this.state.email + '&phone=' + this.state.phone).then(res => {
                console.log(res.data);
            });
            console.log(this.state.login);
        }
    }
    subDataForAuth() {
        let canSentForm = true;

        if (canSentForm){
            axios.get('http://new.viabona.com.ua/api/index.php/api/octobus/buyerlogin?login=' + this.state.loginAuth + '&password=' + this.state.passwordAuth).then(res => {
                console.log(res.data);
                let registered = res.data.registered;
                if(registered === undefined) {
                    this.setState({
                        erAuth: "erAuth"
                        }
                    )
                }
                else {
                    this.setState({
                        showBlockNone: !this.state.showBlockNone,
                        NameUser: "вы вошли как " + res.data.name
                    })
                }
                this.setState({
                    nameTest: res.data.name,
                    surname: res.data.surname,
                    email: res.data.email,
                    phone: res.data.phone
                })
                console.log(this.state.email);

                this.sessionUser();

            });
            console.log(this.state.loginAuth, this.state.passwordAuth);

         };
        // this.sessionUser();

    }

    sessionUser(){
        axios.get('http://new.viabona.com.ua/api/index.php/api/octobus/sessionuser?surname=' +  this.state.surname  + '&name=' +  this.state.nameTest +  '&email=' + this.state.email + '&phone=' + this.state.phone).then(res => {

            // console.log(res.data);
            localStorage.name = res.data.name;
            localStorage.surname = res.data.surname;
            localStorage.email = res.data.email;
            localStorage.phone = res.data.phone;

            this.setState({
                nameS: localStorage.name,
                surnameS: localStorage.surname,
                emailS: localStorage.email,
                phoneS: localStorage.phone
            });
            this.setState({
                NameUser: res.data.name
            });
            this.setState({
                sessionUserActiv : res.data
            });
            // console.log(this.state.sessionUserActiv.name)
        });
    }
    dataSessionUser(){
        axios.get('http://new.viabona.com.ua/api/index.php/api/octobus/sessionuserdata').then(res => {

        console.log(res.data);
            this.setState({
                sessionUserActiv : res.data.name
            });

    });

    }
    signFunction() {
        //alert('hello world');
        this.setState({
            showSign: !this.state.showSign,
            showReg: false
        })
    }
    regFunction() {
        this.setState({
            showSign: false,
            showReg: !this.state.showReg
        })
    }


    handleDayChange(day){
        this.setState({on : day});
    }


    handleReverseCities(){
        let _from = this.state.from;
        let _to = this.state.to;
        let _fromID = this.state.fromID;
        let _toID = this.state.toID;
        this.setState({
            from : _to,
            to : _from,
            fromID : _toID,
            toID : _fromID,
        });
    }

    componentDidMount(){


        axios.get('http://new.viabona.com.ua/api/index.php/api/octobus/getCityList').then(res => {
            this.setState({
                cityList : res.data
            });
        });
        if (localStorage.name){
            this.setState({nameS: localStorage.name});
        }
        if (localStorage.surname){
            this.setState({surnameS: localStorage.surname});
        }
        if (localStorage.email){
            this.setState({emailS: localStorage.email});
        }
        if (localStorage.phone){
            this.setState({phoneS: localStorage.phone});
        }
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(json => {
                this.setState({ loading: false });
            })
            .catch(err => {
                this.setState({ loading: true });
            });
    }

    handleChangeDate(date){
        let newDate = new Date();
        newDate.setDate(this.state.on.getDate() + date);
        this.setState({
            on: newDate
        });
    }

    handleDirectChange(direct){
        this.setState({ direct });
    }

    handleGoBackChange(goback){
        this.setState({ goback });
    }

    handleChange(e) {
       this.setState({[e.target.name]: e.target.value});

    }
    handleSubmit(el){
        this.loadin();

        let direct = this.state.direct ? this.state.direct : 0;
        let on_date = this.state.on;


        let day = on_date.getDate() > 9 ? on_date.getDate() : '0'+on_date.getDate();
        let month = on_date.getMonth()+1;
        let when = on_date.getFullYear() + '-' + month + '-' + day;
        axios.get('http://new.viabona.com.ua/api/index.php/api/octobus/getTrips?direct=' + direct + '&fromID=' + this.state.from + '&toID=' + this.state.to + '&on=' + when + '&passengers=' + this.state.passengers).then(res => {
            console.log(res.data);

            if (!res.data.error){
                this.setState({visibleCalendar : 'block'});
                this.setState({ tripList : res.data});
                let dataCalendarTest = res.data[0].dtArr;
                console.log(dataCalendarTest);
                let arrActive = res.data[0].trip_stop.forward[0].depDates;
                let arrDate = [];
                //все даты
                let allDay = [];
                let allDate = [];
                //даты активные
                // let activeDay = [];
                 let funcDate = function (dataTwoTest) {
                    for (let i=0; i < 7; i++) {

                        let result = new Date(dataTwoTest);
                            arrDate.push(new Date(result.getTime() + ((i - 3) * 86400000)));
                    }

                };
                //функция для извлечения дней из массивов
                let findInArray = function(arrActive, arrDate) {
                    for (let i=0; i < 7; i++) {
                        let arrAll = arrDate[i];

                        let Calendar =  new Date(arrActive[i]);
                        let dayCall = Calendar.getDay();

                        arrAll.getDay();
                        //this.moment().format("YYYY/MM/DD");

                        allDay.push(dayCall);
                      //  if();

                        // if(arrAll) {
                        //
                        // }


                        // let result = new Date(dataTwoTest);
                        // //activeDate = new Date(arrActive[i]);
                        // arrDate.push(new Date(result.getTime() + ((i - 3) * 86400000)));
                        // console.log(arrDate)
                        // //     if (allDate == activeDate) {
                        // //         arrDate.push({'date': allDate, 'active': 1});}
                        // // {
                        // //     arrDate.push({'date': allDate, 'active': 0});}
                    }
                };
                funcDate(dataCalendarTest);
                findInArray(arrActive, arrDate);
                this.setState({
                    dataCalendar : arrDate,
                    resErrorRace: false,
                    showByTic: 'none',
                    blockShow: 'block'
                });


            }else{
                this.setState({
                resErrorRace: true,
                showByTic: 'none',
                blockShow: 'none'
                })
            }
        });


    }
    loadin(){
        this.setState({
            loadingTwo: true
        })
        setTimeout(
            function() {
                this.setState({loadingTwo: false});
            }
                .bind(this),
            5000
        );

    }
    testFunction(el){
        this.setState({on: el});
       this.handleSubmit(el);

    }
    displayCalendar(){
        this.setState({displayCalendar : 'block'});
    }
    // infoBlock()
    // {
    //   this.setState({
    //       showMe: !this.state.showMe
    //   })
    // }
    infoBlock = id => e => {
        console.log(id);
        console.log(e.target.value);
        let _InviteList = this.state.tripList;
        _InviteList[id].showDateil = !_InviteList[id].showDateil;
        this.setState({tripList : _InviteList});
    }

    render() {
        const autoCompleteStyle = {padding: '26px 30px 10px 12px',
        backgroundColor: 'transparent',
        textOverflow: 'ellipsis',
        fontSize: '16px',
        outline: 'none',
        border: 'none'};
        const autoCompleteWrapperStyle = {
            textTransform: 'none',
        padding: '5px 11px',
        color: '#939393',
        fontSize: '17px',
            height: '300px',
            overflowY: 'scroll',
        lineHeight: '30px',
        backgroundColor: '#eee',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px'
        };
        // this.sessionUser();
        const pushme = [];
        let arrayForSession = this.state.sessionUserActiv;



        return(


            <div >

            <div className="mainMainBlock" >
                <div className="myCab" >
                    {localStorage.name ?
                        <div><p className='textCab' style={{ cursor: 'pointer'}} onClick={()=>this.deleteLocal()}>вы вошли как: {localStorage.name}   /  выйти </p></div>
                        :
                        <div><p className='textCab' style={{ cursor: 'pointer'}} onClick={()=>this.showBlockRegister()}>Войти/зарегестрироватся</p></div>}
                </div>

                {/*<p>{this.dataSessionUser()}</p>*/}

            {/*    {*/}
            {/*    this.state.sessionUserActiv.map(function(item, i){*/}
            {/*    console.log('test');*/}
            {/*})}*/}

                {/* форма реестрации*/}
                <div className="blockSign" style={{display: this.state.showBlockNone ? 'block' : 'none'}}>
                    <div >
                        <div >
                            <div >
                                <div className="showSignBlock">
                                    <h4 style={{ cursor: 'pointer'}} onClick={()=>this.signFunction()}>Уже зарегистрированы? Войти</h4>
                                    <div style={{display: this.state.showSign ? 'block' : 'none' }}>
                                        <div className="showSignBlock">
                                            <p className="styleTextUser">Логин</p>
                                            <input className="inputUser" type="text"  name="loginAuth" value={this.state.loginAuth} onChange={this.handleChange}/>
                                            {/*<p style={{display: this.state.displayLogin, color:'red'}}>error login</p>*/}

                                            <p className="styleTextUser">Пароль</p>
                                            <input className="inputUser" type="password" name="passwordAuth" value={this.state.passwordAuth} onChange={this.handleChange}/>
                                            <p className={this.state.erAuth}>Логин или пароль введены не верно</p>

                                            <p  className="styleTextUserSend" onClick={this.subDataForAuth}>авторизироватся</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div >
                            <div className="showSignBlock">
                                <div><span>------------------------или------------------------</span></div>
                                <h4 onClick={()=>this.regFunction()}>Нет аккаунта? Зарегистрироваться</h4>
                                <div  style={{display: this.state.showReg ? 'block' : 'none' }}>
                                <div>
                                    <div className="showSignBlockMain">
                                        <div className="showSignBlock">
                                            <p className="styleTextUser">Логин:</p>
                                            <input placeholder="Логин" type="text" className="inputUser {this.state.errorLogin}" name="login" value={this.state.login} onChange={this.handleChange}/>
                                            <p className={this.state.erLogin}>не коректно введен логин </p>
                                            <p className="styleTextUser">Пароль:</p>
                                            <input  placeholder="Пароль" className="inputUser" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                                            <p className={this.state.erPassword}>не коректный пароль</p>
                                            <p className="styleTextUser">email:</p>
                                            <input placeholder="your@gmail.com" className="inputUser" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                                            <p className={this.state.erEmail}>Введите емеил коректно</p>

                                        </div>
                                        <div className="showSignBlockTwo">
                                            <p  className="styleTextUser">Имя:</p>
                                            <input placeholder="Ваше имя" className="inputUser" type="text" name="nameTest" value={this.state.nameTest} onChange={this.handleChange}/>
                                            <p className={this.state.erName}>Введите имя коректно</p>
                                            <p className="styleTextUser">Фамилия:</p>
                                            <input placeholder="Ваша фамилия" className="inputUser" type="text" name="surname" value={this.state.surname} onChange={this.handleChange}/>
                                            <p className={this.state.erSurname}>Фамилия введена не корректно</p>
                                            <p className="styleTextUser">телефон:</p>
                                            <input placeholder="+38 099-000-00-00" className="inputUser" type="text" name="phone" value={this.state.phone} onChange={this.handleChange}/>
                                            <p className={this.state.erPhone}>Введите мобильный номер корректно</p>
                                        </div>
                                    </div>
                                <div className="classForButSendReg">
                                    {/*<input type="text" value={this.state.login} onChange={(event)=>this.DataForReg(event) => {}} />*/}
                                    <p className="styleTextUserSendReg" onClick={this.subDataForReg}>регистрация</p>
                                </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*    конец блока регистрации*/}
                <div className="fixBox">
                <div className="styleFindBlock">


                <div className="search-form--new">
                    <div className="search-form__group search-form__group--from flex-2 search-form__group--white"
                         style={{display:'block'}}>
                        <div className="">
                            <div style={{position:'relative'}}>
                                <div>
                                    <div className="form-field form-field--has-value" style={{zIndex: '500'}}>
                                        <label className="form-field__label"
                                                htmlFor="from">Откуда</label>
                                        <Autocomplete className="listIndex"
                                            inputProps={{ style: autoCompleteStyle }}
                                            items={this.state.cityList}
                                            shouldItemRender={(item, value) => item.nameCity.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                            getItemValue={item => item.nameCity}
                                            renderItem={(item, highlighted) =>
                                                <div
                                                    key={item.idCity}
                                                    style={{ zIndex: '999000000000000000000000000000', backgroundColor: highlighted ? '#eee' : 'transparent'}}
                                                >
                                                    {item.nameCity}
                                                </div>
                                            }
                                            value={this.state.from}
                                            onChange={e => this.setState({ from: e.target.value })}
                                            onSelect={from => this.setState({ from })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="search-form__group--reverse" onClick={this.handleReverseCities}>
                                <i className="icon icon-reverse text-primary pointer"></i>
                            </div>
                        </div>
                        <div className="next-date direct-switch">
                            <label htmlFor="material-switch">
                                <span>только прямые рейсы</span>
                                <Switch
                                    checked={this.state.direct}
                                    onChange={this.handleDirectChange}
                                    onColor="#86d3ff"
                                    onHandleColor="#2693e6"
                                    handleDiameter={30}
                                    name="direct"
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                    height={20}
                                    width={48}
                                    className="react-switch"
                                    id="material-switch"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="search-form__group search-form__group--white search-form__group--to flex-2"
                         style={{display:'block'}}>
                        <div className="">
                            <div style={{position:'relative'}}>
                                <div>
                                    <div className="form-field form-field--has-value" style={{zIndex: '490'}}>
                                        <label className="form-field__label"
                                               htmlFor="to">Куда</label>
                                        <Autocomplete
                                            inputProps={{ style: autoCompleteStyle }}
                                            items={this.state.cityList}
                                            shouldItemRender={(item, value) => item.nameCity.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                            getItemValue={item => item.nameCity}
                                            renderItem={(item, highlighted) =>
                                                <div
                                                    key={item.idCity}
                                                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                                                >
                                                    {item.nameCity}
                                                </div>

                                            }
                                            value={this.state.to}
                                            onChange={e => this.setState({ to: e.target.value })}
                                            onSelect={to => this.setState({ to })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="next-date direct-switch">
                            <label htmlFor="material-switch">
                                <span>в обе стороны</span>
                                <Switch
                                    checked={this.state.goback}
                                    onChange={this.handleGoBackChange}
                                    onColor="#86d3ff"
                                    onHandleColor="#2693e6"
                                    handleDiameter={30}
                                    name="goback"
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                    height={20}
                                    width={48}
                                    className="react-switch"
                                    id="material-switch"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="search-form__group search-form__group--white search-form__group--dateinput flex-1">
                        <span>
                            <span className="Styled__CalendarIcon-sc-1vjhvhi-1 cxBPDZ">
                                <div
                                className="form-field form-field--has-value form-field--datepicker" style={{zIndex: '450'}}>
                                    <label
                                        className="form-field__label"
                                        htmlFor="on">
                                        Дата поездки
                                    </label>
                                    <DayPickerInput
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        format="LL"
                                        onDayChange={this.handleDayChange}
                                        placeholder={`${formatDate(this.state.on, 'LL', 'ru')}`}
                                        dayPickerProps={{
                                            locale: 'ru',
                                            localeUtils: MomentLocaleUtils,
                                        }}
                                        value={this.state.on}
                                    />
                            <span className="icon icon-info"></span>
                                    <p
                                        className="form-field__error">
                                    </p>
                                </div>
                            </span>
                        </span>
                        <div className="next-date">
                            <button className="next-date__btn" type="button" onClick={this.handleChangeDate.bind(this, +1 )}>Завтра</button>
                            <button className="next-date__btn" type="button" onClick={this.handleChangeDate.bind(this, +2)}>Послезавтра</button>
                        </div>
                    </div>
                    <div className="search-form__group search-form__group--passengers search-form__group--white">
                        <div className="" style={{position:'relative'}}>
                            <div className="form-group">
                                <div className="form-field form-field--has-value form-control-lg select " style={{zIndex: '440'}}>
                                    <label className="form-field__label"
                                           htmlFor="passengers">
                                        Пассажиры
                                    </label>
                                    <input
                                    className="form-field__tag"
                                    type="text"
                                    id="passengers"
                                    name="passengers"
                                    value={this.state.passengers} />
                                    <button className="classPlus" type="button" onClick={this.passInp.bind(this, +1)}>+</button>
                                    <button className="classMinus" type="button" onClick={this.passInp.bind(this, -1)}>-</button>
                                    <span className="icon icon-info"></span>
                                    <p className="form-field__error"></p>
                                </div>

                                <label className="mobile-search__form-addon"
                                       htmlFor="passengers">
                                    <span className="icon icon-passanger-red text-primary"></span>
                                </label>

                            </div>
                        </div>
                    </div>
                    <div className="search-form__group search-form__group--submit">
                        <button
                            className="Styled__ResettedButton-sc-1dxewfu-0 Styled__ColoredButton-sc-1dxewfu-1 Styled__SizedButton-sc-1dxewfu-2 Styled__StyledButton-sc-1dxewfu-3 iqrXFx form-field__submit"
                            id="submit"
                            name="submit"
                            onClick={this.handleSubmit}>
                            <span className="">Найти билет</span>
                        </button>
                    </div>
                </div>
                </div>
                    <div>{
                        this.state.loadingTwo?
                            <div className="mainImgLoad">
                                <div className="imgLoad"></div>
                            </div>
                            : null
                    }
                    </div>
                    <div className='mainBlockError'>
                        { this.state.resErrorRace ?
                            <p className="errorSend"> к сожалению по вашему запросу не найдено рейсов в назначеную дату</p>
                            :
                            null
                        }
                    </div>
                    {/*<div className="blockCalender" style={{display: this.state.visibleCalendar}}>*/}
                    <div className="blockCalender"  style={{display: this.state.blockShow}}>

                    <div className="calendar__prev" style={{display: this.state.visibleCalendar}} >
                        </div>
                        {/*календарь*/}
                        { this.state.dataCalendar.map((dateCalendar, key) =>
                                <div key={key} onClick={() => this.testFunction(dateCalendar)}>
                                <div className="calendar__item calendar__key3 styleForDays"  >
                                    <p>
                                        <Moment format="D MMM" withTitle>
                                            {dateCalendar}
                                        </Moment><br/>
                                        <Moment format="dddd" withTitle>
                                            {dateCalendar}
                                        </Moment>
                                    </p></div>
                            </div>

                        )}
                        <div className="calendar__next" style={{display: this.state.visibleCalendar}}>
                        </div>
                    </div>
                </div>

                <div style={{display: this.state.blockShow}}>
                    <div className="fixCalendar" style={{display: this.state.blockShow}}>

                    </div>

                    { this.state.tripList.map((list, key) =>




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
                                            <button className="butTic" onClick={() => this.showByTic(list.price, list.currency, list.racename, list.dtArr, list.stArrName, list.dtDep, list.stDepAddr, this.state.passengers, list.currName)}>Выбрать</button>
                                            <br/>
                                            <p className='textPass' style={{color: 'red'}}>{list.places} мест</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='botShowBlock'>
                                    <div className="col-md-2"><p className="trip__details__down" onClick={this.infoBlock(key)} style={{color: 'red'}}>Детали рейса</p></div>
                                    <p style={{paddingBottom: "10px"}}>Перевозчик: {list.racename}.        Автобус: {list.backBusName}</p>
                                </div>

                            </div>
                            {list.showDateil ?
                                <div  className="detailsShow">
                                    <div className="col flex">
                                        <div><p>Отправление<br/>(местное время)</p></div>
                                        <div>
                                            {
                                                list.trip_stop.forward.map((el, i) => {
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
                                </div>
                                :
                                null
                            }
                            {/*end new show*/}
                            {/*<div className="trip-container">*/}
                            {/*    <div className="results__trip">*/}
                            {/*        <div className="row">*/}
                            {/*            <div className="col-md-3 col-xs-12 positionDeparture">*/}
                            {/*                <div className="col-md-12 col-xs-4">*/}
                            {/*                    <div className="trip__time trip__time__departure"><span*/}
                            {/*                        className="trip-departure-datetime show-desktop">{list.dtDep}*/}
                            {/*                        {console.log(list.trip_stop.forward[0].route[0].city)}*/}

                            {/*                    </span><span*/}
                            {/*                        className="trip-departure-time show-mobile">09:00</span><span*/}
                            {/*                        className="trip-departure-date show-mobile">Пн, 18 ноября</span></div>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-md-12 col-xs-8"><p*/}
                            {/*                    className="trip__station trip__station__departure">{list.stDepName},<br/>{list.stDepAddr}*/}
                            {/*                </p></div>*/}
                            {/*            </div>*/}
                            {/*            <div className="col-md-2 col-xs-12">*/}
                            {/*                <div className="col-md-12 col-xs-4 trip-arrow-div"><p*/}
                            {/*                    className="trip__arrow-one showmobileb"></p><p*/}
                            {/*                    className="trip__duration showdesktopb upShow">{list.wayTimeH}ч {list.wayTimeM}мин</p></div>*/}
                            {/*                <div className="col-md-12 col-xs-8 trip-duration-div "><p*/}
                            {/*                    className="trip__arrow-one showdesktopib"></p><p*/}
                            {/*                    className="trip__change showdesktopb">прямой рейс</p><p*/}
                            {/*                    className="trip__duration showmobileib">16ч 50мин</p><p*/}
                            {/*                    className="trip__change showmobileib">прямой рейс</p></div>*/}
                            {/*            </div>*/}
                            {/*            <div className="col-md-3 col-xs-12">*/}
                            {/*                <div className="col-md-12 col-xs-4 upMarg">*/}
                            {/*                    <div className="trip__time trip__time__arrived"><span*/}
                            {/*                        className="trip-arrived-datetime show-desktop upShow ">{list.dtArr}</span></div>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-md-12 col-xs-8"><p*/}
                            {/*                    className="trip__station  trip__station__arrived">{list.stArrName},<br/>{list.stArrAddr}*/}
                            {/*                </p></div>*/}
                            {/*            </div>*/}
                            {/*            <div className="col-md-2 col-xs-12">*/}
                            {/*                <div className="col-md-12 col-xs-4"></div>*/}
                            {/*                <div className="col-md-12 col-xs-8 upMarg">*/}
                            {/*                    <div><p className="sitlabel upShow">свободных мест: </p>*/}
                            {/*                        <p*/}
                            {/*                            className="trip__places">{list.places}</p></div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <div className="col-md-2 col-xs-12">*/}
                            {/*                <div className="col-md-6 col-xs-4 col-price upMarg">*/}
                            {/*                    <div className="priceClass-3"><p*/}
                            {/*                        className="trip__price-lonely desktop-text-center colorMoney">{list.price}<span*/}
                            {/*                        className="currency">₴</span></p></div>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-md-6 col-xs-8 col-discount"></div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="row results__trip second-row">*/}
                            {/*        <div className="col-md-8"><p className="trip__owner">Перевозчик: {list.carrier}</p></div>*/}
                            {/*        <div className="col-md-2"><p className="trip__details__down" onClick={() => this.infoBlock()} >Подробно</p></div>*/}
                            {/*        <div className="col-md-2">*/}
                            {/*            <div className="blockGreen">*/}
                            {/*                <a className="btnGreen" >*/}
                            {/*                    <span className="butSelect">выбрать</span>*/}
                            {/*                </a>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    {this.state.showMe ?*/}
                            {/*        <div className="detailsShow">*/}
                            {/*            <div className="col flex">*/}
                            {/*                <div><p>Отправление<br/>(местное время)</p></div>*/}
                            {/*                <div>*/}
                            {/*                    {*/}
                            {/*                        list.trip_stop.forward.map((el, i) => {*/}
                            {/*                            console.log(el.route[0].city);*/}
                            {/*                            el.route.map((listen, ii) => {*/}
                            {/*                                console.log(listen.city);*/}
                            {/*                                pushme.push(listen);*/}
                            {/*                            })*/}
                            {/*                        })*/}

                            {/*                    }*/}
                            {/*                    <p>Рейс: Киев АС(Ж\д вок.)-Познань АВ</p>*/}
                            {/*                    {pushme.map((el, kkey) => {*/}
                            {/*                            if (el.city !== "") {*/}
                            {/*                                return (<div className="stationBlock" key={kkey}>*/}
                            {/*                                    <div className="imgBlock">*/}
                            {/*                                        <div className="imgClass">*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="imgClassBot">*/}

                            {/*                                        </div>*/}

                            {/*                                    </div>*/}
                            {/*                                    <div>*/}
                            {/*                                        <p className="nameCityStation"> {el.city} </p>*/}
                            {/*                                        <span style={{}}></span>*/}
                            {/*                                        <p className="botStation"> {el.timeDep} </p>*/}
                            {/*                                        <span className="botStation"></span>*/}
                            {/*                                    </div>*/}
                            {/*                                </div>)*/}
                            {/*                            }*/}
                            {/*                        }*/}
                            {/*                    )}*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        :*/}
                            {/*        null*/}
                            {/*    }*/}
                            {/*</div>*/}
                        </div>
                    )}
                </div>
                {/*блок авторизации и входа линый кабинет*/}

                <div className="topFix">
                    <button style={{display: this.state.showByTic}} onClick={this.backStup}>назад</button>
                </div>
                <div className="cabin" style={{display: this.state.showByTic}}>
                    <div className="checkout col-md-8">
                        <div className="m-verify-panel__item checkout-panel">
                            <div className="row-slim m-verify-panel__item-row">
                                <div className="col-xs-12"><h5 className="m-t-0 m-b-0 h4">Оформление билета</h5></div>
                            </div>
                            <div className="row-slim">
                                <div className="col-md-12">
                                    <div className="row-slim">
                                        <div className="col-md-6 col-sm-6 col-xs-6"><label
                                            className="m-verify-panel__form-label"
                                            htmlFor="checkout_passenger1_1021051141151169511097109101">Имя</label>
                                            <div className="form-group has-error">
                                                <div className="">
                                                    <div>
                                                        <div>
                                                            <input
                                                                name="nameS"
                                                            type="text" className="form-control" placeholder="Иван"
                                                            label="Имя" value={this.state.nameS} onChange={this.nameS}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <label className="error control-label"
                                                       htmlFor="checkout_passenger1_1021051141151169511097109101">Напишите
                                                    ваше имя</label></div>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-6"><label
                                            className="m-verify-panel__form-label"
                                            htmlFor="checkout_passenger1_108971151169511097109101">Фамилия</label>
                                            <div className="form-group">
                                                <div className="">
                                                    <div>
                                                        <div><input id="checkout_passenger1_108971151169511097109101"
                                                                    type="text" className="form-control"
                                                                    placeholder="Иванов" autoCapitalize="true"
                                                                    value={this.state.surnameS} onChange={this.surnameS}
                                                                    autoCorrect="off" label="Фамилия"
                                                                    autoComplete="xRfb0tATz" name="xRfb0tATz_"  />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row-slim"></div>
                            <div className="checkout-seatmap__wrapper"><p>Место в автобусе</p>
                                <div className="checkout-seatmap checkout__seatmap">
                                    <div className="checkout-seatmap__item">
                                        <div className="row-slim">
                                            <div>
                                                <div className="verify-panel__picker">
                                                    <div className="verify-panel__picker-btn disabled">
                                                        <button type="button" className="btn free" tabIndex="-1">
                                                            <span><i className="icon icon-seat-v2"></i></span><span
                                                            className="verify-panel__picker-description">
                                                            <p>количество мест: {this.state.passengers} </p>
                                                        </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-panel checkout__customer"><p
                            className="checkout__customer-title">Информация о покупателе</p><p
                            className="checkout__customer-text">Указывайте корректные e-mail и номер телефона, т.к. они
                            необходимы для идентификации пользователя, получения билета, возможности авторизации в ЛК и
                            возможности вернуть билет.</p>
                            <div className="checkout__customer-form">
                                <div className="col-md-6 col-sm-6 col-xs-6"><label
                                    className="m-verify-panel__form-label" htmlFor="checkout_email">E-mail</label>
                                    <div className="form-group"><input id="checkout_email" type="email"
                                                                       className="form-control"
                                                                       placeholder="ashevchenko@gmail.com"
                                                                       value={this.state.emailS} onChange={this.emailS}
                                                                       label="E-mail" autoCorrect="off"
                                                                       autoCapitalize="false" autoComplete="on" name=""
                                                                        /></div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6"><label
                                    className="m-verify-panel__form-label" htmlFor="checkout_phone">Телефон</label>
                                    <div className="form-group">
                                        <div><input id="checkout_phone" name="phone" type="tel" maxLength="17"
                                                    value={this.state.phoneS} onChange={this.phoneS}
                                                    autoComplete="on" label="Телефон" placeholder="380 __ ___ ____"
                                                    className="auth__input"  /><span
                                            className="auth__plus text-muted" > </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="checkout-panel checkout__customer"><p
                            className="checkout__customer-title">Информация о рейсе</p><p
                            className="checkout__customer-text">
                            рейс: {this.state.tripInfForBy} <br/>
                            отправление: {this.state.stDepAddrInfForBy}  <br/>
                            {this.state.DepInfForBy} <br/>
                            отправление: {this.state.stArrNameInfForBy}  <br/>
                            {this.state.ArrInfForBy}
                        </p>


                        </div>
                        <div className="checkout-panel checkout__payment">
                            <div className="checkout__payment-header">К оплате {this.state.priceBy} {this.state.currNameBy}</div>
                            <div className="checkout__payment-info">
                                <div className="checkout__payment-info-text">Ваши платежные и личные данные надежно
                                    защищены в соответствии с международными стандартами безопасности.
                                </div>
                                <div className="checkout__payment-info-icons">
                                    <div className="filling-info__pay-item filling-info__pay-maestro"></div>
                                    <div className="filling-info__pay-item filling-info__pay-mastercard"></div>
                                    <div className="filling-info__pay-item filling-info__pay-visa"></div>
                                </div>
                            </div>


                        </div>
                        <div className="checkout-submit-btn">
                            <div>
                                <button type="submit" style={{backgroundColor: 'white', border: '1px solid black'}}
                                        onClick={() => this.PayArr(this.state.nameS, this.state.surnameS, this.state.emailS, this.state.phoneS)}>
                                    Продолжить
                                </button>
                            </div>
                        </div>
                        <div className="checkout__security"><p className="checkout__security-text">Ваши платежные и
                            личные данные надежно защищены.</p></div>
                    </div>
                </div>
            </div>
                <React.Fragment>
                    {/*<Finder />*/}
                    <Lines customLoading={this.state.loading} />
                </React.Fragment>
            </div>

        )
    }
}
export default Finder;