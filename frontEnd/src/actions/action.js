var $ = require("jquery");
import { browserHistory } from 'react-router'

const signUp = function(email, password){
  return function(dispatch){
    $.ajax({
      url: 'http://localhost:3000/users',
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

const getAmenities = function(search, location){
  return function(dispatch){
    $.ajax({
      url: 'http://localhost:3000/amenities',
      type: 'POST',
      data: JSON.stringify({amenities: {search: search, location: location}}),
      contentType:"application/json; charset=utf-8",
      dataType:"json"
    }).done(function(data){
      dispatch({type: 'GET_AMENITIES', payload: data})
    })
  }
}

export {signUp, logIn, getDistance, getAmenities}
