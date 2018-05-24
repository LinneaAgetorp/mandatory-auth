import React, {Component} from 'react';

import AuthService from './authService';
import Login from './Login';

class App extends Component {
    // get the initial state from AuthService.

    state = AuthService.getAuthState();
    loginFail = false;


    login = (username, password) => {
        // login the user with the given credentials and update the component state upon success or failure respectively.

        AuthService.login({username, password})

            .catch(error => {
                console.log(error)
                this.loginFail = true
            })
            .then(() => {
                this.setState(AuthService.getAuthState())
            })

    };

    logout = () => {
        // logout the user and update the component with state given by AuthService.
        AuthService.logout()
        this.setState(AuthService.getAuthState())

    };

    testApi() {
        // test access to a protected API route and log the results.
        AuthService.getResource('friends')
            .then((res) => {
                console.log('friends: ', res)
            })
            .catch(error => {
                console.log('error message: ', error)
            })
    }

    // ...

    render() {
        // complete the JSX code below to show the proper markup depending on whether or not the user has been authenticated.
        // isLoggedIn toggles which buttons/fields are hidden/displayed
        if (this.state.isLoggedIn) {
            return (
                <div className="container">

                    {this.loginFail ? <p className="error">Login credentials were incorrect!</p> : <p></p>}

                    <div className="status">
                        <span>User ID: {this.state.name || 'N/A'}</span>
                        <button onClick={this.testApi}>Test API</button>
                         <button onClick={this.logout}>Logout</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">

                    {this.loginFail ? <p className="error">Login credentials were incorrect!</p> : <p></p>}

                    <div className="status">
                        <span>User ID: {this.state.name || 'N/A'}</span>
                        <button onClick={this.testApi}>Test API</button>

                    </div>

                    {this.state ? < Login onLogin={this.login}/> : ''}

                </div>
            );
        }
    }
}

export default App;