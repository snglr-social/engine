import { Elysia } from "elysia";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

import { Chats } from "./features/chats/list-chats";
import { CreateChat } from "./features/chats/create-chat";
import { CreateChatSchema } from "./features/chats/create-chat/schema";

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

const chats = new Chats(db);
const createChat = new CreateChat(db);

const app = new Elysia()
	.get("/chats", chats.handler)
	.post("/chats", createChat.handler, {
		body: CreateChatSchema,
	})
	.listen(3000);

console.log(
	`😜 snglr-social/engine is running at ${app.server?.hostname}:${app.server?.port}`,
);