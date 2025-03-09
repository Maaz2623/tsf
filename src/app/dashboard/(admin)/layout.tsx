import { trpc } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await trpc.users.checkIsAdmin();

  if (!isAdmin) {
    redirect("/errors/unauthorized");
  }

  return <div>{children}</div>;
}
