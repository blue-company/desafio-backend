const request = require("supertest");
const app = require("../src/app");

/**
 *
 * Para os testes darem certo, devem ser feitos todos de uma vez, pois os testes são feitos com o userMock, no fim dos testes, será deletado.
 * O comando para rodar os testes é: `npm run test`
 *
 */

const userMock = {
  name: "ADMIN TESTE",
  username: "administrador",
  password: "admin1234",
  birthDate: "1999-12-31",
  sex: "M",
  role: "USER",
};

let userMockResponse = {};

describe("Rotas de User", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("Validações na rota /register e /login", () => {
    describe("POST /register", () => {
      it("deve criar um novo usuário com sucesso", async () => {
        const response = await request(app)
          .post("/register")
          .send({ ...userMock });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("msg");
        expect(response.body).toHaveProperty("user");
        expect(response.body).toHaveProperty("token");
        userMockResponse = response;
      });
    });

    it("deve retornar erro de validação se o nome não for fornecido", async () => {
      const response = await request(app).post("/register").send({ username: "testuser", password: "testpassword" });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("deve retornar erro de validação se o username não for fornecido", async () => {
      const response = await request(app).post("/register").send({ name: "Test User", password: "testpassword" });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("deve retornar erro de validação se a senha não for fornecida", async () => {
      const response = await request(app).post("/register").send({ name: "Test User", username: "testuser" });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
    it("deve retornar erro de validação se o nome de usuário já estiver em uso", async () => {
      const response = await request(app).post("/register").send({ name: "Test User", username: "tqrcisio", password: "testpassword" });

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Usuário com esse username já está cadastrado.");
    });
  });
  describe("POST /login", () => {
    it("deve realizar o login com sucesso", async () => {
      const response = await request(app).post("/login").send({ username: userMock.username, password: userMock.password });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("msg", "Login bem-sucedido.");
      expect(response.body).toHaveProperty("token");
    });

    it("deve retornar erro de validação se o username ou password estiverem faltando", async () => {
      const response = await request(app).post("/login").send({ username: userMock.username });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Usuário e senha devem ser definidos");
    });

    it("deve retornar erro de autenticação se o username ou password estiverem incorretos", async () => {
      const response = await request(app).post("/login").send({ username: userMock.username, password: "wrongpassword" });
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Credenciais inválidas. Tente novamente.");
    });
  });
});

describe("PUT /user/:id", () => {
  it("deve atualizar um único usuário por id", async () => {
    const updatedUser = {
      name: "Nome Atualizado",
      username: "usernameAtualizado",
      type: "ADMIN",
      active: true,
      birthDate: "1990-01-01",
      sex: "M",
    };

    const response = await request(app).put(`/user/1`).send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("msg");
    expect(response.body.msg).toBe(`Usuário com o id ${userMockResponse.body.user.id} atualizado com sucesso!`);
  });

  it("deve retornar erro ao tentar atualizar um usuário com dados inválidos", async () => {
    const updatedUser = {
      name: "Nome Atualizado",
      username: "usernameAtualizado",
      type: "INVALID_TYPE",
      active: true,
      birthDate: "1990-01-01",
      sex: "M",
    };

    const response = await request(app).put(`/user/${userMockResponse.body.user.id}`).send(updatedUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
describe("DELETE /user/:id", () => {
  it("deve deletar um único usuário por id", async () => {
    const response = await request(app).delete(`/user/${userMockResponse.body.user.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("msg");
  });
});
