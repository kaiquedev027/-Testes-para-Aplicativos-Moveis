// =============================================================
//  Logica de uma TELA DE LOGIN de um aplicativo movel
// =============================================================
//  Este arquivo NAO tem interface grafica. Ele guarda apenas a
//  REGRA DE NEGOCIO (a logica) que ficaria por tras da tela de
//  login de um app. E justamente essa logica que conseguimos
//  testar de forma automatizada com o Jest.
//
//  A ideia para a turma: nao precisamos abrir o app no celular
//  toda vez para saber se o login funciona. Escrevemos testes
//  que verificam a logica sozinhos, em segundos.
// =============================================================

/**
 * Valida o FORMATO de um e-mail.
 * @param {string} email - e-mail digitado pelo usuario
 * @returns {boolean} true se o formato for valido, false caso contrario
 */
function validarEmail(email) {
  // Se nao veio nada (undefined, null ou texto vazio), ja e invalido.
  if (!email) {
    return false;
  }

  // Expressao regular bem simples no formato: algo@algo.algo
  //   \S+  -> um ou mais caracteres que NAO sao espaco
  //   @    -> o arroba obrigatorio
  //   \.   -> um ponto separando dominio e extensao (ex.: .com)
  const formato = /^\S+@\S+\.\S+$/;

  return formato.test(email);
}

/**
 * Valida a SENHA do usuario.
 * Regras: no minimo 6 caracteres E pelo menos 1 numero.
 * @param {string} senha
 * @returns {boolean}
 */
function validarSenha(senha) {
  if (!senha) {
    return false;
  }

  // Verifica se existe pelo menos um numero (de 0 a 9) na senha.
  const temNumero = /[0-9]/.test(senha);

  // A senha precisa ter 6 caracteres OU MAIS.
  //
  // ATENCAO: aqui mora um BUG PROPOSITAL para a demonstracao!
  // O correto seria ">= 6" (6 ou mais). Como esta ">" (maior que 6),
  // senhas com EXATAMENTE 6 caracteres sao rejeitadas por engano.
  // O teste comentado em tests/login.test.js pega esse erro.
  const tamanhoOk = senha.length > 6;

  return tamanhoOk && temNumero;
}

/**
 * Simula a tentativa de LOGIN do usuario.
 * @param {string} email
 * @param {string} senha
 * @returns {{ sucesso: boolean, mensagem: string }}
 */
function login(email, senha) {
  // 1) Algum campo vazio? Nem adianta continuar.
  if (!email || !senha) {
    return { sucesso: false, mensagem: 'Preencha e-mail e senha.' };
  }

  // 2) E-mail com formato invalido.
  if (!validarEmail(email)) {
    return { sucesso: false, mensagem: 'E-mail invalido.' };
  }

  // 3) Senha fora das regras.
  if (!validarSenha(senha)) {
    return {
      sucesso: false,
      mensagem: 'Senha invalida: minimo 6 caracteres e ao menos 1 numero.',
    };
  }

  // 4) Passou por tudo: login liberado!
  return { sucesso: true, mensagem: 'Login realizado com sucesso!' };
}

// Exporta as funcoes para que o arquivo de testes consiga usa-las.
module.exports = { validarEmail, validarSenha, login };
