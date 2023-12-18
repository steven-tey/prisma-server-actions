"use client";

import { useState, useTransition } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { createPost, deletePost } from "@/lib/actions";
import { cn } from "@/lib/utils";
import LoadingDots from "./loading-dots";
import { useRef } from "react";
import { toast } from "sonner";

export function ActionsForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  return (
    <form
      ref={formRef}
      action={(data) =>
        createPost(data).then(() => {
          toast.success("Post created!");
          formRef.current?.reset();
          router.refresh();
        })
      }
      className="flex flex-col bg-white shadow-md rounded-md p-4 w-full max-w-lg space-y-4"
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        required
        className="h-10 border border-gray-300 rounded-md p-2 text-black"
      />
      <textarea
        name="content"
        placeholder="Content"
        required
        className="border border-gray-300 rounded-md p-2 text-black"
      />
      <FormButton />
    </form>
  );
}

const FormButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "bg-blue-500 transition-all border border-transparent text-white rounded-md p-2",
        pending
          ? "border-gray-300 bg-gray-200 cursor-not-allowed"
          : "hover:bg-blue-600 active:bg-blue-700"
      )}
    >
      {pending ? <LoadingDots /> : <p>Submit</p>}
    </button>
  );
};

export const DeleteButton = ({ id }: { id: string }) => {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      onClick={() =>
        startTransition(() =>
          deletePost(id).then(() => {
            toast.success("Post deleted!");
            router.refresh();
          })
        )
      }
      disabled={isPending}
      className={cn(
        "bg-red-500 transition-all border border-transparent text-white rounded-md w-20 py-2",
        isPending
          ? "border-gray-300 bg-gray-200 cursor-not-allowed"
          : "hover:bg-red-600 active:bg-red-700"
      )}
    >
      {isPending ? <LoadingDots /> : <p>Delete</p>}
    </button>
  );
};

export function OldForm() {
  const router = useRouter();
  const [data, setData] = useState({
    title: "",
    content: "",
  });
  const [submitting, setSubmitting] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        setSubmitting(true);
        e.preventDefault();
        fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then(() => {
          setSubmitting(false);
          toast.success("Post created!");
          setData({
            title: "",
            content: "",
          });
          router.refresh();
        });
      }}
      className="flex flex-col bg-white shadow-md rounded-md p-4 w-full max-w-lg space-y-4"
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        required
        onChange={(e) => setData({ ...data, title: e.target.value })}
        className="h-10 border border-gray-300 rounded-md p-2"
      />
      <textarea
        name="content"
        placeholder="Content"
        required
        onChange={(e) => setData({ ...data, content: e.target.value })}
        className="border border-gray-300 rounded-md p-2"
      />
      <button
        type="submit"
        disabled={submitting}
        className={cn(
          "bg-blue-500 transition-all border border-transparent text-white rounded-md p-2",
          submitting
            ? "border-gray-300 bg-gray-200 cursor-not-allowed"
            : "hover:bg-blue-600 active:bg-blue-700"
        )}
      >
        {submitting ? <LoadingDots /> : <p>Submit</p>}
      </button>
    </form>
  );
}

export const OldDeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  return (
    <button
      onClick={() => {
        setDeleting(true);
        fetch(`/api/posts?id=${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => {
          setDeleting(false);
          toast.success("Post deleted!");
          router.refresh();
        });
      }}
      disabled={deleting}
      className={cn(
        "bg-red-500 transition-all border border-transparent text-white rounded-md w-20 py-2",
        deleting
          ? "border-gray-300 bg-gray-200 cursor-not-allowed"
          : "hover:bg-red-600 active:bg-red-700"
      )}
    >
      {deleting ? <LoadingDots /> : <p>Delete</p>}
    </button>
  );
};
