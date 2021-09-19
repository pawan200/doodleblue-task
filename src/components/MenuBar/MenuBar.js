import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddIcon from "@material-ui/icons/Add";
import { GlobalContext } from "../../context/GlobalState";

const drawerWidth = 70;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  contact: {
    flexGrow: 1,
    margin: "auto",
    paddingLeft: 20,
  },
  appbar: {
    color: "#000",
    backgroundColor: "#fff",
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  button: {
    margin: "auto",
    paddingRight: 20,
  },
}));

const MenuBar = (props) => {
  const classes = useStyles();
  const { contacts } = useContext(GlobalContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [contactMenu, SetContactMenu] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const menuContact = Boolean(contactMenu);
  const [name, setName] = useState("Pawan Singh");

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const contactMenuOpenHandler = (event) => {
    SetContactMenu(event.currentTarget);
  };

  const closeContactMenuHandler = (event) => {
    SetContactMenu(null);
  };

  const changeNameHandler = (name) => {
    console.log("event", name);
    setName(name);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );

  const contactMenuId = "contact-search-account-menu";

  const listAllContacts = (
    <Menu
      id={contactMenuId}
      anchorEl={contactMenu}
      open={menuContact}
      onClose={closeContactMenuHandler}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {contacts.map((contact) => {
        console.log("contact", contact);
        if (contact.fullName !== name)
          return (
            <MenuItem
              key={contact.id}
              value={contact.fullName}
              onClick={() => changeNameHandler(contact.fullName)}
            >
              {contact.fullName}
            </MenuItem>
          );
      })}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <IconButton aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button
              color="inherit"
              className={classes.button}
              startIcon={<AddIcon />}
            >
              Add
            </Button>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <MailIcon style={{ fontSize: 20 }} />
              </Badge>
            </IconButton>
            <Typography variant="h6" className={classes.contact}>
              {name}
            </Typography>
            <IconButton
              aria-label={contactMenuId}
              color="inherit"
              onClick={contactMenuOpenHandler}
            >
              <ArrowDropDownIcon style={{ fontSize: 30 }} />
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge variant="dot" color="secondary">
                <NotificationsIcon style={{ fontSize: 20 }} />
              </Badge>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {listAllContacts}
    </div>
  );
};
export default MenuBar;
