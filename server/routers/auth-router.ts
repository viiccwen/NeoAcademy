import type { VerifyFunction, VerifyCallback } from 'passport-oauth2';
import type { Profile as GithubProfile, StrategyOptions as GitHubStrategyOptions } from 'passport-github2';
import type { Profile as GoogleProfile, StrategyOptions as GoogleStrategyOptions } from 'passport-google-oauth20';

import passport from 'passport';
import prisma from 'client';
import { Router } from 'express';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { OAuthProvider } from '@prisma/client';
import { getUserEmails } from 'utils/github';


passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
            callbackURL: `${process.env.AUTH_CALLBACK_BASE_URL}/github`
        } satisfies GitHubStrategyOptions,
        (async (accessToken: string, refreshToken: string, profile: GithubProfile, done: VerifyCallback) => {
            console.log(accessToken);
            const emails = await getUserEmails(accessToken);
            const email = emails.find(email => email.primary)?.email!;
            const user = await prisma.user.findFirst({
                where: {
                    AND: [
                        { authProvider: OAuthProvider.GITHUB },
                        { accessToken }
                    ]
                }
            }) || await prisma.user.create({
                data: {
                    name: profile.displayName,
                    authProvider: OAuthProvider.GITHUB,
                    email,
                    accessToken,
                    refreshToken,
                }
            });
            
            done(null, user);
        }) satisfies VerifyFunction,
    ),
);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
            callbackURL: `${process.env.AUTH_CALLBACK_BASE_URL}/google`
        } satisfies GoogleStrategyOptions,
        ((accessToken: string, refreshToken: string, profile: GoogleProfile, done: VerifyCallback) => {
            console.log('hi');
            console.log(accessToken, refreshToken, profile);
            done(null, { accessToken, refreshToken, ...profile } as any);
        }) satisfies VerifyFunction,
    )
);

const authRouter = Router();

authRouter.get(
    '/auth/github',
    passport.authenticate('github', { scope: ['read:user', 'user:email'] })
);

authRouter.get(
    '/auth/callback/github',
    passport.authenticate('github', { session: false }),
    (req, res) => {
        console.log(req.user);
        res.redirect(process.env.AUTH_REDIRECT_URL!); }
);

authRouter.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
    '/auth/callback/google',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        console.log(req.user);
        res.redirect(process.env.AUTH_REDIRECT_URL!);
    }
);

export default authRouter;
