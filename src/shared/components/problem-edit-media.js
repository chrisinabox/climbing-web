import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import { FormGroup, ControlLabel, ButtonGroup, Button, Well } from 'react-bootstrap';
import ImageUpload from './common/image-upload/image-upload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getProblem, postProblemMedia } from './../api';

class ProblemEditMedia extends Component {
  componentDidMount() {
    this.refresh(this.props.match.params.problemId);
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.match.params.problemId !== this.props.match.params.problemId) {
      this.refresh(this.props.match.params.problemId);
    }
  }

  refresh(id) {
    getProblem(this.props.auth.getAccessToken(), id).then((data) => this.setState({id: data.id, isAuthenticated: data.metadata.isAuthenticated}));
  }

  onNewMediaChanged(newMedia) {
    this.setState({newMedia});
  }

  save(event) {
    event.preventDefault();
    this.setState({isSaving: true});
    postProblemMedia(this.props.auth.getAccessToken(), this.state.id, this.state.newMedia)
    .then((response) => {
      this.setState({pushUrl: "/problem/" + response.id});
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  onCancel() {
    window.history.back();
  }

  render() {
    if (!this.state || !this.state.id) {
      return <center><FontAwesomeIcon icon="spinner" spin size="3x" /></center>;
    } else if (this.state.pushUrl) {
      return (<Redirect to={this.state.pushUrl} push />);
    } else if (!this.state.isAuthenticated) {
      this.setState({pushUrl: "/login"});
    }

    return (
      <span>
        <Well>
          <form onSubmit={this.save.bind(this)}>
            <FormGroup controlId="formControlsMedia">
              <ImageUpload auth={this.props.auth} onMediaChanged={this.onNewMediaChanged.bind(this)} />
            </FormGroup>
            <ButtonGroup><Button bsStyle="danger" onClick={this.onCancel.bind(this)}>Cancel</Button><Button type="submit" bsStyle="success" disabled={this.state.isSaving}>{this.state.isSaving? 'Saving...' : 'Save'}</Button></ButtonGroup>
          </form>
        </Well>
      </span>
    );
  }
}

export default ProblemEditMedia;