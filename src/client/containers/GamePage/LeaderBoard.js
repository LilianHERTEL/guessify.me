import React from 'react';

function LeaderBoard(props) {
    return (
        <Paper>
        <AppBar position="static">
          <Tabs aria-label="simple tabs example">
            <Tab label="Players" />
            <Tab label="Statistic" />
          </Tabs>
        </AppBar>
        
        <Box minHeight="300px" height={0.75} overflow="auto">
          <List >

            <ListItemSample />
            <ListItemSample />





          </List>
        </Box>
        <Grid container alignItems="center" justify="center" spacing={1} align="center">
          <Grid item>LeaderBoard</Grid>
          <Grid item>
            <Switch
              value="checkedC"
            />
          </Grid>
          <Grid item>Draw Order</Grid>
        </Grid>
      </Paper>
    )
}

export default LeaderBoard;