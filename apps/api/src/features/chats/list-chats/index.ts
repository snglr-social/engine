import type { PrismaClient } from "../../../../generated/prisma/client";

export class Chats {
	private db: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.db = prisma;
	}

	public handler = async () => {
		const chats = await this.db.chat.findMany();
		return { chats };
	};
}
