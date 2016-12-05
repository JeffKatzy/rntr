import React from 'react'
import { connect } from 'react-redux';
import { logIn } from '../actions/action.js'
import { bindActionCreators } from 'redux';


const LogInComponent = (props) => {

  function handleSubmit(event){
    event.preventDefault()
    // don't access via target.children, instead update the state each time the input changes.
    props.logIn(event.target.children[1].value, event.target.children[4].value)
  }


  return (
    <div>
      <form onSubmit={handleSubmit.bind(this)}>
        <label>Email:</label>
        <input type='email' id='email' /><br/>

        <label>Password:</label>
        <input type='password' id='password' /><br/>

        <input type='submit' />
      </form>
    </div>
  )
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({logIn: logIn},dispatch)
}

export default connect(null, mapDispatchToProps)(LogInComponent)
