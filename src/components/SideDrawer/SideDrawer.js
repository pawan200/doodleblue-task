import React from "react";
import MenuBar from "../MenuBar/MenuBar";
import clsx from "clsx";
import {
  CssBaseline,
  Drawer,
  makeStyles,
  useTheme,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import UpdateOutlinedIcon from "@material-ui/icons/UpdateOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    margin: "auto",
    color: "#fff",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    background:
      "linear-gradient(216deg, rgba(254,134,104,1) 0%, rgba(255,103,159,1) 100%)",
    width: 72,
    [theme.breakpoints.up("sm")]: {
      width: 72,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  list: {
    marginLeft: 10,

    paddingTop: 50,
  },
}));

const SideDrawer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const bottomItemList = [
    {
      text: "Home",
      icon: <HomeOutlinedIcon style={{ color: "#fff" }} />,
    },

    {
      text: "Contact",
      icon: <PersonOutlineOutlinedIcon style={{ color: "#fff" }} />,
    },
    {
      text: "Document",
      icon: <DescriptionOutlinedIcon style={{ color: "#fff" }} />,
    },
    {
      text: "Item",
      icon: <UpdateOutlinedIcon style={{ color: "#fff" }} />,
    },
    {
      text: "Setting",
      icon: <SettingsOutlinedIcon style={{ color: "#fff" }} />,
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuBar />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="#fff"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
        </div>
        <List className={classes.list}>
          {bottomItemList.map((item, index) => (
            <ListItem button key={item.text} style={{ marginBottom: 10 }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
