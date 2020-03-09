import React from 'react';

class Offerblock extends React.Component {
    constructor(props){
        super(props);
        this.state = {offerShow : false};
    }
    render() {
        const offerText = <p>New new new text</p>;
        return (
            <div  className="offerShow" style={{display: !this.state.offerShow ? 'block' : 'none'}}>
                <div className="col flex">
                    {offerText}
                </div>
                {this.state.offerShow ?
                    <Offerblock offer = {offerText}/>
                    :
                    null
                }
            </div>

        );
    }
}
export default Offerblock;












// import React from 'react';
//import Offerdetailblock from './Offerdetailblock.jsx';
// import { Redirect } from 'react-router-dom';

// class Offerblock extends React.Component {
//     state = {
//         redirect: false
//     }
//     setRedirect = () => {
//         this.setState({
//             redirect: true
//         })
//     }
//     renderRedirect = () => {
//         if (this.state.redirect) {
//             return <Redirect to='./offer.html' />
//         }
//     }
//     render () {
//         return (
//             <div>
//                 {this.renderRedirect()}
//                 <button onClick={this.setRedirect}>Redirect</button>
//             </div>
//         )
//     }
// }
// export default Offerblock;







// import React from 'react';
// import ReactDOM from 'react-dom';
//
// class Offerblock extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {loadWorksheep: false};
//     }
//
//     loadStuff = () => {
//         this.setState({loadWorksheep: true});
//     }
//
//     render() {
//
//         const startPage = (
//             <div className="Offerblock">
//                 <h1>Первая страничка</h1>
//                 <button onClick={this.loadStuff}>Начать</button>
//             </div>
//         );
//
//         return (<div>{ this.state.loadWorksheep ? <WorksheetSelector/> : startPage }</div>);
//
//     }
// }
//
// function WorksheetSelector(props) {
//
//     return (
//         <div>
//             <h1>Выберите группы</h1>
//             <button>Next step</button>
//             <Offerblock offer = "<p>New new new text</p>" />
//         </div>
//     );
// }
//
//
//
// export default Offerblock;



// import React from 'react';
//
// class Offerblock extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {offerShow : false};
//     }
//     render() {
//         const offerText = <p>New new new text</p>;
//         return (
//             <div  className="offerShow" style={{display: !this.state.offerShow ? 'block' : 'none'}}>
//                 <div className="col flex">
//                     {offerText}
//                 </div>
//                 {this.state.offerShow ?
//                     <Offerblock offer = {offerText}/>
//                     :
//                     null
//                 }
//             </div>
//
//         );
//     }
// }
// export default Offerblock;