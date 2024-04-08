import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import prisma from "@/lib/prisma.ts";
import { cn } from "@/lib/utils.ts";
import { revalidatePath } from "next/cache";
import { resolve } from "path";

export default async function TodosPage() {

  //Find Many  todo
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  //Add Todo
  const addTodo = async (formData: FormData) => {
    "use server";

    const content = formData.get("content") as string;

    // await new Promise((resolve) => setTimeout(resolve, 500));

    await prisma.todo.create({
      data: {
        content,
      },
    });

    revalidatePath("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center w-full p-24">
      <h1 className="text-2xl font-bold">Todos Page</h1>

      <form action={addTodo} className=" flex flex-col w-[300px] my-16">
        <Input
          type="text"
          name="content"
          placeholder="Write your todo..."
          className=" px-4 py-2 mb-3 rounded outline-none"
          required
        />
        <Button className="  rounded px-4 py-2 text-white font-semibold">
          Submit
        </Button>
      </form>
      <ul className="flex flex-col gap-4 mt-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className=" flex rounded items-center gap-2 p-2 border-solid border-2 border-gray-500 "
          >
            <p className={cn("text-lg font-bold mr-auto")}>{todo.content}</p>
          </div>
        ))}
      </ul>
    </main>
  );
}
