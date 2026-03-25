import type { Context } from "elysia";
import type { PrismaClient } from "../../../../generated/prisma/client";
import type { CreateChatType } from "./schema";

export class CreateChat {
	private db: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.db = prisma;
	}

	private toPrismaInput({ id, name }: CreateChatType) {
		return { id, name };
	}

	private async createChat({ id, name }: CreateChatType) {
		const chat = await this.db.chat.create({
			data: this.toPrismaInput({ id, name }),
		});
		return chat;
	}

	public handler = async ({
		body,
	}: Context<{
		body: CreateChatType;
	}>) => {
		const chat = await this.createChat(body);
		return { chat };
	};
}
