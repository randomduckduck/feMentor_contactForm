import React from "react";
import "./contactForm.css";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
function InputText({ labelText, inputType, inputId, inpName, errorText }) {
  //   const { register } = useFormContext();
  return (
    <>
      <label htmlFor={inputId}>
        {inputType === "checkbox" ? false : labelText}
        <input type={inputType} id={inputId} name={inpName} required />
        {inputType === "checkbox" ? labelText : false}
      </label>
      <div className="error hidden">{errorText}</div>
    </>
  );
}
function ModalComponent() {
  return (
    <div className="modalHolder">
      <div className="modalContent">
        <p className="modaltitle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            fill="none"
            viewBox="0 0 20 21"
          >
            <path
              fill="#fff"
              d="M14.28 7.72a.748.748 0 0 1 0 1.06l-5.25 5.25a.748.748 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.75.75 0 0 1 1.06 0Zm5.47 2.78A9.75 9.75 0 1 1 10 .75a9.76 9.76 0 0 1 9.75 9.75Zm-1.5 0A8.25 8.25 0 1 0 10 18.75a8.26 8.26 0 0 0 8.25-8.25Z"
            />
          </svg>
          <span className="modaltitletext">Message Sent!</span>
        </p>
        <p className="modalcontent">
          Thanks for completing the form. We will be in touch soon!
        </p>
      </div>
    </div>
  );
}
function InputRadio({ labelText, inputId, inpName }) {
  return (
    <>
      <label htmlFor={inputId}>
        <input type="radio" name={inpName} id={inputId} required />
        <span>{labelText}</span>
      </label>
    </>
  );
}
export default function ContactForm() {
  function handleSubmit(e) {
    // console.log("handleSubmit e", e, " arguments", arguments);
    e.preventDefault();
    let elems = e.target.elements;
    let anyInvalid = false;
    // console.log(elems);
    for (let elem of elems) {
      console.log(elem, "validity state:", elem.validity);
      if (elem.matches("input") || elem.matches("textarea")) {
        if (elem.validity.valid == false) {
          e.preventDefault();
          anyInvalid = true;
          let holderElem = elem.closest("[data-errorparent]");
          holderElem.querySelector(".error").classList.remove("hidden");
        }
      }
    }
    if (anyInvalid == false) {
      console.log("no invalid inputs. safe to proceed");
      e.target.reset();
    }
  }
  function handleError(e) {
    console.log("e", e, " arguments", arguments);
  }
  function handleErrorCapture(e) {
    console.log("e", e, " arguments", arguments);
  }
  const methods = useForm();
  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });
  function mysubmit(e) {
    console.log("mysbumit dunction");
    console.log(e, this);
  }
  function handleReset(e) {
    console.log("e", e, " arguments", arguments);
    e.target.querySelectorAll(".error").forEach((elem) => {
      elem.classList.add("hidden");
    });
    let modalElem = document.querySelector(".modalHolder");
    modalElem.classList.add("bringDown");
    setTimeout(() => {
      modalElem.classList.remove("bringDown");
    }, 5000);
  }
  return (
    // <FormProvider {...methods}>
    <div className="main">
      <form
        action=""
        onSubmit={handleSubmit}
        onError={handleError}
        onErrorCapture={handleErrorCapture}
        noValidate
        onReset={handleReset}
      >
        <h1>Contact Us</h1>
        <div className="nameSection">
          <div className="firstNameSection" data-errorparent="true">
            <InputText
              labelText="First Name *"
              inputType="text"
              inputId="firstName"
              inpName="firstName"
              errorText="This field is required"
            ></InputText>
          </div>
          <div className="lastNameSection" data-errorparent="true">
            <InputText
              labelText="Last Name *"
              inputType="text"
              inputId="lastName"
              inpName="lastName"
              errorText="This field is required"
            ></InputText>
          </div>
        </div>
        <div className="emailSection" data-errorparent="true">
          <InputText
            labelText="Email address *"
            inputType="email"
            inputId="emailId"
            inpName="emailId"
            errorText="Please enter a valid email address"
          ></InputText>
        </div>
        <div className="querySection" data-errorparent="true">
          <div className="queryTitle">Query Type *</div>
          <div className="queryOption">
            <div className="queryOptionDivs genInquiry">
              <InputRadio
                labelText="General Inquiry"
                inputId="genInqInput"
                inpName="inqOption"
              ></InputRadio>
            </div>
            <div className="queryOptionDivs suppReq">
              <InputRadio
                labelText="Support Request"
                inputId="supReqInp"
                inpName="inqOption"
              ></InputRadio>
            </div>
          </div>
          <div className="error hidden">Please select a query type</div>
        </div>
        <div className="messageSection" data-errorparent="true">
          <label htmlFor="message">Message *</label>
          <textarea
            name="message"
            id="message"
            className="messageTextArea"
            required
          ></textarea>
          <div className="error hidden">This field is required</div>
        </div>
        <div className="consentSection" data-errorparent="true">
          <InputText
            labelText="I consent to being contacted by the team *"
            inputType="checkbox"
            inputId="consentCheck"
            inpName="consentCheck"
            errorText="To submit this form, please consent to being contacted"
          ></InputText>
        </div>
        <div className="btnSection">
          <button className="submitBtn" type="submit">
            Submit
          </button>
        </div>
      </form>
      <ModalComponent></ModalComponent>
    </div>
    // </FormProvider>
  );
}
