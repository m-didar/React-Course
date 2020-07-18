import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({dish}) {
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

function RenderComments({comments}) {
      if (comments) {
          return (
              <div className="col-12 col-md-auto m-1">
                  <h4 className="text-left ml-3">Comment</h4>
                  <ul className="list-unstyled">
                      {comments.map((comment) => {
                          return (
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

  const DishDetail = (props) => {
    return(
        <div className="container">
            <div className="row">
              <div className="col-12 col-md-5 m-1">
                  <RenderDish dish={props.dish} />
              </div>
                <RenderComments comments={props.dish?.comments} />
            </div>
        </div>
    )
  }



export default DishDetail;