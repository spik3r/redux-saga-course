import React, {Component} from 'react';
import  {connect} from 'react-redux';
import {getUsersRequest, createUserRequest, deleteUserRequest, usersError} from "../actions/users";
import UsersList from "./UsersList";
import NewUserForm from "./NewUserForm";
import {Alert} from "reactstrap";

class App extends Component {
    constructor(props){
        super(props);
        this.props.getUsersRequest();
    }

    handleSubmit = ({firstName, lastName}) => {
        console.log(firstName, lastName);
        this.props.createUserRequest({
            firstName,
            lastName
        });
    };

    handleDeleteUserCLick = (userId) => {
        //call delete user action
        this.props.deleteUserRequest(userId);
    };

    handleCloseAlert = () => {
        //reuse the error action
        this.props.usersError({error:""});
    };

    render() {
        const users = this.props.users;
        return (
            <div style={{margin: '0 auto', padding: '20px', maxWidth: '600px'}} className="App">

                <Alert color="danger" isOpen={!!this.props.users.error} toggle={this.handleCloseAlert}>
                    {this.props.users.error}
                </Alert>

                <NewUserForm onSubmit = {this.handleSubmit}/>
                {/* entire users state*/}
                <UsersList onDeleteUser={this.handleDeleteUserCLick} users={users.items}/>

            </div>
        );
    }
}

export default connect(({users}) => ({users}), {
    getUsersRequest,
    createUserRequest,
    deleteUserRequest,
    usersError
})(App);
