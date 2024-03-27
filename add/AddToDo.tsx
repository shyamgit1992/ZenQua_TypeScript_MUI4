import React, { Component } from 'react'


interface AddToDoState{
    todo : string
    newval: string[]
    sid : number
    flag : boolean 
}

interface AddToDoProps{}

export default class AddToDo extends Component <AddToDoProps ,AddToDoState>{
    constructor (props : AddToDoProps ){
        super(props)
        this.state = {
        todo: "",
        newval: [],
        sid : 0,
        flag : true
       }
    }

    handleInput=(e :React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({todo : e.target.value })

    }

    handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault();
       this.setState((prevState)=>({newval:[...prevState.newval,this.state.todo],}))
       this.setState({todo :""})
    }


    //delete user
    deleteUser=( index: number )=>{
        this.setState((prevState) =>({
          newval : prevState.newval.filter((item,i)=> i !== index)  
        }))
    }

    //edit User
    editUser=( index : number)=>{
        this.setState({ sid : index});
        const newy = this.state.newval[index]
        this.setState({todo : newy})
        this.setState({ flag : false})
    }

    //Update Array
    updateArray =( e :React.ChangeEvent<HTMLFormElement> )=>{
        e.preventDefault();
        this.state.newval[this.state.sid] = this.state.todo
        this.setState({flag : true})
        this.setState({todo : ""})
    }

  render() {
    return (
       <div className='container'>
        <div className='row mt-4'>
            <div className='col-sm-6'>
                <div className='alert alert-info'>
                    <h3>Enter ToDo</h3>
                </div>
                <form onSubmit={ this.state.flag=== true ?  this.handleSubmit : this.updateArray}>
                    <div className='form-group'>
                        <input className='form-control' type='text' name="" value={this.state.todo} onChange={this.handleInput} ></input>
                    </div>
                    <div className='form-group'>
                        {this.state.flag === true ?<button className='btn btn-info' type='submit'>Add</button> :<button className='btn btn-info' type='submit'>Update</button> }
                         
                    </div>       
                </form>
            </div>

            <div className='col-sm-6'>
                <div className='alert alert-info'>
                    <h3>ToDos data</h3>
                </div>
                <div className='table'>
                <thead>
                     <tr>
                      <th>Todo Name</th>
                      <th>Action</th>
                </tr>
                </thead>
                <tbody>
                { this.state.newval.map((item, index)=>(
                   <tr>
                      <td>{item}</td>
                      <td>
                        <button className='btn btn-danger' onClick={()=>this.deleteUser(index)}>Delete</button>
                      </td>
                      <td>
                        <button className='btn btn-info' onClick={()=>this.editUser(index)}> Edit</button>
                      </td>
                   </tr>
                    ))
                }
  
                
                </tbody>
                </div>
            </div>
        </div>
       </div>
    )
  }
}
