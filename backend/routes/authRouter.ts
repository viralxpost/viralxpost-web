import express from 'express';
import passport from 'passport';
import { googleOauthCallback } from '../controllers/authControllers';

const authRouter = express.Router();

// Route to initiate Google authentication
authRouter.get('/google', passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback route after Google authentication
authRouter.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/failure' }), 
  googleOauthCallback
);
export default authRouter;
