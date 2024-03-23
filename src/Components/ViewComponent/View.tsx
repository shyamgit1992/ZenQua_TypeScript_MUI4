import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Define RouteParams with an index signature
interface RouteParams {
  [key: string]: string | undefined;
}

// Define User interface
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const ViewWrapper: React.FC = () => {
  const { param } = useParams<RouteParams>();

  return <View param={param || ""} />;
};

interface Props {
  param: any;
}

class View extends React.Component<Props, { uList: User[] }> {
  constructor(props: Props) {
    super(props);
    this.state = {
      uList: []
    };
  }

  componentDidMount(): void {
    axios.get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        console.log(response.data);
        this.setState({ uList: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { param } = this.props;
    const userDetails = this.state.uList[param - 1];
    console.log(userDetails?.name); // Use optional chaining to avoid potential null or undefined

    return (
      <div>
        <center>
          <h1>User Details</h1>
          <hr/>
          <p>Id  : {userDetails?.id}</p>
          <p>Name  : {userDetails?.name}</p>
          <p>Email  : {userDetails?.email}</p>
          <p>Username  : {userDetails?.username}</p>
          <hr/>
        </center>
      </div>
    );
  }
}

export default ViewWrapper;
