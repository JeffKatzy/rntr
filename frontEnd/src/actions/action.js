var $ = require("jquery");
import { browserHistory } from 'react-router'

const signUp = function(email, password){
  //dispatch({type: CREATING_USER})
  return function(dispatch){
    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'POST',
      data: JSON.stringify({user: {email: email, password: password}}),
      contentType:"application/json; charset=utf-8",
      dataType:"json"
      //headers: {authorization: localStorage.getItem('jwt')}

    }).done(function(data){
      if(!!data.error){
        alert(data.error)
      } else {
      browserHistory.push('/show-test') //sets url
      localStorage.setItem('token', data.jwt)
      dispatch({type: 'LOG_IN', payload: data})
    }
    })
  }
}
//dispatch twice
//first dispatch if to update state // creating user
// second dispatch is to get the data from the response and put that as payload.
  // logging in  

        //headers: {authorization: localStorage.getItem('jwt')}




const getDistance = function(origin, destination){
  return function(dispatch){
    $.ajax({
      url: 'http://localhost:3000/distances',
      type: 'POST',
      data: JSON.stringify({route: {origin: origin, destination: destination}}),
      contentType:"application/json; charset=utf-8",
      dataType:"json"
    }).done(function(data){
      dispatch({type: 'GET_DISTANCE', payload: data})
    })
  }
}



const logIn = function(email, password){
  return function(dispatch){
    $.ajax({
      url: 'http://localhost:3000/sessions',
      type: 'POST',
      data: JSON.stringify({user: {email: email, password: password}}),
      contentType:"application/json; charset=utf-8",
      dataType:"json"
    }).done(function(data){
      if(!!data.error){
      alert(data.error)
    } else {
      browserHistory.push('/show-test')
      localStorage.setItem('token', data.jwt)
      dispatch({type: 'LOG_IN', payload: data})
    }
    })
  }
}


const getAutocompletes = function(value){
  return function(dispatch){
    $.ajax({
      url: `http://localhost:3000/getautocompletes/${encodeURIComponent(value)}`,
      type: 'GET'
    }).done(function(data){
      if(!!data.error){
      alert(data.error)
    } else {
 
      dispatch({type: 'CHANGE_AUTOCOMPLETE', payload: data})
    }
    })
  }
}


export {signUp, logIn, getDistance, getAutocompletes} // 
