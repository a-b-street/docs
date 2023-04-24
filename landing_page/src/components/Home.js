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
    this.setState({ carousel: index})
  }

  render(){
  return (

    <div className="HOME ROUTE">

      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={1}>
          <a href="https://play.abstreet.org/0.3.43/abstreet.html"><img src={web} class="image-logo" alt="web" /></a>
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
        <Grid item xs={4}></Grid>
      </Grid>

      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}><h1>Open source software for planning less car-centric cities.</h1></Grid>
        <Grid item xs={2}></Grid>
    </Grid>

      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Carousel onChange={this.onChange} infiniteLoop>
              <div>
                  <img src={traffic_sim} alt="The traffic simulator running in downtown Seattle" />
              </div>
              <div>
                  <img src={ltn} alt="The low-traffic neighbourhood tool running in London" />
              </div>
              <div>
                  <img src={fifteen_min} alt="The 15-min neighbourhood tool showing unequal access to services in West Seattle" />
              </div>
              <div>
                  <img src={santa} alt="15-minute Santa" />
              </div>
              <div>
                  <img src={ungap_map} alt="Ungap the Map showing a proposed cycle lane in South Seattle" />
              </div>
            </Carousel>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          { this.state.carousel === 0 && (
            <div className="carouselItem">
              <h3> Traffic Simulator </h3>
                <ul>
                  <li>edit roads & intersections to view traffic impact</li>
                  <li>visualise drivers, pedestrians, and cyclists moving around</li>
                  <li>see how changes affect travel time and safety</li>
                </ul>
              <p> Learn more <a href="https://a-b-street.github.io/docs/software/abstreet.html"><u>here</u></a>.</p>
            </div>
          )}

          { this.state.carousel === 1 && (
            <div className="carouselItem">
              <h3> Low-traffic neighbourhoods </h3>
                <ul>
                  <li>understand how drivers may shortcut through neighbourhoods</li>
                  <li>experiment with placing filters to create safer residential streets</li>
                </ul>
              <p> Learn more <a href="https://a-b-street.github.io/docs/software/ltn/index.html"><u>here</u></a>.</p>
            </div>
          )}

          { this.state.carousel === 2 && (
            <div className="carouselItem">
              <h3> 15-min neighbourhoods </h3>
                <ul>
                  <li>see what shops, libraries, etc. are reachable within a 15-minute walk or cycle</li>
                  <li>find houses that meet your definition of "walkability"</li>
                </ul>
              <p> Learn more <a href="https://a-b-street.github.io/docs/software/fifteen_min.html"><u>here</u></a>.</p>
            </div>
          )}

          { this.state.carousel === 3 && (
            <div className="carouselItem">
              <h3> 15-min Santa </h3>
                <ul>
                  <li>deliver presents around Seattle as Santa</li>
                  <li>create new shops near residential areas to improve your score</li>
                  <li>highlights importance of living close to where you work and shop</li>
                </ul>
              <p> Learn more <a href="https://a-b-street.github.io/docs/software/santa.html"><u>here</u></a>.</p>
            </div>
          )}

          { this.state.carousel === 4 && (
            <div className="carouselItem">
              <h3> Ungap the Map </h3>
                <ul>
                  <li>view cycling infrastructure & fill in missing links</li>
                  <li>explore routing tradeoffs between speed, safety, and avoiding hills</li>
                  <li>predict how many people will cycle</li>
                </ul>
              <p> Learn more <a href="https://a-b-street.github.io/docs/software/ungap_the_map/index.html"><u>here</u></a>.</p>
            </div>
          )}

        </Grid>
        <Grid item xs={2}></Grid>
    </Grid>


  </div>

  );

}

}

export default Home;
