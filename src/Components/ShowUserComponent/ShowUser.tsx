import React from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';
import { Navigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
interface User {
    uList : string[];
    navigateToOtherRoute: boolean;
    uid : string;
}
class ShowUser extends React.Component<{},User>{
    constructor(props:any){
        super(props);
        this.state = {
            uList : [],
            navigateToOtherRoute: false,
            uid : ''
        };
        this.handleView = this.handleView.bind(this);
    }
    componentDidMount(): void {
        axios.get("https://jsonplaceholder.typicode.com/users").then((response)=>{
          console.log(response.data);
          this.setState({uList:response.data});
    
        }).catch((error)=>{
          console.log(error);
    
        })
      }
      columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
          field: 'Name',
          headerName: 'Name',
          width: 150,
          editable: true,
        },
        {
            field: 'Username',
            headerName: 'Username',
            width: 150,
            editable: true,
          },
        {
          field: 'Email',
          headerName: 'Email',
          width: 150,
          editable: true,
        },
        {
          field: 'Mobile',
          headerName: 'Mobile',
          type: 'string',
          width: 120,
          editable: true,
        },
        
       
        {
          field: 'actions',
          headerName: 'Actions',
          width: 150,
          renderCell: (params) => (
            <div>
              <Button variant="outlined" color="primary" size="small" onClick={() => this.handleView(params)}>View</Button>
              &nbsp;
              <Button variant="outlined" color="secondary" size="small" onClick={() => this.handleDelete(params)}>Delete</Button>
            </div>
          )
        },
      ];  
      handleView(params: any) {
        //console.log(params);
        //const { navigate } = this.props; // Access navigate from props
        //navigate('/another-component', { state: { myParameter: 'parameterValue' } }); // Navigate to another component with parameters
        //this.state.redirect && <Navigate to='/some_route' replace={true}/>
        //console.log(params);
        this.setState({ navigateToOtherRoute: true, uid: params.row.id });
        
      }
      handleDelete(params: any) {
        const { uList } = this.state;
        const updatedList = [...uList];
        updatedList.splice(params, 1); // Remove 1 element at rowIndex
        this.setState({ uList: updatedList });
      
      }
    render(){
        const rowsx = this.state.uList.map((user:any, index) => ({
            id: user.id,
            Name: user.name,
            Username : user.username,
            Email: user.email,
            Mobile: user.phone,
          }));
          const { navigateToOtherRoute, uid } = this.state;

          if (navigateToOtherRoute) {
            return <Navigate to={`/view/${uid}`} />;
          }
        return(
        <>
        <center>
            <h3>User List</h3>
            <hr/>
        <div style={{ height: 400, width: 905 }}>
          <DataGrid
            rows={rowsx}
            columns={this.columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            
          />
        </div>
        </center>
        <hr/>
        </>
        );
    }
}
export default ShowUser