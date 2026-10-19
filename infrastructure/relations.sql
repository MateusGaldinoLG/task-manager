CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR NOT NULL UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    title VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_types_id_user
        UNIQUE (id, user_id),

    CONSTRAINT fk_types_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    title VARCHAR NOT NULL,
    description VARCHAR,
    type_id UUID NOT NULL,
    rank INTEGER NOT NULL,
    is_finished BOOLEAN NOT NULL DEFAULT FALSE,
    deadline TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tasks_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_tasks_type_user
        FOREIGN KEY (type_id, user_id)
        REFERENCES types(id, user_id)
        ON DELETE CASCADE
);

CREATE INDEX idx_tasks_user_id
    ON tasks(user_id);

CREATE INDEX idx_tasks_type_id
    ON tasks(type_id);

CREATE INDEX idx_types_user_id
    ON types(user_id);

CREATE INDEX idx_tasks_user_deadline
    ON tasks(user_id, deadline)
    WHERE is_finished = FALSE;