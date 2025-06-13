import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton() {
  return (
    <GoogleOAuthProvider clientId="1026977444090-hnu0hl6758cd35crqodmn64i5gptdkb3.apps.googleusercontent.com">
      <GoogleLogin
        render={(renderProps) => (
          <button
            type="button"
            className="btn btn-primary btn-floating mx-1"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <i className="fab fa-google"></i>
          </button>
        )}
        onSuccess={(credentialResponse) => {
          console.log("Google Login Success:", credentialResponse);
          // You can send credentialResponse.credential to your backend
        }}
        onError={() => {
          console.log("Google Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}
