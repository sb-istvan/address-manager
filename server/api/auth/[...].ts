import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export default NuxtAuthHandler({
  pages: { signIn: "/login" },
  providers: [
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider.default({
      authorize(credentials: any) {
        console.warn(
          "ATTENTION: You should replace this with your real providers or credential provider logic! The current setup is not safe"
        );
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!

        const mockUser = {
          id: "1",
          name: "Address Administrator",
          username: "address-admin",
          password: "addnew2",
        };

        if (
          credentials?.username === mockUser.username &&
          credentials?.password === mockUser.password
        ) {
          // Any object returned will be saved in `user` property of the JWT
          return mockUser;
        } else {
          console.error(
            "Warning: Malicious login attempt registered, bad credentials provided"
          );

          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
});
