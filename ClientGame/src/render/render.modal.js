export function createModal(id, text) {
  const modalContent = document.createElement("div");

  modalContent.id = id;
  modalContent.className = "modal";

  const modalMessage = document.createElement("span");

  modalMessage.className = "modal-message";
  modalMessage.style.color = "white";
  modalMessage.innerText = text;

  modalContent.appendChild(modalMessage);

  return modalContent;
}
