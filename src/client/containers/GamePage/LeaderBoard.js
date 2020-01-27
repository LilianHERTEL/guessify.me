import React from 'react';

function LeaderBoard(props) {
    return (
      <Paper>
      <AppBar position="static">
        <Tabs aria-label="simple tabs example" onChange={handleChange} value={value} variant="fullWidth">
          <Tab label="Players" />
          <Tab label="Statistic" />
        </Tabs>
      </AppBar>
      <Box minHeight="250px" overflow="auto">
        <TabPanel value={value} index={0} >
          <List>
            {
              listPlayer.map((player, index) => <PlayerList key={index} index={index} username={player.username} id={player.socketID} score={player.pointsTotal} />)
            }
          </List>
        </TabPanel>
        <TabPanel value={value} index={1}>Item Two</TabPanel>
      </Box>
      <Grid container alignItems="center" justify="center" align="center">
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