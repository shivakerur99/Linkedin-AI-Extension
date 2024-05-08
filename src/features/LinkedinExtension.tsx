import React, { useEffect, useState } from "react";

import InputIcon from "../image/input.png";
import MessageIcon from "../image/message_icon.png";
import ReloadIcon from "../image/reload.png";
import VectorIcon from "../image/Vector.png";

/**
 * Component for LinkedIn Extension functionalities.
 */
export const LinkedinExtension = () => {
  const [input, setInput] = useState("");
  const [produce, setProduce] = useState(false);
  const [IconVisible, setIconVisible] = useState(false);
  const [promptVisible, setPromptVisible] = useState(false);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    /**
     * Handles clicks outside of the prompt modal.
     */
    const handleClickOutside = (event) => {
      const modal = document.querySelector(".prompt-modal");
      if (modal && !modal.contains(event.target)) {
        setIconVisible(false);
      }
    };

    if (IconVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [IconVisible]);

  /**
   * Handles the click event for producing prompts.
   */
  const handleProduceClick = () => {
    setProduce(true);
    setPromptVisible(true);
    setPrompt(input);
    setInput("");
  };

  /**
   * Handles the click event for regenerating prompts.
   */
  const handleReproduceClick = () => {
    setInput("");
    setPromptVisible(false);
    setProduce(false);
  };

  /**
   * Handles the click event for displaying the icon.
   */
  const handleIconClick = () => {
    setIconVisible(true);
  };

  /**
   * Handles the click event for closing the prompt.
   */
  const handleClose = () => {
    setIconVisible(false);
  };

  /**
   * Handles the click event for inserting the prompt into the message box.
   */
  const handleInsertClick = () => {
    setIconVisible(false);
    const replyText =
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

    const message = document.querySelector(".msg-form__contenteditable");

    if (message) {
      const content = document.createElement("p");
      content.textContent = replyText;
      message.textContent = "";
      message.appendChild(content);

      const label = document.querySelector(".msg-form__placeholder");
      if (label) {
        label.removeAttribute("data-placeholder");
      }
      const sendButton = document.querySelector(".msg-form__send-button");
      sendButton?.removeAttribute("disabled");
    }
  };

  /**
   * Displays the icon in the message text area.
   */
  const displayIconInMessageTextArea = () => {
    var img = document.createElement("img");
    img.addEventListener("click", handleIconClick);
    img.src = MessageIcon;
    img.style.width = "35px"; 
    img.style.cursor = "pointer";
    img.className = "Linkedin-AI-Icon";
    img.style.position = "absolute";
    img.style.bottom = "0";
    img.style.right = "50px";

    var messageTextArea = document.querySelector(".msg-form__contenteditable");

    if (messageTextArea) {
      messageTextArea.appendChild(img);
    }
  };

  document.addEventListener("focusin", function (event) {
    var focusedElement = event.target as Element; 
    if (focusedElement.matches && focusedElement.matches(".msg-form__contenteditable")) {
      displayIconInMessageTextArea();
    }
  });
  
  /**
   * Removes the icon from the message text area.
   */
  const removeImageFromMessageTextArea = () => {
    var img = document.querySelector(".Linkedin-AI-Icon");
    if (img) {
      img.remove();
    }
  };

  document.addEventListener("focusout", function (event) {
    var focusedElement = event.relatedTarget as Element; 
    if (!focusedElement || (focusedElement && !focusedElement.matches(".Linkedin-AI-Icon"))) {
      removeImageFromMessageTextArea();
    }
  });


  return (
    <>
      <div
        className="prompt-modal flex flex-col bg-white p-4 rounded-lg shadow-2xl font-custom1 fixed top-1/2 left-[48%] transform -translate-x-1/2 -translate-y-1/2 z-50"
        style={{ display: IconVisible ? "flex" : "none" }}
      >
        {promptVisible ? (
          <div className="chat-area flex flex-col w-[450px] py-4 gap-y-4">
            <div className="message bg-[#DFE1E7] p-2 rounded-lg self-end">
              <p className="text-[#666D80] text-[15px]">{prompt}</p>
            </div>
            <div className="reply flex bg-[#DBEAFE] rounded-lg p-2 w-[300px]">
              <p className="reply-msg text-[#666D80] text-[15px]">
                Thank you for the opportunity! If you have any more questions or
                if there's anything else I can help you with, feel free to ask.
              </p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="first-input mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="text-[#666D80] text-[15px] p-2 w-[450px] border border-[#C1C7D0] rounded-lg"
            placeholder="Your prompt"
          />
        </div>

        <div className="second-button flex justify-end items-center">
          {!produce ? (
            <button
              onClick={handleProduceClick}
              className="px-4 py-2 text-[15px] bg-[#3B82F6] flex flex-row text-white rounded-lg gap-2"
            >
              <img src={VectorIcon} className="h-[18px] w-[14px] pt-1" />
              <p>Generate</p>
            </button>
          ) : (
            <div className="flex flex-row gap-x-2">
              <button
                onClick={handleInsertClick}
                className="px-4 py-2 text-[15px] bg-white flex flex-row text-[#666D80] border border-[#666D80] rounded-lg gap-2"
              >
                <img src={InputIcon} className="w-[11px] pt-2" />
                <p>Insert</p>
              </button>
              <button
                onClick={handleReproduceClick}
                className="px-4 py-2 text-[15px] bg-[#3B82F6] flex flex-row text-white rounded-lg gap-2"
              >
                <img src={ReloadIcon} className="h-[19px] w-[13px] pt-1" />
                <p>Regenerate</p>
              </button>
            </div>
          )}
        </div>
      </div>
      {IconVisible ? (
        <div
          onClick={handleClose}
          className="backdrop fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 flex justify-center items-center z-10"
        ></div>
      ) : (
        <div></div>
      )}
    </>
  );
};
