import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TabPane, Row, Col, Card, CardBody } from 'reactstrap';
import swal from 'sweetalert';
import { deleteLikedRecipe } from '../../store/actions/likedRecipe';
import { useDispatch } from 'react-redux';
import { getListLikedRecipe } from '../../store/actions/likedRecipe';
import jwt_decode from 'jwt-decode';

const Image = styled.img`
  width: 270px;
  height: 180px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
`;

const Title = styled.p`
  width: 150px;
  font-size: 24px;
  font-family: 'Airbnb Cereal App Medium';
  color: var(--color-1);
  position: absolute;
  bottom: 0;
  left: 15px;
`;

const Option = styled.div`
  position: absolute;
  top: 10px;
  right: 0;

  @media screen and (max-width: 576px) {
    top: 10px;
    right: 70px;
  }
`;

function LikedRecipe({ me, likedRecipe }) {
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (likedRecipe) {
      setLoading(false);
    }
  }, []);

  const deleteRecipe = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this recipe',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        deleteLikedRecipe(id)
          .then((res) => {
            swal({
              title: 'Success!',
              text: res.message,
              icon: 'success'
            });
            dispatch(getListLikedRecipe(decoded.id));
          })
          .catch((err) => {
            swal({
              title: 'Failed!',
              text: err.response.data.message,
              icon: 'error'
            });
          });
      }
    });
  };

  return (
    <TabPane tabId="liked">
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-2 gx-4 mt-4 ml-5">
        {loading ? (
          <div />
        ) : (
          likedRecipe.data.map((item) => (
            <Col key={item.id}>
              <Card className="border-0">
                <CardBody className="p-0">
                  <Image
                    src={`${
                      process.env.REACT_APP_STAGING === 'dev'
                        ? `${process.env.REACT_APP_DEV}uploads/recipe/${item.image}`
                        : `${process.env.REACT_APP_PROD}uploads/recipe/${item.image}`
                    }`}
                    alt={item.title}
                  />
                  <Title>{item.title}</Title>
                  <Option>
                    <Link to={`/recipe/${item.id}`} className="btn-view">
                      <i className="fa-solid fa-eye" title="View Recipe" />
                    </Link>
                    {me && (
                      <button onClick={() => deleteRecipe(item.id)} className="btn-delete">
                        <i className="far fa-trash-can" title="Delete Recipe" />
                      </button>
                    )}
                  </Option>
                </CardBody>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </TabPane>
  );
}

export default LikedRecipe;
