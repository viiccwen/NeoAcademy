import type { VerifyFunction, VerifyCallback } from "passport-oauth2";
import type {
  Profile as GithubProfile,
  StrategyOptions as GitHubStrategyOptions,
} from "passport-github2";
import type {
  Profile as GoogleProfile,
  StrategyOptions as GoogleStrategyOptions,
} from "passport-google-oauth20";

import passport from "passport";
import { Router } from "express";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { getUserEmails } from "utils/github";
import { githubAuthCallback } from "controllers/auth-controller";
import type { AuthProvider } from "database";
import { createUser, findByOAuthId } from "utils/user";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      callbackURL: `${process.env.AUTH_CALLBACK_BASE_URL}/github`,
    } satisfies GitHubStrategyOptions,
    (async (
      accessToken: string,
      _: string,
      profile: GithubProfile,
      done: VerifyCallback
    ) => {
      try {
        const emails = await getUserEmails(accessToken);
        const email = emails.find((email) => email.primary)?.email!;
        const user =
          (await findByOAuthId("GITHUB", profile.id)) ||
          (await createUser(
            profile.displayName,
            email,
            "GITHUB" as AuthProvider,
            profile.id,
            accessToken
          ));

        done(null, user);
      } catch (error) {
        console.error(error);
        done(error);
      }
    }) satisfies VerifyFunction
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      callbackURL: `${process.env.AUTH_CALLBACK_BASE_URL}/google`,
    } satisfies GoogleStrategyOptions,
    (async (
      accessToken: string,
      _: string,
      profile: GoogleProfile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails![0].value;
        const user =
          (await findByOAuthId("GOOGLE", profile.id)) ||
          (await createUser(
            profile.displayName,
            email,
            "GOOGLE" as AuthProvider,
            profile.id,
            accessToken
          ));

        done(null, user);
      } catch (e) {
        console.error(e);
      }
    }) satisfies VerifyFunction
  )
);

const authRouter = Router();

authRouter.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["read:user", "user:email"] })
);

authRouter.get(
  "/auth/callback/github",
  passport.authenticate("github", { session: false }),
  githubAuthCallback
);

authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/auth/callback/google",
  passport.authenticate("google", { session: false }),
  (_, res) => res.redirect(process.env.AUTH_REDIRECT_URL!)
);

export default authRouter;
