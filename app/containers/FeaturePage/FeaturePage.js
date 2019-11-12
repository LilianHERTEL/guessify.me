/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import { Paper, Grid, Box, Container, LinearProgress, Typography } from '@material-ui/core';

export default class FeaturePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Box my={2} className="page">
        <Container maxWidth="lg" className="fullHeight">
          <Grid container direction="row" justify="center" alignItems="stretch" spacing={1} className="fullHeight">
            <Grid item xs={12} md={9}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h4" align="center">thomasxd24 is drawing...</Typography>
                </Grid>
                <Grid item xs={12}>
                  <LinearProgress />
                </Grid>
                <Grid item xs={12}>
                  <Paper>
                    <canvas className="canvas">
                    </canvas>
                  </Paper>
                </Grid>
              </Grid>


            </Grid>
            <Grid item xs={12} md={3}>
              <div className="rightPanel">
                <Paper>
                  <Box p={2} width={1}>
                    <Typography variant="button" display="block" gutterBottom>
                      Drawer : thomasxd24
      </Typography>
                    <Typography variant="button" display="block" gutterBottom>
                      Participant: 5/20
      </Typography>
                    <Typography variant="button" display="block" gutterBottom>
                      Drawer : thomasxd24
      </Typography>
                    <Typography variant="button" display="block" gutterBottom>
                      Participant: 5/20
      </Typography>

                  </Box>
                </Paper>
                <div className="chat ">
                  <Paper  className="fullHeight">
                    hi
                  </Paper>
                </div>
              </div>

            </Grid>
          </Grid>



        </Container>
      </Box>

    );
  }
}
