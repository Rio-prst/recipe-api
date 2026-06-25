import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { validateRegister, validateLogin } from '../validators/auth.validator';
import { AuthRequest } from '../middlewares/auth';

const authService = new AuthService();

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const input = validateRegister(req.body);
    const result = await authService.register(input);
    res.status(201).json({
      user: result.user,
      token: result.token,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res:Response, next: NextFunction) {
  try {
    const input = validateLogin(req.body);
    const result = await authService.login(input);
    res.status(200).json({
      user: result.user,
      token: result.token,
    });
  } catch (err) {
    next(err);
  }
}

export async function me(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
      return;
    }

    const user = await authService.me(Number(req.user.id));
    res.status(200).json({
      user: user,
    });
  } catch (err) {
    next(err);
  }
}