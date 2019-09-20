import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

class NewUserForm extends Component {

    state = {
        firstName: '',
        lastName: '',
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log('handleSubmit');
        this.props.onSubmit({
            firstName: this.state.firstName,
            lastName: this.state.lastName
        });

        this.setState({
            firstName:"",
            lastName: ""
        })
    };

    handleFirstNameChange = e => {
        console.log('handleFirstNameChange');
        this.setState({
            firstName: e.target.value
        });
    };

    handleLastNameChange = e => {
        console.log('handleLastNameChange');
        this.setState({
            lastName: e.target.value
        });
    };

    render() {
        return (<Form onSubmit={this.handleSubmit}>
            <FormGroup>
                <Label>First Name:</Label>
                <Input required placeholder="First Name" onChange={this.handleFirstNameChange}
                       value={this.state.firstName}/>
            </FormGroup>
            <FormGroup>
                <Label>Last Name:</Label>
                <Input required placeholder="First Name" onChange={this.handleLastNameChange}
                       value={this.state.lastName}/>
            </FormGroup>
            <FormGroup>
                <Button block outline type="submit" color="primary">
                    Create
                </Button>
            </FormGroup>
        </Form>);
    }
}

export default NewUserForm;