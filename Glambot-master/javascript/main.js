// Icon click
document.getElementById("chat-icon")?.addEventListener("click", () => {
  document
    .getElementById("chatbox-container")
    ?.classList.toggle("chatbox-container-active");
  document
    .getElementById("chat-icon")
    ?.classList.toggle("icon-container-active");
});

document.getElementById("chat-close")?.addEventListener("click", () => {
  document
    .getElementById("chatbox-container")
    ?.classList.remove("chatbox-container-active");
  document
    .getElementById("chat-icon")
    ?.classList.remove("icon-container-active");
});

console.log(stringSimilarity);

// Message handler
let messages = [];

const chatbotDataset = [
  {
    question: [
      "pain",
    ],
    answer: "If you're experiencing pains across the body, I recommend you undergo physical therapies. This can include massages, hydrotherapy or acupuncture. However, sleep is the best remedy in most cases."
  },
  {
    question: [
      "Hello",
      "Hi",
      "Hey",
      "Hi there",
      "Hello there",
      "Hi bot",
      "wassup",
      "wsg",
      "yo",
    ],
    answer: "Hello there, my name is MediPal! If you are experiencing any medical issues, I'm here to help!",
  },
  {
    question: [
      "back",
    ],
    answer: 'To treat your back pain, I recommend you take a painkiller such as Ibuprofen or Paracetamol and rest for a few days. However, if you have recently experienced trauma, please <a href="https://www.goldcoast.health.qld.gov.au/hospitals-and-centres/gold-coast-university-hospital" target="_blank">Seek Medical Assistance</a>',
  },
  {
    question: [
      "chest",
    ],
    answer: 'For temporary chest pain, I recommend that you avoid lying down after eating, and consume medications like Nitroglycerin, Aspirin, Thrombolytics or Blood Thinners based on your situation to minimise your pain.'
  },
  {
    question: [
      "broken",
    ],
    answer: "If you're bone is broken, why didn't you call <a href='https://www.qld.gov.au/emergency/emergencies-services/first-aid' target='_blank'>emergency services</a> already? "
  },
  {
    question: ["Indian?", "you indian?"],
    answer:
      '<a href="https://www.youtube.com/watch?v=AzbnK62Zizc" target="_blank">Beautiful Cultural Music Representing the Diversity of India</a>',
  },
  {
    question: ["Thank you"],
    answer: "Anytime! I'm always happy to help 😊.",
  },
];

const getAnswer = (question) => {
  let answer = 'Sorry, I do not understand. Maybe ask in another way? If you are stuck, you can always ask <a href="https://www.google.com" target="_blank">Google.</a>';
  chatbotDataset.forEach((data) => {
    const result = data.question.map((q) =>
      stringSimilarity.compareTwoStrings(
        q.toLowerCase(),
        question.toLowerCase()
      )
    );

    const max = Math.max(...result);

    if (max > 0.5) {
      answer = data.answer;
    }
  });

  return answer;
};

const messageHandler = ({ message, owner }) => {
  const chatBody = document.getElementById("chat-body");
  messages.push({ id: messages.length + 1, message, owner });

  chatBody.innerHTML += `
    <div class="chat-body-${owner === "bot" ? "left" : "right"}">
      <img style="width:60px;" src="images/${
        owner === "bot" ? "ChatbotPicture" : "user"
      }.png" alt="chat-icon" />
      <p>${message}</p>
    </div>
  `;

  chatBody.scrollTo(0, chatBody.scrollHeight);

  if (owner === "user") {
    document.getElementById("message").value = "";
  }

  if (owner !== "bot") {
    return messageHandler({ message: getAnswer(message), owner: "bot" });
  }
};

// Add listner for button
document.getElementById("send")?.addEventListener("click", () => {
  const input = document.getElementById("message");

  if (!input?.value) return alert("Please enter a message");

  messageHandler({ message: input?.value, owner: "user" });
});

document.getElementById("message")?.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const input = document.getElementById("message");

    if (!input?.value) return alert("Please enter a message");

    messageHandler({ message: input?.value, owner: "user" });
  }
});
