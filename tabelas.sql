USE docker;

/*Create all tables*/
CREATE TABLE IF NOT EXISTS users(
    id INT(36) NOT NULL,
    name VARCHAR(100),
    email UNIQUE VARCHAR(100) NOT NULL,
    senha VARCHAR(100),
    PRIMARY KEY(id) 
);

CREATE TABLE IF NOT EXISTS consulta(
    id INT(36) AUTO_INCREMENT,
    name VARCHAR(100),
    status UNIQUE VARCHAR(100),
    data DATE,
    user_id VARCHAR(36),

    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

/*Insert the first values in tables*/
INSERT INTO users (id, name, email, senha)
    VALUE ("92056f79-327d-4792-9543-ccf68f8597a8", "User Admin", "user.admin@gmail.com", "adminPass123");

INSERT INTO consulta (id, name, status, data, user_id)
    VALUE ("43cbe748-32f5-48fe-86d1-a8a591f28b35", "routine examination", "analysis", "Sun May 31 2024 12:34:56 ", "92056f79-327d-4792-9543-ccf68f8597a8");
