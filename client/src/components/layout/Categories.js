import React from "react";
import { Card, CardColumns } from "react-bootstrap";

const Categories = () => {
  return (
    <div className="products-catagories-area clearfix">
      <div className="amado-pro-catagory clearfix">
        <CardColumns>
          <Card className="single-products-catagory clearfix">
            <a href="shop.html">
              <Card.Img
                src={require("../../img/bg-img/1.jpg").default}
                alt="Card image"
              />
              <Card.ImgOverlay>
                <div className="hover-content">
                  <div className="line"></div>
                  <p>From $180</p>
                  <h4>Modern Chair</h4>
                </div>
              </Card.ImgOverlay>
            </a>
          </Card>
          <Card className="single-products-catagory clearfix">
            <a href="shop.html">
              <Card.Img
                src={require("../../img/bg-img/2.jpg").default}
                alt="Card image"
              />
              <Card.ImgOverlay>
                <div className="hover-content">
                  <div className="line"></div>
                  <p>From $180</p>
                  <h4>Minimalistic Plant Pot</h4>
                </div>
              </Card.ImgOverlay>
            </a>
          </Card>
          <Card className="single-products-catagory clearfix">
            <a href="shop.html">
              <Card.Img
                src={require("../../img/bg-img/3.jpg").default}
                alt="Card image"
              />
              <Card.ImgOverlay>
                <div className="hover-content">
                  <div className="line"></div>
                  <p>From $180</p>
                  <h4>Minimalistic Plant Pot</h4>
                </div>
              </Card.ImgOverlay>
            </a>
          </Card>
          <Card className="single-products-catagory clearfix">
            <a href="shop.html">
              <Card.Img
                src={require("../../img/bg-img/4.jpg").default}
                alt="Card image"
              />
              <Card.ImgOverlay>
                <div className="hover-content">
                  <div className="line"></div>
                  <p>From $180</p>
                  <h4>Minimalistic Plant Pot</h4>
                </div>
              </Card.ImgOverlay>
            </a>
          </Card>
          <Card className="single-products-catagory clearfix">
            <a href="shop.html">
              <Card.Img
                src={require("../../img/bg-img/5.jpg").default}
                alt="Card image"
              />
              <Card.ImgOverlay>
                <div className="hover-content">
                  <div className="line"></div>
                  <p>From $180</p>
                  <h4>Minimalistic Plant Pot</h4>
                </div>
              </Card.ImgOverlay>
            </a>
          </Card>
        </CardColumns>
      </div>
    </div>
  );
};

export default Categories;
