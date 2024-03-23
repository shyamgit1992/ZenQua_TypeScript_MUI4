import React from "react";
import axios from "axios";
import { DataGrid, GridColDef } from '@material-ui/data-grid';
interface User {
    uList : string[];
}
class ShowUser extends React.Component<{},User>{
    constructor(props:any){
        super(props);
        this.state = {
            uList : []
        }
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
        
       
        // {
        //   field: 'actions',
        //   headerName: 'Actions',
        //   width: 150,
        //   renderCell: (params) => (
        //     <div>
        //       <Button variant="outlined" color="primary" size="small" onClick={() => this.handleEdit(params)}>Edit</Button>
        //       &nbsp;
        //       <Button variant="outlined" color="secondary" size="small" onClick={() => this.handleDelete(params)}>Delete</Button>
        //     </div>
        //   )
        // },
      ];  
    render(){
        const rowsx = this.state.uList.map((user:any, index) => ({
            id: user.id,
            Name: user.name,
            Username : user.username,
            Email: user.email,
            Mobile: user.phone,
          }));
        return(
        <>
        <center>
            <h3>User List</h3>
            <hr/>
        <div style={{ height: 400, width: 800 }}>
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