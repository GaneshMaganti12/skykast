import React from "react";
import { Skeleton } from "./ui/skeleton";
import Layout from "./Layout";

function Loading() {
  return (
    <Layout className="p-4 md:py-8 grid gap-8">
      <div className="flex flex-col  md:flex-row gap-6">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>
    </Layout>
  );
}

export default Loading;
