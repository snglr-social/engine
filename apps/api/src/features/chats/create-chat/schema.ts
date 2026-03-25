import { type Static, t } from "elysia";

export const CreateChatSchema = t.Object({
	id: t.String(),
	name: t.String(),
});

export type CreateChatType = Static<typeof CreateChatSchema>;
