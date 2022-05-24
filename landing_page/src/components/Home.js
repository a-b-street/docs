import React from 'react';
import Grid from '@mui/material/Grid';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import web from '../images/web.png';
import linux from '../images/linux.png';
import mac from '../images/mac.png';
import windows from '../images/windows.png';
import traffic_sim from '../images/traffic_sim.png'
import ungap_map from '../images/ungap_map.png'
import fifteen_min from '../images/fifteen_min.png'
import santa from '../images/santa.png'
import ltn from '../images/ltn.png'

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {carousel: 0};
    this.onChange = this.onChange.bind(this)
  }

  onChange (index, item){
    this.setState({ carousel: this.state.carousel = index})
  }

  render(){
  return (

    <div className="HOME ROUTE">

      <Grid container spacing={1}>
        <Grid item xs={4}></Grid>
        <Grid item xs={1}>
          <a href="http://play.abstreet.org/0.3.18/abstreet.html"><img src={web} class="image-logo" alt="web" /></a>
        </Grid>
        <Grid item xs={1}>
          <a href="https://a-b-street.github.io/docs/user/index.html"><img src={linux} class="image-logo" alt="linux" /></a>
        </Grid>
        <Grid item xs={1}>
          <a href="https://a-b-street.github.io/docs/user/index.html"><img src={mac} class="image-logo" alt="mac" /></a>
        </Grid>
        <Grid item xs={1}>
          <a href="https://a-b-street.github.io/docs/user/index.html"><img src={windows} class="image-logo" alt="windows" /></a>
        </Grid>
      </Grid>

      <h1>Open source software for planning less car-centric cities.</h1>

      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <Carousel onChange={this.onChange} infiniteLoop>
              <div>
                  <img src={traffic_sim} />
              </div>
              <div>
                  <img src={ltn} />
              </div>
              <div>
                  <img src={fifteen_min} />
              </div>
              <div>
                  <img src={santa} />
              </div>
              <div>
                  <img src={ungap_map} />
              </div>
            </Carousel>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          { this.state.carousel == 0 && (
            <div className="carouselItem">
              <h3> Traffic Simulator </h3>
                <ul>
                  <li>edit roads and intersections to view impact on traffic</li>
                  <li>visualise drivers, buses, pedestrians, and cyclists moving around</li>
                  <li>see how changes affect people's travel time and safety</li>
                </ul>
              <p> Learn more <a href="https://a-b-street.github.io/docs/software/abstreet.html"><u>here</u></a>.</p>
            </div>
          )}

          { this.state.carousel == 1 && (
            <div className="carouselItem">
              <h3> Low-traffic neighbourhoods </h3>
                <ul>
                  <li>understand how drivers may shortcut through neighbourhoods</li>
                  <li>experiment with placing filters to create safer residential streets</li>
                </ul>
              <p> Learn more <a href="https://a-b-street.github.io/docs/software/ltn/index.html"><u>here</u></a>.</p>
            </div>
          )}

          { this.state.carousel == 2 && (
            <div className="carouselItem">
              <h3> 15-min neighbourhoods </h3>
                <ul>
                  <li>see what shops, libraries, health facilities, etc are reachable within a 15-minute walk or cycle ride</li>
                  <li>find houses that meet your definition of "walkability"</li>
                </ul>
              <p> Learn more <a href="https://a-b-street.github.io/docs/software/fifteen_min.html"><u>here</u></a>.</p>
            </div>
          )}

          { this.state.carousel == 3 && (
            <div className="carouselItem">
              <h3> 15-min Santa </h3>
                <ul>
                  <li>a game teaching the importance of letting people live close to where they work and shop</li>
                  <li>deliver presents around Seattle as efficiently as possible</li>
                  <li>create new shops near residential areas to improve your score</li>
                </ul>
              <p> Learn more <a href="https://a-b-street.github.io/docs/software/santa.html"><u>here</u></a>.</p>
            </div>
          )}

          { this.state.carousel == 4 && (
            <div className="carouselItem">
              <h3> Ungap the Map </h3>
                <ul>
                  <li>view existing cycling infrastructure & fill in missing links in the cycle network</li>
                  <li>explore routing tradeoffs between speed, safety, and avoiding hills</li>
                  <li>predict how many people will decide to cycle</li>
                </ul>
              <p> Learn more <a href="https://a-b-street.github.io/docs/software/ungap_the_map/index.html"><u>here</u></a>.</p>
            </div>
          )}

        </Grid>
    </Grid>


  </div>

  );

}

}

export default Home;
