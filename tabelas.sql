-- CREATE DATABASE IF NOT EXISTS docker;
USE consulta-SQL;

/*Create all tables*/
CREATE TABLE IF NOT EXISTS users( 
    id VARCHAR(36) NOT NULL,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100),
    PRIMARY KEY(id) 
);

CREATE TABLE IF NOT EXISTS consulta( 
    id VARCHAR(36) NOT NULL,
    name VARCHAR(100),
    description VARCHAR(200),
    status VARCHAR(100),
    data DATE,
    user_id VARCHAR(36) NOT NULL,

    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

/*Insert the first values in tables*/
INSERT INTO users (id, name, email, password)
    VALUE ("92056f79-327d-4792-9543-ccf68f8597a8", "User Admin", "user.admin@gmail.com", "adminPass123");

INSERT INTO consulta (id, name, description, status, data, user_id)
    VALUE ("43cbe748-32f5-48fe-86d1-a8a591f28b35", "routine examination", "Routine exames for know how be the health", "analysis", "2024-06-01", "92056f79-327d-4792-9543-ccf68f8597a8");
