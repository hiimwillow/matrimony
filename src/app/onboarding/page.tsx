"use client";

import { useMemo } from "react";

async function sampleFn() {
  let accessToken: string | null = "";

  if (typeof window !== "undefined") {
    accessToken = sessionStorage.getItem("accessToken");
  } else {
    accessToken = "";
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/onboarding`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return res;
}

export default async function OnBoarding() {
  const response = useMemo(() => sampleFn(), []);

  return <div>On Boarding</div>;
}
