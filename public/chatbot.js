// chatbot-widget.js
(function (w, d) {
  w.ChatbotWidget = function () {
    var chatInput = d.createElement("input");
    var chatOutput = d.createElement("div");
    var chatButton = d.createElement("button");
    var loadingMessage = d.createElement("p");

    chatInput.id = "chat-input";
    chatOutput.id = "chat-output";
    chatButton.id = "chat-button";
    loadingMessage.id = "loading-message";

    chatButton.textContent = "Chat";
    loadingMessage.textContent = "Loading...";

    chatButton.style.position = "fixed";
    chatButton.style.bottom = "20px";
    chatButton.style.right = "20px";
    chatButton.style.backgroundColor = "#0084FF";
    chatButton.style.color = "white";
    chatButton.style.border = "none";
    chatButton.style.borderRadius = "50%";
    chatButton.style.width = "60px";
    chatButton.style.height = "60px";
    chatButton.style.fontSize = "24px";
    chatButton.style.cursor = "pointer";

    chatInput.style.position = "fixed";
    chatInput.style.right = "20px";
    chatInput.style.width = "300px";
    chatInput.style.height = "40px";
    chatInput.style.border = "1px solid #ccc";
    chatInput.style.backgroundColor = "white";
    chatInput.style.padding = "10px";
    chatInput.style.boxSizing = "border-box";
    chatInput.style.display = "none";
    chatInput.style.bottom = "90px";

    chatOutput.style.position = "fixed";
    chatOutput.style.right = "20px";
    chatOutput.style.width = "300px";
    chatOutput.style.height = "400px";
    chatOutput.style.border = "1px solid #ccc";
    chatOutput.style.backgroundColor = "white";
    chatOutput.style.padding = "10px";
    chatOutput.style.boxSizing = "border-box";
    chatOutput.style.display = "none";
    chatOutput.style.bottom = "130px";
    chatOutput.style.overflowY = "auto";

    loadingMessage.style.display = "none";

    d.body.appendChild(chatOutput);
    d.body.appendChild(chatInput);
    d.body.appendChild(chatButton);
    d.body.appendChild(loadingMessage);

    var messages = [];

    chatButton.addEventListener("click", function () {
      var isChatOpen = chatInput.style.display !== "none";
      chatInput.style.display = isChatOpen ? "none" : "block";
      chatOutput.style.display = isChatOpen ? "none" : "block";

      if (!isChatOpen) {
        chatOutput.innerHTML = messages.join("");
        chatOutput.scrollTop = chatOutput.scrollHeight;
      }
    });

    chatInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var message = chatInput.value;
        chatInput.value = "";

        messages.push(
          '<p style="text-align: right; color: blue; border: 1px solid blue; border-radius: 5px; padding: 5px;">' +
            message +
            "</p>"
        );
        chatOutput.innerHTML = messages.join("");
        chatOutput.scrollTop = chatOutput.scrollHeight;

        loadingMessage.style.display = "block";

        fetch("https://51.20.105.60.nip.io:8000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: message, plan: "ZYRUS-3" }),
        })
          .then((response) => response.json())
          .then((data) => {
            loadingMessage.style.display = "none";

            messages.push(
              "<p style='color: green; border: 1px solid green; border-radius: 5px; padding: 5px;'>" +
                data.message +
                "</p>"
            );
            chatOutput.innerHTML = messages.join("");
            chatOutput.scrollTop = chatOutput.scrollHeight;
          });
      }
    });
  };
})(window, document);
