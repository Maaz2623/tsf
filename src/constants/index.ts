import { Id } from "../../convex/_generated/dataModel";

export enum RoleType {
  MEMBER = "MEMBER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export type ConvexUser = {
  userId: string;
  userRole: string;
  _id: Id<"users">;
  _creationTime: number;
};


