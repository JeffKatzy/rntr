import React from 'react'
import { getCrime } from '../actions/action.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



const CrimeComponent = (props) => {

  function handleSubmit(event){
    event.preventDefault()
//     this url should be in the action creator, not in the component
    let urlAddress = `${event.target.children[1].value}+${event.target.children[4].value}+${event.target.children[7].value}+${event.target.children[10].value}`
    props.getCrime(urlAddress)
  }
  return (
    <div>
      <br/>
      <form onSubmit={handleSubmit.bind(this)}>
        <label>Street:</label>
        <input type='text' id='street' /><br/>

        <label>City:</label>
        <input type='text' id='city' /><br/>

        <label>State:</label>
        <input type='text' id='state' /><br/>

        <label>Zip:</label>
        <input type='text' id='zip' /><br/>

        <input type='submit' />
      </form>
      <div>
      <h4>Crime Data:</h4>
      <p>Violations: {props.violation}</p>
      <p>Misdemeanors: {props.misdemeanor}</p>
      <p>Felonies: {props.felony}</p>
      </div>

    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getCrime: getCrime}, dispatch)
}

function mapStateToProps(state) {
  return state.crime_data
}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeComponent)
