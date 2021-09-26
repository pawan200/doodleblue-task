import React, { useState, useContext, useEffect } from "react";
import {
  makeStyles,
  Grid,
  Typography,
  InputBase,
  Paper,
  IconButton,
  Button,
  Modal,
  TextField,
} from "@material-ui/core";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import ContactTable from "../../components/ContactTable/ContactTable";
import { GlobalContext } from "../../context/GlobalState";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  wrapper: { display: "flex", flexDirection: "row", padding: 20 },
  title: { marginLeft: 10 },
  search: {
    width: "80%",
    padding: "0.200rem 1rem",
    display: "flex",
    margin: "2rem 0 3rem 3rem",
    position: "relative",
    borderRadius: 30,
    boxShadow:
      "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12) !important",
  },
  searchIcon: {
    position: "absolute",
    right: 0,
  },
  searchInputBase: {
    "& input": {
      marginTop: 5,
      padding: 10,
    },
  },
  ground: {
    background:
      "linear-gradient(216deg, rgba(254,134,104,1) 0%, rgba(255,103,159,1) 100%)",
    color: "#fff",
    margin: "2.5rem 0 3rem 3rem",
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      marginRight: 10,
    },

    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
      marginRight: 10,
    },
  },
  paper: {
    position: "absolute",
    width: "45%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const colours = [
  "#2ecc71",
  "#f7dc6f",
  "#85c1e9",
  "#ec7063",
  "#DE3163",
  "#9FE2BF",
];
const getColour = () => colours[Math.floor(Math.random() * colours.length)];

const initialValues = {
  id: uuid(),
  fullName: "",
  email: "",
  mobile: "",
  address: "",
  company: "",
  color: getColour(),
};

const ContactHeade = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const { addContact } = useContext(GlobalContext);
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedContact, setSelectedContact] = useState({
    id: "",
    fullName: "",
    email: "",
    company: "",
    mobile: "",
    address: "",
    color: "",
  });

  const { contacts, editContact } = useContext(GlobalContext);
  const [currentContactID, setCurrentContactID] = useState("");

  useEffect(() => {
    const contactID = currentContactID;
    const selectedContact = contacts.find(
      (contact) => contact.id === Number(contactID)
    );
    setSelectedContact(selectedContact);
  }, [currentContactID, contacts]);

  const handleContact = (value) => {
    if (value) {
      props.contactData(value);
    }
  };

  const handleEditContact = (value) => {
    if (value) {
      setIsEdit(true);
      setOpen(true);
      setCurrentContactID(value);
    }
  };

  const validate = () => {
    let temp = {};
    temp.fullName = values.fullName ? "" : "Full Name is required.";
    temp.mobile = values.mobile.length > 9 ? "" : "Minimum 10 number required";
    temp.email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      values.email
    )
      ? ""
      : "Email is not valid";
    temp.address = values.address ? "" : "Address is required";
    temp.company = values.company ? "" : "Company Name is required";
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newContact = values;
      addContact(newContact);
      setOpen(false);
      setValues({});
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editContact(selectedContact);
    setOpen(false);
  };

  const handleEditChanges = (e) => {
    setSelectedContact({ ...selectedContact, [e.target.name]: e.target.value });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add New Contact</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              error={errors.fullName}
              fullWidth
              id="Name"
              label="Full Name"
              variant="outlined"
              name="fullName"
              value={values.fullName}
              onChange={handleInputChange}
              helperText={errors && errors.fullName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              error={errors.mobile}
              fullWidth
              id="Phone number"
              label="Phone number"
              variant="outlined"
              name="mobile"
              value={values.mobile}
              onChange={handleInputChange}
              helperText={errors && errors.mobile}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              error={errors.email}
              fullWidth
              id="Email"
              label="Email"
              variant="outlined"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              helperText={errors && errors.email}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              error={errors.company}
              fullWidth
              id="Company"
              label="Company Name"
              variant="outlined"
              name="company"
              value={values.company}
              onChange={handleInputChange}
              helperText={errors && errors.company}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              error={errors.address}
              fullWidth
              id="Address"
              label="Address"
              variant="outlined"
              multiline
              rows={2}
              name="address"
              value={values.address}
              onChange={handleInputChange}
              helperText={errors && errors.address}
            />
          </Grid>
          <Grid item md={10}></Grid>

          <Grid item md={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ backgroundColor: "rgba(254,134,104,1)" }}
              // onClick={handleSubmit}
              //className={classes.submit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );

  const editBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit Contact Details</h2>
      <form autoComplete="off" onSubmit={handleEditSubmit}>
        {selectedContact && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                error={errors.fullName}
                fullWidth
                id="Name"
                label="Full Name"
                variant="outlined"
                name="fullName"
                value={selectedContact.fullName || ""}
                onChange={handleEditChanges}
                helperText={errors && errors.fullName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                error={errors.mobile}
                fullWidth
                id="Phone number"
                label="Phone number"
                variant="outlined"
                name="mobile"
                value={selectedContact.mobile || ""}
                onChange={handleEditChanges}
                helperText={errors && errors.mobile}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                error={errors.email}
                fullWidth
                id="Email"
                label="Email"
                variant="outlined"
                name="email"
                value={selectedContact.email || ""}
                onChange={handleEditChanges}
                helperText={errors && errors.email}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                error={errors.company}
                fullWidth
                id="Company"
                label="Company Name"
                variant="outlined"
                name="company"
                value={selectedContact.company || ""}
                onChange={handleEditChanges}
                helperText={errors && errors.company}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                error={errors.address}
                fullWidth
                id="Address"
                label="Address"
                variant="outlined"
                multiline
                rows={2}
                name="address"
                value={selectedContact.address || ""}
                onChange={handleEditChanges}
                helperText={errors && errors.address}
              />
            </Grid>
            <Grid item md={10}></Grid>

            <Grid item md={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ backgroundColor: "rgba(254,134,104,1)" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        )}
      </form>
    </div>
  );

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <div className={classes.wrapper}>
          <PermContactCalendarIcon
            style={{
              fontSize: 65,
              color: "rgba(254,134,104,1)",
            }}
          />
          <div>
            <Typography variant="h4" className={classes.title}>
              Contacts
            </Typography>
            <Typography className={classes.title}>
              Welcome to Contact page
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Paper className={classes.search}>
            <InputBase
              placeholder="Search…"
              className={classes.searchInputBase}
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton className={classes.searchIcon}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Button
            variant="contained"
            className={classes.ground}
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Add Contact
          </Button>
        </Grid>
        {isEdit ? (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {editBody}
          </Modal>
        ) : (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        )}

        <Grid item xs={12} style={{ marginTop: "40px" }}>
          <ContactTable
            contactData={handleContact}
            editContact={handleEditContact}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContactHeade;
