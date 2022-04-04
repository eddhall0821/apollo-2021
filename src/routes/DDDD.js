if (!match) {
  text = text.trim();

  roomClient.sendChatMessage(text);

  const topDiv = document.createElement("div");
  const iconDiv = document.createElement("div");
  const bodyDiv = document.createElement("div");
  const titleP = document.createElement("p");
  const textP = document.createElement("p");
  const peerMe = document.getElementsByClassName("peer is-me");

  topDiv.appendChild(iconDiv);
  topDiv.appendChild(bodyDiv);
  bodyDiv.appendChild(titleP);
  bodyDiv.appendChild(textP);

  topDiv.className = "notification info Appear-appear-done Appear-enter-done";
  iconDiv.className = "icon";
  bodyDiv.className = "body";
  titleP.className = "title";
  textP.className = "text";

  titleP.textContent = peerMe[0].children[0].textContent + " says:";
  textP.textContent = text;

  const myChat = document.getElementsByClassName("myChat")[0];

  myChat.appendChild(topDiv);
}

const chat = (text) => {
  return (
    <div className="notification info Appear-appear-done Appear-enter-done">
      <div className="icon">
        <div className="body">
          <div className="title">
            <div className="text">{text}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
