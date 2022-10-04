import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material"


export const Navbar = () => {

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
