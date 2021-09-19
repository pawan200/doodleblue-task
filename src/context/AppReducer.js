export default function AppReducer(state, action) {
  switch (action.type) {
    case "REMOVE_CONTACT":
      return {
        contacts: state.contacts.filter((contact) => {
          return contact.id !== action.payload;
        }),
      };

    case "ADD_CONTACT":
      return {
        contacts: [action.payload, ...state.contacts],
      };

    case "EDIT_CONTACT":
      const updateContact = action.payload;

      const updateContacts = state.contacts.map((contact) => {
        if (contact.id === updateContact) {
          return updateContact;
        }
        return contact;
      });
      return {
        contacts: updateContacts,
      };

    default:
      return state;
  }
}
