import React, { Component } from 'react'
import ButtonAppBar from './Navbar'

interface MyComponentState{
  myArray : string[],
  myString : string,
}
interface MyComponentProp{}

export default class Home extends Component<MyComponentProp ,MyComponentState> {

  constructor(props : MyComponentProp){
    super(props);

  }
  render() {
    return (
      <>
      <div>
        <h2>Hello From Home</h2>
      </div>
      </>
      
    )
  }
}
