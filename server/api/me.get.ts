import { getServerSession } from "#auth";

const mockUsers = [
  {
    username: "address-admin",
    password: "addnew2",
  },
];

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);

  if (!session) {
    return { status: "unauthenticated" };
  }
  const user = users.find((user) => users.username === session.user?.username);

  return { username: user.username };
});
