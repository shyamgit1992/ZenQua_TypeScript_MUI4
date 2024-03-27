import React, { Component } from "react";
import axios from "axios";
import DemoCard from "./DemoCard";
interface MyState {
  myArray: any;
  myString: string;
}
interface Myprops {}

export default class Demo extends Component<Myprops, MyState> {
  constructor(props: Myprops) {
    super(props);
    this.state = {
      myArray: [],
      myString: "",
    };
  }
  componentDidMount(): void {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      this.setState((prevState) => ({
        myArray: [...prevState.myArray, res.data],
      }));
    });
  }
  render() {
    return (
      <div className="container">
        {/*  <DemoCard id={this.state.myArray[0].id} /> */}
        {this.state.myArray.map((item: any): any => {
          return (
            <>
              <DemoCard
                id={item[0].id}
                title={item[0].title}
                body={item[0].body}
              />
              <br></br>
              <DemoCard
                id={item[1].id}
                title={item[0].title}
                body={item[1].body}
              />
              <br></br>
              <DemoCard
                id={item[2].id}
                title={item[0].title}
                body={item[2].body}
              />
            </>
          );
        })}
      </div>
    );
  }
}
