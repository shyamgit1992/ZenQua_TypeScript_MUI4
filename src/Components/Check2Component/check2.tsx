import React from "react";
import { useParams } from "react-router-dom";

// Define RouteParams with an index signature
interface RouteParams {
  [key: string]: string | undefined;
}

const Check2Wrapper: React.FC = () => {
  const { param } = useParams<RouteParams>();

  return <Check2 param={param || ""} />;
};

interface Props {
  param: string;
}

class Check2 extends React.Component<Props> {
  render() {
    const { param } = this.props;

    return (
      <div>
        <h1>Check 2</h1>
        <p>Parameter: {param}</p>
      </div>
    );
  }
}

export default Check2Wrapper;
