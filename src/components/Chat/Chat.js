import * as React from "react";
import { CometChatUI } from "../../lib/CometChat/CometChatWorkspace/src";
import { CometChat } from "@cometchat-pro/chat";
import * as CONSTANTS from "../../constants/constants";

export default function Chat(props) {
  console.log("chatProps", props.uID);
  const authKey = CONSTANTS.AUTH_KEY;
  const uid = props.uID;

  CometChat.login(uid, authKey).then(
    (user) => {
      console.log("Login Successful:", { user });
    },
    (error) => {
      console.log("Login failed with exception:", { error });
    }
  );
  return (
    <div>
      <div style={{ width: "600px", height: "500px" }}>
        <CometChatUI />
      </div>
    </div>
  );
}
