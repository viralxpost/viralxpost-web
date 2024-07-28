import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

// Controller for handling the Google OAuth callback
export const googleOauthCallback = (req: Request, res: Response): void => {
  if (req.user) {
    // Generate a token for the user
    const token = jwt.sign({ sub: (req.user as any)._id }, config.jwtSecret as string, {
      expiresIn: '7d',
    });

    // Set the token as a cookie
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to the frontend dashboard
    res.redirect(`http://localhost:5173/auth/login?token=${token}`);
  } else {
    res.redirect('/auth/failure');
  }
};

// Controller for handling failed authentication
export const googleOauthFailure = (req: Request, res: Response): void => {
  res.status(401).json({ success: false, message: 'Authentication failed' });
};
