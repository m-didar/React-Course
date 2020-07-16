import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  constructor(props){
    super(props);

    this.state = {

    }
  };

  renderDish(dish) {
    if (dish != null) {
      return(
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    } else {
      return(
        <div></div>
      );
    }
  }

  renderComments(comments) {
      if (comments) {
          return (
              <div className="col-12 col-md-auto m-1">
                  <h4 className="text-left ml-3">Comment</h4>
                  <ul className="list-unstyled">
                      {comments.map((comment) => {
                          let date = new Date(comment.date);
                          let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                          return (
                              <li>
                                  <div className="col-12 text-left mt-3">
                                      {comment.comment}
                                  </div>
                                  <div className="col-12 text-left mt-3">
                                      -- {comment.author} , {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
                                  </div>
                              </li>
                          );
                      })}
                  </ul>
              </div>
          )
      } else {
          return(
              <div></div>
          )
      }
  };

  render() {
    return(
        <div className="row">
          <div className="col-12 col-md-5 m-1">
              { this.renderDish(this.props.selectedDish) }
          </div>
            { this.renderComments(this.props.selectedDish?.comments) }
        </div>
    )
  }
  
}

export default DishDetail;