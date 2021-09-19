import React, { useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import ContactHeade from "./ContactHeade";
import ContactCard from "../../components/ContactCard/ContactCard";
const drawerWidth = 70;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: 100,
    marginLeft: "7%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "20%",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Contact = (props) => {
  const classes = useStyles();
  const [contact, setContact] = useState({});

  const handleContactData = (data) => {
    if (data) {
      setContact(data);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6} align="left">
          <ContactHeade contactData={handleContactData} />
        </Grid>
        <Grid item xs={12} lg={6} align="center">
          <ContactCard
            name={contact["fullName"]}
            color={contact["color"]}
            company={contact["company"]}
            email={contact["email"]}
            mobile={contact["mobile"]}
            address={contact["address"]}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Contact;
