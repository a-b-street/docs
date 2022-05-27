import React from 'react';
import Grid from '@mui/material/Grid';
import ltn_scriberia from '../images/ltn_scriberia.jpg';

function Contact(){
  return (


    <div className="CONTACT ROUTE">

      <h2>Get Involved</h2>

        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <img src={ltn_scriberia} class="image-contact" alt="scriberia" title="This image was created by Scriberia for The Turing Way community and is used under a CC-BY 4.0 licence for reuse. Zenodo. DOI 10.5281/zenodo.3332807" />
          </Grid>

        </Grid>

        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
          <ul>
            <li>Add an issue on <a href="https://github.com/a-b-street/abstreet/issues"><u>Github</u></a></li>
            <li>Send us <a href="mailto:dabreegster@gmail.com"><u>an email</u></a></li>
            <li>Submit a request for a workshop <a href="https://forms.gle/YTqavYupYUFC1MdR9"><u>here</u></a></li>
          </ul>
          </Grid>

        </Grid>

  </div>

  );

}

export default Contact;
