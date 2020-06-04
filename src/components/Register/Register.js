import React, { Component } from 'react';
const baseURL = 'https://safe-springs-49156.herokuapp.com';

class Register extends Component {
     constructor(props){
         super(props)
         this.state = {
             name: '',
             email:'',
             password:'',

         }
     }

    getName =(event) => {
         this.setState({name:event.target.value})
     }

    getEmail =(event) => {
        this.setState({email:event.target.value})
    }

    getPassword =(event) => {
        this.setState({password:event.target.value})
    }

    onRegisterClick = () => {
        const {name, email, password} = this.state
        fetch(`${baseURL}/register`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                
                name: name,
                email: email,
                password: password,
            })

        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })

    }

    render() {
        return (
            <article className="br3 b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
             <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input onChange={this.getName}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={this.getEmail}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={this.getPassword}
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                    </div>
                    </fieldset>
                    <div className="">
                    <input onClick={this.onRegisterClick} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign up" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => this.props.onRouteChange('signIn')} className="f6 link dim black db pointer">Sign In</p>
                    </div>
                </div>
            </main>
            </article>
        
            )
    }
}

export default Register;