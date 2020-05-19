"use strict", document.addEventListener("DOMContentLoaded", init);

function init() {
  setUpForm();
}

// PAYMENT FORM
function setUpForm() {
  const body = document.querySelector("body");
  window.form = form;
  window.elements = elements;
  const form = document.querySelector("form");
  const elements = form.elements;

  form.setAttribute("novalidate", true);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formElements = form.querySelectorAll("input");
    formElements.forEach((el) => {
      el.classList.remove("invalid");
    });

    if (form.checkValidity()) {
      body.classList.add("noForm");
      body.classList.add(
        "loadingGif"
      ); /* &&
        location.assign("http://localhost:1234/app.html") */
    } else {
      formElements.forEach((el) => {
        if (!el.checkValidity()) {
          el.classList.add("invalid");
        }
      });
    }
  });

  // ------ code copied from https://codepen.io/murani/pen/KyVbrp --------
  let ccNumberInput = document.querySelector(".cc-number-input"),
    ccNumberPattern = /^\d{0,16}$/g,
    ccNumberSeparator = " ",
    ccNumberInputOldValue,
    ccNumberInputOldCursor,
    ccExpiryInput = document.querySelector(".cc-expiry-input"),
    ccExpiryPattern = /^\d{0,4}$/g,
    ccExpirySeparator = "/",
    ccExpiryInputOldValue,
    mask = (value, limit, separator) => {
      var output = [];
      for (let i = 0; i < value.length; i++) {
        if (i !== 0 && i % limit === 0) {
          output.push(separator);
        }

        output.push(value[i]);
      }

      return output.join("");
    },
    unmask = (value) => value.replace(/[^\d]/g, ""),
    checkSeparator = (position, interval) =>
      Math.floor(position / (interval + 1)),
    ccNumberInputKeyDownHandler = (e) => {
      let el = e.target;
      ccNumberInputOldValue = el.value;
      ccNumberInputOldCursor = el.selectionEnd;
    },
    ccNumberInputInputHandler = (e) => {
      let el = e.target,
        newValue = unmask(el.value),
        newCursorPosition;

      if (newValue.match(ccNumberPattern)) {
        newValue = mask(newValue, 4, ccNumberSeparator);

        newCursorPosition =
          ccNumberInputOldCursor -
          checkSeparator(ccNumberInputOldCursor, 4) +
          checkSeparator(
            ccNumberInputOldCursor +
              (newValue.length - ccNumberInputOldValue.length),
            4
          ) +
          (unmask(newValue).length - unmask(ccNumberInputOldValue).length);

        el.value = newValue !== "" ? newValue : "";
      } else {
        el.value = ccNumberInputOldValue;
        newCursorPosition = ccNumberInputOldCursor;
      }

      el.setSelectionRange(newCursorPosition, newCursorPosition);
    },
    // expiry date
    ccExpiryInputKeyDownHandler = (e) => {
      let el = e.target;
      ccExpiryInputOldValue = el.value;
      ccExpiryInputOldCursor = el.selectionEnd;
    },
    ccExpiryInputInputHandler = (e) => {
      let el = e.target,
        newValue = el.value;

      newValue = unmask(newValue);
      if (newValue.match(ccExpiryPattern)) {
        newValue = mask(newValue, 2, ccExpirySeparator);
        el.value = newValue;
      } else {
        el.value = ccExpiryInputOldValue;
      }
    };

  // card number
  ccNumberInput.addEventListener("keydown", ccNumberInputKeyDownHandler);
  ccNumberInput.addEventListener("input", ccNumberInputInputHandler);

  ccExpiryInput.addEventListener("keydown", ccExpiryInputKeyDownHandler);
  ccExpiryInput.addEventListener("input", ccExpiryInputInputHandler);
  // code copied from https://codepen.io/murani/pen/KyVbrp
}
