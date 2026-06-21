# Seminario: Testes para Aplicativos Moveis

Exemplo **simples** e comentado em JavaScript que simula a logica de uma
**tela de login** de um app movel e a testa de forma automatizada com o
[Jest](https://jestjs.io/).

A ideia: nao precisamos abrir o app no celular toda hora para saber se o
login funciona. Escrevemos testes que verificam a logica sozinhos, em segundos.

---

## Como rodar

Voce precisa ter o [Node.js](https://nodejs.org/) instalado.

```bash
npm install   # baixa o Jest (so na primeira vez)
npm test      # roda todos os testes
```

---

## Estrutura do projeto

```
seminario-testes-mobile/
├── src/
│   └── login.js          # a LOGICA da tela de login (validar e-mail, senha, login)
├── tests/
│   └── login.test.js     # os TESTES automatizados dessa logica
├── package.json          # configuracao do projeto e do comando "npm test"
└── README.md             # este arquivo
```

### O que cada funcao faz (`src/login.js`)

| Funcao | O que faz |
|--------|-----------|
| `validarEmail(email)` | Retorna `true`/`false` conforme o formato do e-mail. |
| `validarSenha(senha)` | Retorna `true` se a senha tiver **6+ caracteres** e **ao menos 1 numero**. |
| `login(email, senha)` | Retorna `{ sucesso, mensagem }` juntando as duas validacoes. |

---

## Demonstracao ao vivo: um teste pegando um BUG

No arquivo `tests/login.test.js` existe **um teste comentado** (no bloco
`validarSenha`). Ele serve para mostrar, na frente da turma, um teste
falhando e depois passando.

1. **Descomente** o teste chamado
   `aceita senha com EXATAMENTE 6 caracteres (valor limite)`.
2. Rode `npm test`. Ele vai **FALHAR** — o teste pegou o bug! 🐞
   O codigo usa `senha.length > 6` (errado), entao rejeita senhas de
   exatamente 6 caracteres, mesmo a regra sendo "minimo 6".
3. Em `src/login.js`, troque:

   ```js
   const tamanhoOk = senha.length > 6;   // ANTES (com bug)
   const tamanhoOk = senha.length >= 6;  // DEPOIS (corrigido)
   ```

4. Rode `npm test` de novo. Agora **TODOS passam**. ✅

> Isso ilustra o **teste de valor limite** (boundary testing), uma tecnica
> classica para pegar erros de fronteira (`>` vs `>=`) — comuns em apps reais.
