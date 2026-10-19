import { boolean, foreignKey, integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { categories } from "./categories.js";


export const tasks = pgTable("tasks", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

    userId: uuid("user_id")
            .references(() => users.id, {onDelete: "cascade"}),
    
    title: varchar("title", {
        length: 255
    })
            .notNull(),
    
    description: varchar("description", {
        length: 255
    }),

    categoryId: uuid("user_id")
                .notNull(),

    rank: integer("rank")
            .notNull(),

    isFinished: boolean("is_finished")
                .default(false)
                .notNull(),
    deadline: timestamp("deadline")
                .notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
    })
        .defaultNow()
        .notNull()
}, (table) => [
  foreignKey({
    name: "fk_tasks_type_user",
    columns: [table.categoryId, table.userId],
    foreignColumns: [categories.id, categories.userId],
  }).onDelete("cascade"),
])