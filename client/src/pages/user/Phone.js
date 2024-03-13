import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { verifyUser } from "../../functions/auth";


const initialState = {
  mobile:0,
  otp:0
};

function App() {
  const { user } = useSelector((state) => ({ ...state }));
  const [values,setValues] = useState(initialState);
  const handleChange = (e) =>{
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  const configureCaptcha = () =>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
        console.log("Recaptca varified")
      },
      defaultCountry: "IN"
    });
    }
    const onSignInSubmit = (e) => {
      e.preventDefault()
      configureCaptcha()
      const phoneNumber = "+91" + values.mobile
      console.log(phoneNumber)
      const appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent")
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("SMS not sent")
      });
    }
    const onSubmitOTP = (e) =>{
      e.preventDefault()
      const code = values.otp
      console.log(code)
      window.confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        const user1 = result.user;
        const data = {
          _id: user._id,
          phone:values.mobile,
        };
        console.log(JSON.stringify(user1))
        console.log(user);
        verifyUser(data, user.token);
        toast.success("PhoneNumber Verified")
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        toast.error("Invalid OTP")
      });
    }
    // render() {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <UserNav />
            </div>

          <div className="col">
              <h2> Phone Verification</h2>
                <div className="form-group ">
                    <label>Login Form</label>
                    <form onSubmit={onSignInSubmit}>
                      <div id="sign-in-button"></div>
                      <input type="number" className="form-control" name="mobile" placeholder="Mobile number" required onChange={handleChange}/>
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="form-group ">
                    <label>Enter OTP</label>
                    <form onSubmit={onSubmitOTP}>
                      <input type="number" className="form-control" name="otp" placeholder="OTP Number" required onChange={handleChange}/>
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>

          </div>
          
  
          
        </div>
        </div>
      )
    // }
  }

export default App

