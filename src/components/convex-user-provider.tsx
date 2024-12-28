"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";

type ClerkUserType = {
  id: string;
  fullName: string;
  email: string; // Add more fields as needed from Clerk
  
};

interface UserContextType {
  clerkUser: ClerkUserType | null;
  convexUser: Doc<"users"> | null | undefined;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  clerkUser: null,
  convexUser: null,
  loading: true,
});

export const ConvexUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user: clerkRawUser, isLoaded } = useUser();
  const convexData = useQuery(api.users.getCurrentUser, {
    userId: clerkRawUser?.id ?? "",
  });

  const [clerkUser, setClerkUser] = useState<ClerkUserType | null>(null);
  const [convexUser, setConvexUser] = useState<Doc<"users"> | null | undefined>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && clerkRawUser) {
      setClerkUser({
        id: clerkRawUser.id,
        fullName: clerkRawUser.fullName ?? "",
        email: clerkRawUser.emailAddresses?.[0]?.emailAddress ?? "",
      });
    } else {
      setClerkUser(null);
    }
  }, [clerkRawUser, isLoaded]);

  useEffect(() => {
    if (convexData !== undefined) {
      setConvexUser(convexData);
    }
    setLoading(!isLoaded || convexData === undefined);
  }, [convexData, isLoaded]);

  return (
    <UserContext.Provider value={{ clerkUser, convexUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => useContext(UserContext);
