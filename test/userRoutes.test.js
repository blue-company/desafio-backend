const request = require("supertest");
const app = require("../src/app");

/**
 *
 * Para os testes darem certo, devem ser feitos todos de uma vez, pois os testes são feitos com o userMock, no fim dos testes, será deletado.
 * O comando para rodar os testes é: `npm run test`
 *
 */

const userMock = {
  name: "Davi Ramos de Oliveira",
  username: "daviramosdeoliveira1",
  password: "senhadeteste1234",
  birthDate: "1999-12-31",
  sex: "M",
  role: "USER",
};

let userMockResponse = {};

describe("Rotas de User", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("POST /register", () => {
    it("deve registrar um usuário com sucesso", async () => {
      const response = await request(app)
        .post("/register")
        .send({ ...userMock });
      userMockResponse = response;
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("msg", "Usuário registrado com sucesso. Use o token para acessar as rotas protegidas.");
      expect(response.body).toHaveProperty("user");
      expect(response.body.user).toHaveProperty("id");
      expect(response.body.user).toHaveProperty("username");
      expect(response.body).toHaveProperty("token");
    });
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

describe("DELETE /user/:id", () => {
  it("deve deletar um único usuário por id", async () => {
    const response = await request(app).delete(`/user/${userMockResponse.body.user.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("msg");
  });
});
