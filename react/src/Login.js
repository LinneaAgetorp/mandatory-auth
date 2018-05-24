import React, { Component } from 'react';


class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    onChange = e => {
        // update the component state with a change to either the username or password.

        this.setState({[e.target.name]: e.target.value})
    };

    onSubmit = e => {
        e.preventDefault();
        // calls the passed callback from the parent <App> component.
        this.props.onLogin(e.target.username.value, e.target.password.value);
    }



    render() {
        // render a login form and perform manual validation.
        const enabled =
            this.state.username.length > 0 && this.state.password.length > 7

        return(
        <form onSubmit={this.onSubmit}>
            <div className='form-group'>
                <label>User Name</label>
                <input
                    type='text'
                    className='form-control'
                    placeholder='enter user name'
                    name='username'
                    onChange={this.onChange}
                    value={this.state.username}/>

                <label>Password</label>
                <input
                    type='password'
                    className='form-control'
                    placeholder='enter password'
                    name='password'
                    onChange={this.onChange}
                    value={this.state.password}/>
                <br/>

                <button type='submit' disabled={!enabled}>Login</button>
            </div>
        </form>
        )
    }
};

export default Login;