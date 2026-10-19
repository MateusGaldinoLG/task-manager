import { pgTable, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.js";


export const categories = pgTable("categories", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),
    
    userId: uuid("user_id")
            .references(() => users.id, {onDelete: "cascade"}),
    
    title: varchar("title", {
        length: 255
    })
            .notNull(),

    createdAt: timestamp("created_at", {
        withTimezone: true,
    })
        .defaultNow()
        .notNull()
},
  (table) => [
    unique("uq_types_id_user").on(table.id, table.userId),
  ])