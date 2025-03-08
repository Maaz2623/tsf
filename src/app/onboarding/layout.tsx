import { trpc } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await trpc.users.getUserByClerkId();

  if (data.phoneNumber || data.phoneNumber === "") {
    redirect(`/dashboard/events`);
  }

  return <div>{children}</div>;
}
