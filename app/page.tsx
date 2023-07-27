import { Suspense } from "react";
import Posts, { PostsPlaceholder } from "@/components/posts";
import { ActionsForm, OldForm } from "@/components/forms";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-5 p-5 md:p-24">
      <ActionsForm />
      {/* <OldForm /> */}
      <Suspense fallback={<PostsPlaceholder />}>
        <Posts />
      </Suspense>
    </main>
  );
}
