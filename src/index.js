import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

// functional based component
// const App = () => {
//     window.navigator.geolocation.getCurrentPosition(
//         (position) => console.log(position) ,
//         (err) => console.log(err)
//     );
//     return (
//         <div>Latitude:</div>
//     )
// };

//class component
class App extends React.Component{
    // constructor(props) {
    //     // Mandatory
    //     super(props);
    //     //state initialization. state property
    //     // this is the only time we do direct assignment to this.state
    //     this.state = { lat: null,errorMessage: ''};
    //
    // }

    state = { lat: null, errorMessage: '' };
    // Component Life cycle methods
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) =>
                // We called set state to update app component
                this.setState({lat: position.coords.latitude}),
            (err) =>
                this.setState({errorMessage:err.message})
        );
    }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log("My component re rendered")
    // }

    // React says we have to define render!!

    renderContent() {
        if (this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>
        }
        if (this.state.lat && !this.state.errorMessage) {
            return (
                // <div>Latitude: {this.state.lat}</div>
                <SeasonDisplay lat={this.state.lat}/>
            )
        }
        return <Spinner message="Please accept location request"/>
    }
    render() {
        //render method will be called all the time
        //     if (this.state.errorMessage && !this.state.lat){
        //         return <div>Error: {this.state.errorMessage}</div>
        //     }
        //     if (this.state.lat && !this.state.errorMessage) {
        //         return (
        //            // <div>Latitude: {this.state.lat}</div>
        //             <SeasonDisplay lat={this.state.lat}/>
        //         )
        //     }
        //     return <Spinner message="Please accept location request"/>
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        )
          //  return (
            // <div>
            //     Latitude:{this.state.lat}
            //     <br />
            //     Error: {this.state.errorMessage}
            // </div>
       // )
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
)



// Notes
//component life cycle
// constructor -> Good place to do one time setup
// render -> avoid doing anything besides returning jsx
//component Did mount -> Good place to do data loading
// component did update -> Good place to do more data loading when state/props change
// component will unmount  -> Good place to clean up especially for non-react stuff

