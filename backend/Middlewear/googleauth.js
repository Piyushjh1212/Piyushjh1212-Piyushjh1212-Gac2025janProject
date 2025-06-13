import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client("1026977444090-hnu0hl6758cd35crqodmn64i5gptdkb3.apps.googleusercontent.com");

export const verifyGoogleToken = async (req, res, next) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "1026977444090-hnu0hl6758cd35crqodmn64i5gptdkb3.apps.googleusercontent.com",
    });

    req.googleUser = ticket.getPayload();
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid Google token" });
  }
};
