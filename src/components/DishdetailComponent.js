import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const minLength = (len) => (val) => (val) && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    toggleModal() {
        this.setState({
           isModalOpen: !this.state.isModalOpen
        });
    };

    handleComment(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return(
            <React.Fragment>
                <Button outline button onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleComment(values)}>
                            <Row className="form-group">
                                <Label for="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" className="form-control" id="rating" name="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label for="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" className="form-control"  placeholder="Your Name" validators={{
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }} id="author" name="author" />
                                    <Errors model=".author" className="text-danger" show="touched" messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label for="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" className="form-control" rows="6" id="comment" name="comment" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

function RenderDish({dish}) {
    if (dish != null) {
      return(
          <FadeTransform in transform={{
              exitTransform: 'scale(0.5) translateY(-50%)'
          }}>
                <Card>
                  <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
                </Card>
          </FadeTransform>
      );
    } else {
      return(
        <div></div>
      );
    }
  }

function RenderComments({comments, postComment, dishId}) {
      if (comments) {
          return (
              <div className="col-12 col-md-auto m-1">
                  <h4 className="text-left ml-3">Comment</h4>
                  <ul className="list-unstyled">
                      <Stagger in>
                          {comments.map((comment) => {
                              return (
                                  <Fade in>
                                      <li>
                                          <div className="col-12 text-left mt-3">
                                              {comment.comment}
                                          </div>
                                          <div className="col-12 text-left mt-3">
                                              -- {comment.author} , {new Intl.DateTimeFormat(
                                                                'en-US',
                                                                { year: 'numeric',
                                                                         month: 'short',
                                                                         day: '2-digit'
                                                                        }).format(new Date(Date.parse(comment.date)))}
                                          </div>
                                      </li>
                                  </Fade>
                              );
                          })}
                      </Stagger>
                  </ul>
                  <CommentForm dishId={dishId} postComment={postComment} />
              </div>
          )
      } else {
          return(
              <div></div>
          )
      }
  };

  const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    } else if (props.errMess){
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-5 m-1">
                  <RenderDish dish={props.dish} />
              </div>
                <RenderComments comments={props.comments}
                                postComment={props.postComment}
                                dishId={props.dish.id} />
            </div>
        </div>
    )
  }



export default DishDetail;