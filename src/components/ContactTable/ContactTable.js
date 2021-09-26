import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, Grid } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { GlobalContext } from "../../context/GlobalState";
import { Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@mui/icons-material/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    fontSize: "1rem",
    fontWeight: 600,
    marginRight: 60,
  },
  secondHeadr: {
    fontSize: "1rem",
    fontWeight: 600,
    marginLeft: "26%",
  },
}));

export default function CheckboxList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const { contacts, removeContact } = useContext(GlobalContext);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleViewContact = (data) => {
    props.contactData(data);
  };

  const editContacthandler = (data) => {
    props.editContact(data);
  };

  return (
    <List
      className={classes.root}
      subheader={
        <React.Fragment>
          <ListSubheader component="div" id="nested-list-subheader">
            <span className={classes.header}> + </span>
            <span className={classes.header}>Basic Info</span>
            <span className={classes.secondHeadr}>Company</span>
          </ListSubheader>
        </React.Fragment>
      }
    >
      {contacts.map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        let color = value.color.toString();

        return (
          <ListItem
            key={value.id}
            role={undefined}
            dense
            button
            onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: color, textAlign: "center" }}>
                {value.fullName.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <ListItemText
                  id={labelId}
                  primary={value.fullName}
                  //secondary={value.email}
                  secondary={
                    <React.Fragment>
                      <Typography
                        style={{ display: "inline", wordWrap: "break-word" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {value.email}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemText
                  id={labelId}
                  style={{ marginTop: 10 }}
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline", wordWrap: "break-word" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {value.company}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemSecondaryAction
                  style={{ margin: "auto", paddingBottom: 15 }}
                >
                  <Tooltip title="Edit" arrow>
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      onClick={() => editContacthandler(value.id)}
                      style={{ marginRight: 20 }}
                    >
                      <EditIcon style={{ color: "blue" }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete" arrow>
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      onClick={() => removeContact(value.id)}
                      style={{ marginRight: 20 }}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View" arrow>
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      onClick={() => handleViewContact(value)}
                    >
                      <ViewColumnIcon style={{ color: "green" }} />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </Grid>
            </Grid>
          </ListItem>
        );
      })}
    </List>
  );
}
