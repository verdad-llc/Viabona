import React from 'react';
import { Lines } from 'react-preloaders';
import Moment from 'react-moment';
import 'moment-timezone';
import Racedetailblock from './Racedetailblock';
import Racedetailblockback from './Racedetailblockback';
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

//import 'moment/min/moment-with-locales'
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import Switch from "react-switch";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


class Finder extends React.Component{
    constructor(props){

        super(props);
        this.state = {
            from : 'Киев',
            showMe : true,
            currency: 'UAH',
            modalUserProfileClass : "modal fade",
            modalUserProfileStyle : 'none',
            modalUserLoginClass : "modal fade",
            modalUserLoginStyle : 'none',
            modalUserRegisterClass : "modal fade",
            modalUserRegisterStyle : 'none',
            modalUserTicketsClass : "modal fade",
            modalUserTicketsStyle : 'none',
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
            userID : 0,
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
            onback : new Date(),
            passengers : '1',
            cityList: [],
            ticketsInfo: [],
            tripList: [],
            tripId: '',
            raceId: '',
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
            showBlockTickets: false,
            showBlockProfile: false,
            loadingTwo: false,
            NameUser: "Вход/Регистрация",
            sessionUserActiv: [],
            //переменные для сесии
            nameS: "",
            surnameS: "",
            passwordS: "",
            password2S: "",
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
            lengPass: [],
            butPayTic: "",
            showButPayTic: false,
            showBuyNext: true,
            inflengPass: [],
            arrForOctobBy: [],
            userAr: [],
            nameSBlockClass: 'form-group',
            surnameSBlockClass: 'form-group',
            phoneSBlockClass: 'form-group',
            emailsBlockClass: 'form-group',
            nameSErrorBlock: 'none',
            surnameSErrorBlock: 'none',
            phoneSErrorBlock: 'none',
            emailSErrorBlock: 'none',



        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.infoBlockBack = this.infoBlockBack.bind(this);
        this.displayCalendar = this.displayCalendar.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeDateArrow = this.handleChangeDateArrow.bind(this);
        this.handleReverseCities = this.handleReverseCities.bind(this);
        this.handleDirectChange = this.handleDirectChange.bind(this);
        this.handleGoBackChange = this.handleGoBackChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleDayBackChange = this.handleDayBackChange.bind(this);
        this.changeDateOnCalendar  = this.changeDateOnCalendar.bind(this);
        this.signFunction = this.signFunction.bind(this);
        this.regFunction  = this.regFunction.bind(this);
        this.subDataForReg = this.subDataForReg.bind(this);
        this.subDataForAuth = this.subDataForAuth.bind(this);
        this.showBlockRegister = this.showBlockRegister.bind(this);
        this.showBlockLogin = this.showBlockLogin.bind(this);
        this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
        this.passInp = this.passInp.bind(this);
        this.sessionUser = this.sessionUser.bind(this);
        this.ticketsInfoFunction = this.ticketsInfoFunction.bind(this);
        this.handleSaveProfile = this.handleSaveProfile.bind(this);
        this.dataSessionUser = this.dataSessionUser.bind(this);
        this.deleteLocal = this.deleteLocal.bind(this);
        this.showBlockProfileFunction = this.showBlockProfileFunction.bind(this);
        this.CloseModalUserProfile = this.CloseModalUserProfile.bind(this);
        this.CloseModalUserTickets = this.CloseModalUserTickets.bind(this);
        this.CloseModalLogin = this.CloseModalLogin.bind(this);
        this.CloseModalRegister = this.CloseModalRegister.bind(this);
        this.showBlockTicketsFunction = this.showBlockTicketsFunction.bind(this);
        //заказ билета
        this.nameS = this.nameS.bind(this);
        this.passwordS = this.passwordS.bind(this);
        this.password2S = this.password2S.bind(this);
        this.surnameS = this.surnameS.bind(this);
        this.emailS = this.emailS.bind(this);
        this.phoneS = this.phoneS.bind(this);
        this.showByTic = this.showByTic.bind(this);
        this.backStup =  this.backStup.bind(this);
        this.PayArr = this.PayArr.bind(this);
        this.loadin = this.loadin.bind(this);
        this.pushnameS = this.pushnameS.bind(this);
        this.pushphoneS = this.pushphoneS.bind(this);
        this.pushsurnameS = this.pushsurnameS.bind(this);

    }
    handleChangeCurrency(e){
        this.setState({
            currency: e.target.value
        })
    }
    handleSaveProfile(password = false){
        let $request = {
            name: this.state.nameS,
            surname: this.state.surnameS,
            email: this.state.emailS,
            phone: this.state.phoneS,
            id: localStorage.userID
        };
        let $endpoint = 'http://new.viabona.com.ua/api/index.php/api/octobus/save_profile';
        if (password){
            if (this.state.passwordS != this.state.password2S){
                alert('Пароли не совспадают!');
                return false;
            }
            $request = {
                password: this.state.passwordS,
                id: localStorage.userID
            }
            $endpoint = 'http://new.viabona.com.ua/api/index.php/api/octobus/save_password';
        }
        axios({
            method: 'post',
            url: $endpoint,
            data: $request
        }).then(res => {
            console.log(res.data);
            alert('Данные успешно обновлены');
            localStorage.name = this.state.nameS;
            localStorage.surname = this.state.surnameS;
            localStorage.email = this.state.emailS;
            localStorage.phone = this.state.phoneS;
        });
    }
    PayArr(name, surname, email, phone) {

        let we_can_go = true;
        if(this.state.nameS == ''){
            we_can_go = false;
            this.setState({
                nameSErrorBlock:'block',
                nameSBlockClass: 'form-group has-error',
            });
        }
        if(this.state.surnameS == ''){
            we_can_go = false;
            this.setState({
                surnameSErrorBlock:'block',
                surnameSBlockClass: 'form-group has-error',
            });
        }
        if(this.state.emailS == ''){
            we_can_go = false;
            this.setState({
                emailSErrorBlock:'block',
                emailSBlockClass: 'form-group has-error',
            });
        }
        if(this.state.phoneS == ''){
            we_can_go = false;
            this.setState({
                phoneSErrorBlock:'block',
                phoneSBlockClass: 'form-group has-error',
            });
        }
        let _userAr = this.state.userAr;
        for(let i=0; i < _userAr.length; i++){
            if (_userAr[i].nameS == ''){
                _userAr[i].blocknameS = 'form-group has-error';
                _userAr[i].labelnameS = 'block';
                we_can_go = false;
            }
            if (_userAr[i].surnameS == ''){
                _userAr[i].blocksurnameS = 'form-group has-error';
                _userAr[i].labelsurnameS = 'block';
                we_can_go = false;
            }
            if (_userAr[i].phoneS == ''){
                _userAr[i].blockphoneS = 'form-group has-error';
                _userAr[i].labelphoneS = 'block';
                we_can_go = false;
            }
        }
        this.setState({
            userAr: _userAr
        });

        if (!we_can_go){
            return false;
        }
        let arrBy = this.state.arrBy;
        arrBy.name = name;
        arrBy.surname = surname;
        arrBy.email = email;
        arrBy.phone = phone;

            let infForLiq1 = this.state.infForLiq;
            infForLiq1.arrBy = arrBy;
            infForLiq1.arrTic = this.state.arrTic;
            //массив для покупки в переменной arrTic
        let inflengPass = this.state.inflengPass;
        console.log(this.state.tripId, this.state.raceId);

        console.log(this.state.infForLiq, this.state.lengPass);
        axios({
            method: 'post',
            url: 'http://new.viabona.com.ua/api/index.php/api/pay/pay?amount=' + this.state.priceBy + '&currency=' + this.state.arrTic.currency + '&description=' + name + surname + '&id=' + this.state.tripId + '&raceId' + this.state.raceId,
            data: {
                state: this.state
            }
        }).then(res => {
            console.log(res.data);
            this.setState({
                showButPayTic: true,
                butPayTic: res.data,
                showBuyNext: false

            })

        });

    }
    backStup(){
        this.setState({
            showByTic: 'none',
            blockShow: 'block'
        })
    }
    showByTic(price, currency, trip, dtArr, stArrName, dtDep, stDepAddr, pass, currName, raceId, tripId){
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
        arrUser.raceId = raceId;
        arrUser.tpripId = tripId;
        arrUser.raceId = raceId;
        this.setState({
            priceBy: price * pass,
            currNameBy: currName,
            tripInfForBy: trip,
            stDepAddrInfForBy: stDepAddr,
            stArrNameInfForBy: stArrName,
            DepInfForBy: dtDep,
            ArrInfForBy: dtArr,
            tripId: tripId,
            raceId: raceId

        });
        let lengPass = this.state.lengPass;
        let userAr = [];
        for (let i = 1; i < this.state.passengers; i++) {
            let kkey = i+1;
            userAr.push({ 'nameS':'', 'kkey':kkey, 'surnameS' : '', 'phoneS' : '', 'blocknameS' : 'form-group', 'blocksurnameS' : 'form-group', 'blockphoneS' : 'form-group', 'labelnameS' : 'none', 'labelsurnameS' : 'none', 'labelphoneS' : 'none' });
        }
        this.setState({userAr:userAr});




        console.log(lengPass);



        console.log(this.state.arrTic);
    }
    pushnameS = id=> e => {
        console.log(id);
        console.log(this.state.userAr);
        let userAr = this.state.userAr;
         userAr[id].nameS = e.target.value;
        this.setState({userAr :userAr});
    }
    pushphoneS = id=> e => {
        console.log(id);
        console.log(this.state.userAr);
        let userAr = this.state.userAr;
         userAr[id].phoneS = e.target.value;
        this.setState({userAr :userAr});
    }
    pushsurnameS = id=> e => {
        console.log(id);
        console.log(this.state.userAr);
        let userAr = this.state.userAr;
         userAr[id].surnameS = e.target.value;
        this.setState({userAr :userAr});
    }
    nameS(el){
            this.setState({nameS: el.target.value});
    }
    passwordS(el){
            this.setState({passwordS: el.target.value});
    }
    password2S(el){
            this.setState({password2S: el.target.value});
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
        localStorage.removeItem("UserID");
        this.setState({
            nameS: "",
            surnameS: "",
            emailS: "",
            UserID: "",
            phoneS: "",
            ticketsInfo: []
        });
        this.setState({
            showBlockTickets: false,
            showBlockProfile: false,
        })

    }
    ticketsInfoFunction(userID){
       // alert(userID);
       // if (userID > 0){
            axios.get('http://new.viabona.com.ua/api/index.php/api/octobus/buyertickets?id=' + userID).then(res => {
                this.setState({
                    ticketsInfo : res.data
                });
            });
       // }

    }
    CloseModalUserProfile(){
        this.setState({
            modalUserProfileClass: 'modal fade',
            modalUserProfileStyle: 'none'
        });
    }
    CloseModalUserTickets(){
        this.setState({
            modalUserTicketsClass: 'modal fade',
            modalUserTicketsStyle: 'none'
        });
    }
    CloseModalLogin(){
        this.setState({
            modalUserLoginClass: 'modal fade',
            modalUserLoginStyle: 'none'
        });
    }
    CloseModalRegister(){
        this.setState({
            modalUserRegisterClass: 'modal fade',
            modalUserRegisterStyle: 'none'
        });
    }
    showBlockProfileFunction(){
       /* this.setState({
            showBlockProfile: !this.state.showBlockProfile,
            showBlockTickets: false
        });*/
        this.setState({
            modalUserProfileClass: 'modal fade in',
            modalUserProfileStyle: 'block'
        });
    }

    showBlockTicketsFunction(){
        this.ticketsInfoFunction(localStorage.userID);
        this.setState({
            modalUserTicketsClass: 'modal fade in',
            modalUserTicketsStyle: 'block'
        });
    }

    passInp(data) {
        let temp_pas = this.state.passengers;
        temp_pas = parseInt(temp_pas)+parseInt(data);
        if (temp_pas == 0){
            temp_pas = 1;
        }
        this.setState({passengers: temp_pas});




    }
    showBlockRegister() {
       /* this.setState({
            showBlockNone: !this.state.showBlockNone
        });*/
        this.setState({
            modalUserRegisterClass: 'modal fade in',
            modalUserRegisterStyle: 'block'
        });
    }
    showBlockLogin() {
       /* this.setState({
            showBlockNone: !this.state.showBlockNone
        });*/
        this.setState({
            modalUserLoginClass: 'modal fade in',
            modalUserLoginStyle: 'block'
        });
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
                if (res.data.auto_auth){
                    this.setState({
                        loginAuth: this.state.login,
                        passwordAuth: this.state.password
                    });
                    this.subDataForAuth();
                    this.CloseModalRegister();
                }
            });
            //console.log(this.state.login);
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
                    });

                    this.setState({
                        nameTest: res.data.name,
                        surname: res.data.surname,
                        email: res.data.email,
                        userID: res.data.id,
                        phone: res.data.phone
                    })

                    this.sessionUser();
                    this.CloseModalLogin();
                }
            });
         };
        // this.sessionUser();

    }

    sessionUser(){
        axios.get('http://new.viabona.com.ua/api/index.php/api/octobus/sessionuser?surname=' +  this.state.surname  + '&name=' +  this.state.nameTest +  '&email=' + this.state.email + '&phone=' + this.state.phone + '&id=' + this.state.userID).then(res => {

            // console.log(res.data);
            localStorage.name = res.data.name;
            localStorage.surname = res.data.surname;
            localStorage.email = res.data.email;
            localStorage.phone = res.data.phone;
            localStorage.userID = res.data.id;

            this.setState({
                nameS: localStorage.name,
                surnameS: localStorage.surname,
                emailS: localStorage.email,
                userID: localStorage.userID,
                phoneS: localStorage.phone
            });
            this.setState({
                NameUser: res.data.name
            });
            this.setState({
                sessionUserActiv : res.data
            });


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

    handleDayBackChange(day){
        this.setState({onback : day});
    }


    handleReverseCities() {
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
    get
    UNSAFE_componentWillMount() {
        const root = document.getElementById('root');
        const from_date = root.getAttribute('data-from');
        const to_date = root.getAttribute('data-to');
        if (from_date != '' && to_date != ''){
            axios.get('http://new.viabona.com.ua/api/index.php/api/octobus/getCityNameByCityID?cityID=' + from_date).then(res => {
                this.setState({
                    from : res.data
                });
            });
            axios.get('http://new.viabona.com.ua/api/index.php/api/octobus/getCityNameByCityID?cityID=' + to_date).then(res => {
                this.setState({
                    to : res.data
                });
            });
        }
    }

    componentDidMount() {


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

    handleChangeDate(date, fromDate = false){
        let newDate = new Date();
        if (fromDate){
            newDate.setDate(new Date().getDate() + date);
        }else{
            newDate.setDate(this.state.on.getDate() + date);
        }
        this.setState({
            on: newDate
        });
    }
    handleChangeDateArrow(date){
        let newDate = new Date();
        newDate.setDate(this.state.on.getDate() + date);
        this.setState({
            on: newDate
        }, function(){
            this.handleSubmit(this.state.on);
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
       // console.log(el);
        //this.loadin();
        this.setState({
            loadingTwo: true
        })
        let direct = this.state.direct ? this.state.direct : 0;
        let goback = this.state.goback ? this.state.goback : 0;
        let on_date = this.state.on;
        if (typeof el === 'string' || el instanceof String){
            on_date = el;
        }

        let day = on_date.getDate() > 9 ? on_date.getDate() : '0'+on_date.getDate();
        let month = on_date.getMonth()+1;
        let when = on_date.getFullYear() + '-' + month + '-' + day;

        /**
         * when back parse date
         * */
        let onback_date = this.state.onback;
        let dayback = onback_date.getDate() > 9 ? onback_date.getDate() : '0'+onback_date.getDate();
        let monthback = onback_date.getMonth()+1;
        let whenback = onback_date.getFullYear() + '-' + monthback + '-' + dayback;

        axios.get('http://new.viabona.com.ua/api/index.php/api/octobus/getTrips?direct=' + direct + '&fromID=' + this.state.from + '&toID=' + this.state.to + '&on=' + when + '&passengers=' + this.state.passengers + '&goback=' + goback + '&whenback=' + whenback + '&currency=' + this.state.currency).then(res => {
            console.log(res.data);

            if (!res.data.error){
                this.setState({
                    loadingTwo: false
                })
                this.setState({visibleCalendar : 'block'});
                this.setState({
                    tripList : res.data,
                    tripId : res.data[0].tripId,
                });
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

                        allDay.push(dayCall);

                    }
                };
                funcDate(dataCalendarTest);
                findInArray(arrActive, arrDate);
                let arrDate2 = [];
                for (let i=0;i < arrDate.length;i++){
                    let stylingDateElement = {};
                    if (new Date(arrDate[i]) < new Date()){
                        stylingDateElement = { 'color' : 'grey', 'cursor' : 'no-drop' };
                    }
                    if (new Date(arrDate[i]).getDate() == new Date(this.state.on).getDate()){
                        stylingDateElement = { 'border' : '2px solid black' };
                    }
                    arrDate2.push({ 'element':  arrDate[i], 'stylingDateElement' : stylingDateElement });
                }
                this.setState({
                    dataCalendar : arrDate2,
                    resErrorRace: false,
                    showByTic: 'none',
                    blockShow: 'block'
                });


            }else{
                this.setState({
                    loadingTwo: false
                })
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
            4500
        );

    }
    changeDateOnCalendar(el){
        let nowDate = new Date();
        let clickedDate = new Date(el);
        if (clickedDate >= nowDate){
            this.setState({on: el}, function(){
                this.handleSubmit(this.state.on);
            });
        }

    }
    displayCalendar(){
        this.setState({displayCalendar : 'block'});
    }
    infoBlock = id => e => {
        console.log(id);
        console.log(e.target.value);
        let _InviteList = this.state.tripList;
        _InviteList[id].showDateil = !_InviteList[id].showDateil;
        this.setState({tripList : _InviteList});
    };
    infoBlockBack = id => e => {
        console.log(id);
        console.log(e.target.value);
        let _InviteList = this.state.tripList;
        _InviteList[id].showDateil2 = !_InviteList[id].showDateil2;
        this.setState({tripList : _InviteList});
    };

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
        const pushme = [];
        let arrayForSession = this.state.sessionUserActiv;



        return(


            <div >

            <div className="mainMainBlock" >
                <div className="myCab" >
                    {localStorage.name ?
                        <div>
                            <p>{localStorage.name}</p>
                            <p className='textCab' style={{ cursor: 'pointer'}} onClick={()=>this.showBlockProfileFunction()}>Мой профиль</p>
                            <p className='textCab' style={{ cursor: 'pointer'}} onClick={()=>this.showBlockTicketsFunction()}>Мои билеты</p>
                            <p className='textCab' style={{ cursor: 'pointer'}} onClick={()=>this.deleteLocal()}>Выход</p>

                        </div>
                        :
                        <div>
                            <a href="#" style={{cursor: 'pointer'}} onClick={()=>this.showBlockLogin()}>Вход</a> | <a href="#" style={{cursor: 'pointer'}} onClick={()=>this.showBlockRegister()}>Регистрация</a>
                            </div>}
                </div>

                <div className={this.state.modalUserProfileClass} id="modalUserProfile" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{display: this.state.modalUserProfileStyle}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={()=>this.CloseModalUserProfile()} data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title" id="myModalLabel">Мой профиль</h4>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="cp_nameS">Имя:</label>
                                    <input type="text" className="form-control" id="cp_nameS" name="nameS" value={this.state.nameS}  onChange={this.nameS}/>
                                    <label htmlFor="cp_surnameS">Фамилия:</label>
                                    <input type="text" id="cp_surnameS" className="form-control" name="surnameS"  value={this.state.surnameS}  onChange={this.surnameS}/>
                                    <label htmlFor="cp_emailS">Почта:</label>
                                    <input type="text" id="cp_emailS" className="form-control" name="emailS" value={this.state.emailS}  onChange={this.emailS}/>
                                    <label htmlFor="cp_phoneS">Телефон:</label>
                                    <input type="text" id="cp_phoneS" className="form-control" name="phoneS" value={this.state.phoneS}  onChange={this.phoneS}/>

                                </div>

                                <div className="form-group" style={{textAlign: 'right'}}>
                                    <button className="btn btn-primary verdad-btn" onClick={this.handleSaveProfile}>Сохранить</button>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <h5 style={{textAlign: 'left'}}>Изменить пароль</h5>
                                <div className="form-group" style={{textAlign: 'left'}}>
                                    <label htmlFor="cp_passwordS">Новый Пароль:</label>
                                    <input type="text" className="form-control" id="cp_passwordS" name="passwordS" value={this.state.passwordS}  onChange={this.passwordS}/>
                                    <label htmlFor="cp_password2S">Повторите Пароль:</label>
                                    <input type="text" className="form-control" id="cp_password2S" name="password2S" value={this.state.password2S}  onChange={this.password2S}/>
                                </div>
                                <button className="btn btn-primary verdad-btn" onClick={this.handleSaveProfile.bind(this, true)}>Изменить пароль</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/*Список билетов*/}
                <div className={this.state.modalUserTicketsClass} id="modalUserProfile" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{display: this.state.modalUserTicketsStyle}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={()=>this.CloseModalUserTickets()} data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title" id="myModalLabel">Мои билеты</h4>
                            </div>
                            <div className="modal-body">
                                <div className="table-responsive" style={{overflowY:'scroll', maxHeight: '500px', height: '500px'}}>
                                    <table className="table table-striped table-hovered table-bordered">
                                        <tbody>
                                        { this.state.ticketsInfo.map((list, key) =>
                                            <tr key={key}>
                                                <td>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td style={{border: '1px solid #dee2e6', verticalAlign: 'top', textAlign:'left', padding: '10px', width:'50%'}}><b>Отправление:</b><br/>
                                                                    {list.lastName} {list.name}
                                                                    <br/>
                                                                    {list.timeDep}, {list.dateDep} | {list.stDepName} | {list.stDepAddr}
                                                                </td>
                                                                <td style={{border: '1px solid #dee2e6', verticalAlign: 'top', textAlign:'left', padding: '10px', width:'50%'}}><b>Прибытие:</b><br/>
                                                                    {list.timeArr}, {list.dateArr} | {list.stArrName} | {list.stArrAddr}
                                                                </td>
                                                            </tr>
                                                        <tr>
                                                            <td style={{
                                                                border: '1px solid #dee2e6',
                                                                verticalAlign: 'top',
                                                                textAlign: 'left',
                                                                padding: '10px', width:'50%'
                                                            }}>
                                                                <b>В пути:</b><br/>
                                                                {list.wayHour}:{list.wayMin}<br/>
                                                                <b>Место:</b><br/>
                                                                {list.place}
                                                            </td>
                                                            <td style={{border: '1px solid #dee2e6', verticalAlign: 'top', textAlign:'left', padding: '10px', width:'50%'}}>
                                                                <b>Цена:</b><br/>
                                                                {list.price} {list.curr}
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td><hr/></td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div className="modal-footer">

                            </div>
                        </div>
                    </div>
                </div>



                <div className="blockSign" style={{display: this.state.showBlockTickets ? 'block' : 'none'}}>
                    <div >
                        <div >
                            <div >
                                <div className="showSignBlock">
                                    <h3>Список билетов</h3>
                                    { this.state.ticketsInfo.map((list, key) =>
                                        <div key={key}>
                                            <p>
                                                Название рейса: {list.raceName}
                                            </p><p>
                                                Перевозчик: {list.carrierName}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* форма авторизации*/}

                <div className={this.state.modalUserLoginClass} id="modalUserLogin" tabIndex="-1" role="dialog"
                     aria-labelledby="myModalLabel" aria-hidden="true"
                     style={{display: this.state.modalUserLoginStyle}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={() => this.CloseModalLogin()}
                                        data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title" id="myModalLabel">Авторизация</h4>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="loginAuth">Логин:</label>
                                    <input className="form-control" id="loginAuth"  type="text"  name="loginAuth" value={this.state.loginAuth} onChange={this.handleChange}/>
                                    <label htmlFor="passwordAuth">Пароль:</label>
                                    <input className="form-control" type="password" name="passwordAuth" value={this.state.passwordAuth} onChange={this.handleChange}/>
                                    <p className={this.state.erAuth}>Логин или пароль введены не верно</p>
                                </div>

                                <div className="form-group" style={{textAlign: 'right'}}>
                                    <button className="btn btn-primary verdad-btn"
                                            onClick={this.subDataForAuth}>Войти
                                    </button>
                                </div>

                            </div>
                            <div className="modal-footer">

                            </div>
                        </div>
                    </div>
                </div>


                {/* форма регистрации*/}

                <div className={this.state.modalUserRegisterClass} id="modalUserRegister" tabIndex="-1" role="dialog"
                     aria-labelledby="myModalLabel" aria-hidden="true"
                     style={{display: this.state.modalUserRegisterStyle}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={() => this.CloseModalRegister()}
                                        data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title" id="myModalLabel">Регистрация</h4>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="login">Логин:</label>
                                    <input placeholder="Логин" id="login" type="text" className="form-control {this.state.errorLogin}" name="login" value={this.state.login} onChange={this.handleChange}/>
                                    <p className={this.state.erLogin}>не коректно введен логин </p>

                                    <label htmlFor="password">Пароль:</label>
                                    <input placeholder="Пароль" id="password" className="form-control {this.state.erPassword}" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                                    <p className={this.state.erPassword}>не коректный пароль</p>


                                    <label htmlFor="email">Email:</label>
                                    <input placeholder="email@gmail.com" className="form-control {this.state.erEmail}" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                                    <p className={this.state.erEmail}>Введите емеил коректно</p>


                                    <label htmlFor="nameTest">Имя:</label>
                                    <input placeholder="Имя" id="nameTest"
                                           className="form-control {this.state.erName}" type="text" name="nameTest" value={this.state.nameTest}
                                           onChange={this.handleChange}/>
                                    <p className={this.state.erName}>Введите имя коректно</p>


                                    <label htmlFor="surname">Фамилия:</label>
                                    <input id="surname" placeholder="Ваша фамилия" className="form-control {this.state.erSurname}" type="text" name="surname" value={this.state.surname} onChange={this.handleChange}/>
                                    <p className={this.state.erSurname}>Фамилия введена не корректно</p>


                                    <label htmlFor="phone">Телефон:</label>
                                    <input id="phone" placeholder="+38 099-000-00-00" className="form-control {this.state.erPhone}" type="text" name="phone" value={this.state.phone} onChange={this.handleChange}/>
                                    <p className={this.state.erPhone}>Введите мобильный номер корректно</p>

                                </div>

                                <div className="form-group" style={{textAlign: 'right'}}>
                                    <button className="btn btn-primary verdad-btn"
                                            onClick={this.subDataForReg}>Зарегистрироваться
                                    </button>
                                </div>

                            </div>
                            <div className="modal-footer">

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
                                                    style={{ zIndex: '999000000000000000000000000000', backgroundColor: highlighted ? '#708090' : 'transparent', cursor:"pointer"}}
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
                                <span>Искать с пересадками  </span>
                                <Switch
                                    checked={this.state.direct}
                                    onChange={this.handleDirectChange}
                                    onColor="#86d3ff"
                                    onHandleColor="#2693e6"
                                    handleDiameter={14}
                                    name="direct"
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                    height={16}
                                    width={40}
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
                                                    style={{ backgroundColor: highlighted ? '#708090' : 'transparent', cursor:"pointer"}}
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
                                <span>В обе стороны  </span>
                                <Switch
                                    checked={this.state.goback}
                                    onChange={this.handleGoBackChange}
                                    onColor="#86d3ff"
                                    onHandleColor="#2693e6"
                                    handleDiameter={14}
                                    name="goback"
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                    height={16}
                                    width={40}
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
                            <button className="next-date__btn" type="button" onClick={this.handleChangeDate.bind(this, +1, new Date() )}>Завтра</button>
                            <button className="next-date__btn" type="button" onClick={this.handleChangeDate.bind(this, +2, new Date())}>Послезавтра</button>
                        </div>
                    </div>
                    <div className="search-form__group search-form__group--white search-form__group--dateinput flex-1" style={{ display: this.state.goback ? 'block' : 'none' }}>
                        <span>
                            <span className="Styled__CalendarIcon-sc-1vjhvhi-1 cxBPDZ">
                                <div
                                className="form-field form-field--has-value form-field--datepicker" style={{zIndex: '450'}}>
                                    <label
                                        className="form-field__label"
                                        htmlFor="on">
                                        Дата обратно
                                    </label>
                                    <DayPickerInput
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        format="LL"
                                        onDayChange={this.handleDayBackChange}
                                        placeholder={`${formatDate(this.state.onback, 'LL', 'ru')}`}
                                        dayPickerProps={{
                                            locale: 'ru',
                                            localeUtils: MomentLocaleUtils,
                                        }}
                                        value={this.state.onback}
                                    />
                            <span className="icon icon-info"></span>
                                    <p
                                        className="form-field__error">
                                    </p>
                                </div>
                            </span>
                        </span>
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
                        <div className="next-date direct-switch">
                            <select  name="currency" className="currency" value={this.state.currency} onChange={this.handleChangeCurrency} style={{display: 'none'}}>
                                <option value="RUR">Рубли</option>
                                <option value="UAH">Гривны</option>
                            </select>
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
                            <p className="errorSend"> К сожалению по вашему запросу не найдено рейсов в назначеную дату</p>
                            :
                            null
                        }
                    </div>
                    <div className="blockCalender"  style={{display: this.state.blockShow}}>

                    <div className="calendar__prev"
                         style={{display: this.state.visibleCalendar}}
                            onClick={this.handleChangeDateArrow.bind(this, -1)}>
                        </div>
                        {/*календарь*/}
                        { this.state.dataCalendar.map((dateCalendar, key) =>
                                <div key={key} onClick={() => this.changeDateOnCalendar(dateCalendar.element)}>
                                <div className="calendar__item calendar__key3 styleForDays" style={dateCalendar.stylingDateElement} >
                                    <p>
                                        <Moment format="D MMM" withTitle>
                                            {dateCalendar.element}
                                        </Moment><br/>
                                        <Moment format="dddd" withTitle>
                                            {dateCalendar.element}
                                        </Moment>
                                    </p></div>
                            </div>

                        )}
                        <div className="calendar__next"
                             style={{display: this.state.visibleCalendar}}
                             onClick={this.handleChangeDateArrow.bind(this, 1)}>
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
                                            {!this.state.goback ? <button className="butTic" onClick={() => this.showByTic(list.price, list.currency, list.racename, list.dtArr, list.stArrName, list.dtDep, list.stDepAddr, this.state.passengers, list.currName, list.id, list.tripId)}>Выбрать</button> : ''}
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
                                <Racedetailblock list={list}/>
                            {/*end new show*/}
                            {this.state.goback ?
                                <div>
                                <div className="showBlock" style={{display: this.state.blockShow, height: '233px'}}>
                                    <hr style={{borderTop: '1px solid red'}}/>
                                    <h4 style={{textAlign: 'center'}}>Обратный билет</h4>
                                    <div className='upShowBlock'>
                                        <div className='oneGridForShow'>
                                            <div className='upOneGridForShow'>
                                                <p className="timeShow">
                                                    <Moment format="HH:MM" withTitle>
                                                        {list.backDtDep}
                                                    </Moment>
                                                </p>
                                                <div className="dataShow"> <Moment format="D MMM" withTitle>
                                                    {list.backDtDep}
                                                </Moment></div>
                                                <div className="timeInRoad">{list.backWayTimeH} ч {list.backWayTimeM} мин. в пути</div>
                                            </div>
                                            <div className='upTwoGridForShow'>
                                                <p className="cityName">{list.backStDepName}</p>
                                                <br/>
                                                <p>{list.backStDepAddr}</p>
                                            </div>
                                        </div>
                                        <div className='twoGridForShow'>
                                            <div className='upOneGridForShow'>
                                                <p className="timeShow">
                                                    <Moment format="HH:MM" withTitle>
                                                        {list.backDtArr}
                                                    </Moment>
                                                </p>
                                                <div className="dataShow"> <Moment format="D MMM" withTitle>
                                                    {list.backDtArr}
                                                </Moment></div>
                                            </div>
                                            <div className='upTwoGridForShow'>
                                                <p className="cityName">{list.backStArrName}</p>
                                                <br/>
                                                <p>{list.backStArrAddr}</p>
                                            </div>
                                        </div>
                                        <div className='threeGridForShow'>
                                            <div className='leftShowBlock'>
                                                <p className='textPrice' style={{float: 'right'}}>{list.backPrice} {list.currName}</p>
                                            </div>
                                            <div className='rightShowBlock'>
                                                <button className="butTic" onClick={() => this.showByTic(list.fullPrice, list.currency, list.backRacename, list.backDtArr, list.backStArrName, list.backDtDep, list.backStDepAddr, this.state.passengers, list.currName, list.id, list.tripId)}>Выбрать</button>
                                                <br/>
                                                <p className='textPass' style={{color: 'red'}}>{list.backPlaces} мест</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='botShowBlock'>
                                        <div className="col-md-2"><p className="trip__details__down" onClick={this.infoBlockBack(key)} style={{color: 'red'}}>Детали рейса</p></div>
                                        <p style={{paddingBottom: "10px"}}>Перевозчик: {list.racename}.        Автобус: {list.backBusName}</p>
                                    </div>

                                </div>
                                <Racedetailblockback list={list}/></div>
                                : null}
                        </div>

                    )}
                </div>
                {/*блок авторизации и входа линый кабинет*/}

                <div className="topFix">
                    <button style={{display: this.state.showByTic}} onClick={this.backStup}>Назад</button>
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
                                            <div className={this.state.nameSBlockClass}>
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
                                                <label  style={{display: this.state.nameSErrorBlock}} className="error control-label"
                                                       htmlFor="checkout_passenger1_1021051141151169511097109101">Напишите
                                                    ваше имя</label></div>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-6"><label
                                            className="m-verify-panel__form-label"
                                            htmlFor="checkout_passenger1_108971151169511097109101">Фамилия</label>
                                            <div className={this.state.surnameSBlockClass}>
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

                                                <label style={{display: this.state.surnameSErrorBlock}} className="error control-label"
                                                       htmlFor="checkout_passenger1_1021051141151169511097109101">Напишите
                                                    вашу фамилию</label>
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
                                                            <p id={'seatsQuantity'}>  Количество мест: {this.state.passengers} </p>
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
                            необходимы для идентификации пользователя, получения билета, возможности авторизации в Личном Кабинете и
                            возможности вернуть билет.</p>
                            <div className="checkout__customer-form">
                                <div className="col-md-6 col-sm-6 col-xs-6"><label
                                    className="m-verify-panel__form-label" htmlFor="checkout_email">E-mail</label>
                                    <div className={this.state.emailSBlockClass}><input id="checkout_email" type="email"
                                                                       className="form-control"
                                                                       placeholder="ashevchenko@gmail.com"
                                                                       value={this.state.emailS} onChange={this.emailS}
                                                                       label="E-mail" autoCorrect="off"
                                                                       autoCapitalize="false" autoComplete="on" name=""
                                                                        />
                                        <label style={{display: this.state.emailSErrorBlock}} className="error control-label"
                                               htmlFor="checkout_passenger1_1021051141151169511097109101">Напишите
                                            вашу почту</label>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6"><label
                                    className="m-verify-panel__form-label" htmlFor="checkout_phone">Телефон</label>
                                    <div className={this.state.phoneSBlockClass}>
                                        <div><input id="checkout_phone" name="phone" type="tel" maxLength="17"
                                                    value={this.state.phoneS} onChange={this.phoneS}
                                                    autoComplete="on" label="Телефон" placeholder="380 __ ___ ____"
                                                    className="auth__input"  /><span
                                            className="auth__plus text-muted" > </span>
                                        </div>
                                        <label style={{display: this.state.phoneSErrorBlock}} className="error control-label"
                                               htmlFor="checkout_passenger1_1021051141151169511097109101">Напишите
                                            ваш телефон</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {this.state.userAr.map((list, key) =>

                            <div key={key} className="checkout-panel checkout__customer"><p
                                className="checkout__customer-title">Информация о пассажире {list.kkey}</p>
                                <div className="checkout__customer-form">
                                    <div className="col-md-6 col-sm-6 col-xs-6"><label
                                        className="m-verify-panel__form-label"
                                        htmlFor="checkout_passenger1_1021051141151169511097109101">Имя</label>
                                        <div className={list.blocknameS}>
                                            <div className="">
                                                <div>
                                                    <div>
                                                        <input
                                                            name="nameS[]"
                                                            type="text" className="form-control" placeholder="Иван"
                                                            label="Имя"
                                                            value={list.nameS}
                                                            onChange={this.pushnameS(key)}  />

                                                    </div>
                                                </div>
                                            </div>
                                            <label
                                                style={{'display' : list.labelnameS}}
                                                className="error control-label"
                                                   htmlFor="checkout_passenger1_1021051141151169511097109101">Напишите
                                                ваше имя</label></div>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6"><label
                                        className="m-verify-panel__form-label"
                                        htmlFor="checkout_passenger1_108971151169511097109101">Фамилия</label>
                                        <div className={list.blocksurnameS}>
                                            <div className="">
                                                <div>
                                                    <div><input type="text"
                                                                className="form-control"
                                                                placeholder="Иванов"
                                                                autoCapitalize="true"
                                                                value={list.surnameS}
                                                                onChange={this.pushsurnameS(key)}
                                                                autoCorrect="off"
                                                                label="Фамилия"
                                                                name="surnameS[]"  />
                                                    </div>
                                                </div>
                                            </div>
                                            <label
                                                style={{'display' : list.labelsurnameS}}
                                                className="error control-label"
                                                htmlFor="checkout_passenger1_1021051141151169511097109101">Напишите
                                                вашу фамилию</label>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-sm-6 col-xs-6"><label
                                        className="m-verify-panel__form-label" htmlFor="checkout_phone">Телефон</label>
                                        <div className={list.blockphoneS}>
                                            <div><input  name="phoneS[]"
                                                         type="tel"
                                                         maxLength="17"
                                                         value={list.phoneS}
                                                         onChange={this.pushphoneS(key)}
                                                        autoComplete="on"
                                                         label="Телефон"
                                                         placeholder="380 __ ___ ____"
                                                        className="auth__input"  /><span
                                                className="auth__plus text-muted" > </span>
                                            </div>
                                            <label
                                                style={{'display' : list.labelphoneS}}
                                                className="error control-label"
                                                htmlFor="checkout_passenger1_1021051141151169511097109101">Напишите
                                                ваш телефон</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}
                        <div className="checkout-panel checkout__customer"><p
                            className="checkout__customer-title">Информация о рейсе</p><p
                            className="checkout__customer-text">
                            Рейс: {this.state.tripInfForBy} <br/>
                            Отправление: {this.state.stDepAddrInfForBy}  <br/>
                            {this.state.DepInfForBy} <br/>
                            Отправление: {this.state.stArrNameInfForBy}  <br/>
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
                            {
                                this.state.showBuyNext ?
                                    <button className="butTictwo" type="submit" style={{backgroundColor: 'white', border: '1px solid black'}}
                                            onClick={() => this.PayArr(this.state.nameS, this.state.surnameS, this.state.emailS, this.state.phoneS)}>
                                        Продолжить
                                    </button>

                                    :
                                    null
                            }


                            {
                                this.state.showButPayTic ?
                                    <div dangerouslySetInnerHTML={{ __html: this.state.butPayTic }} />

                                    :
                                    null
                            }
                        </div>
                        <div className="checkout__security"><p className="checkout__security-text">Ваши платежные и
                            личные данные надежно защищены.</p></div>
                    </div>
                </div>
            </div>
                <React.Fragment>
                    <Lines customLoading={this.state.loading} />
                </React.Fragment>
            </div>

        )
    }
}
export default Finder;