import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Avatar,
  Grid,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    marginTop: "10%",
    backgroundColor: "#F5F5F5",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    marginTop: 10,
  },
  pos: {
    marginBottom: 30,
    textTransform: "Capitalize",
    fontSize: 14,
    fontWeight: 600,
    wordWrap: "break-word",
  },

  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    marginTop: 20,
    fontSize: 30,
    textAlign: "center",
  },
  noContact: {
    margin: "10rem",
  },
}));

export default function ContactCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {props.name && (
        <CardContent>
          <Avatar
            className={classes.large}
            style={{
              backgroundColor: props.color.toString(),
            }}
          >
            {props.name.charAt(0)}
          </Avatar>
          <Typography className={classes.title}>{props.name}</Typography>

          <Typography color="textSecondary">{props.company}</Typography>
          <Grid container align="left" style={{ marginTop: 40 }}>
            <Grid item xs={6}>
              <Typography className={classes.pos} color="textSecondary">
                first Name:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.pos} color="textSecondary">
                {props.name}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography className={classes.pos} color="textSecondary">
                email:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.pos} color="textSecondary">
                {props.email}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.pos} color="textSecondary">
                phone:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.pos} color="textSecondary">
                {props.mobile}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.pos} color="textSecondary">
                company:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.pos} color="textSecondary">
                {props.company}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.pos} color="textSecondary">
                address:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.pos} color="textSecondary">
                {props.address}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      )}
      {!props.name && (
        <CardContent className={classes.noContact}>
          <Typography color="textSecondary">No Contact Selected</Typography>
        </CardContent>
      )}
    </Card>
  );
}
