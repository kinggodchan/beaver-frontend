import React from "react";

const BodyContent = () => {
  return (
    <div>
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        {/* Indicators */}
        <ol className="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>

        {/* Wrapper for slides */}
        <div className="carousel-inner" role="listbox">
          <div className="item active">
            <img src="soccer1.png" alt="New York" width="1200" height="700" />
            <div className="carousel-caption">
              <h3>KICK OFF</h3>
            </div>
          </div>

          <div className="item">
            <img src="soccer1.png" alt="Chicago" width="1200" height="700" />
            <div className="carousel-caption">
              <h3>Chicago</h3>
              <p>Thank you, Chicago - A night we won't forget.</p>
            </div>
          </div>

          <div className="item">
            <img src="soccer1.png" alt="Los Angeles" width="1200" height="700" />
            <div className="carousel-caption">
              <h3>LA</h3>
              <p>Even though the traffic was a mess, we had the best time playing at Venice Beach!</p>
            </div>
          </div>
        </div>

        {/* Left and right controls */}
        <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default BodyContent;
