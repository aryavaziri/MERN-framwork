"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const CreateFrom = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [list, setList] = useState({ title: "" });

  const createPrompt = (e) => {
    e.preventDefault();
    fetch("/api/list", {
      method: "POST",
      body: JSON.stringify({
        title: list.title,
      }),
    })
      .then((response) => {
        response.ok && router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section>
      <form onSubmit={createPrompt}>
        <input
          placeholder="Title"
          type="text"
          name="title"
          onChange={(e) => setList({ ...list, title: e.target.value })}
        />
        <button type="submit">Create</button>
      </form>
    </section>
  );
};

export default CreateFrom;
