// =============================================================
//  TESTES AUTOMATIZADOS da tela de login (com Jest)
// =============================================================
//  Vocabulario rapido para a turma:
//   - describe(...) -> agrupa testes parecidos (uma "gaveta")
//   - test(...)     -> um teste individual
//   - expect(x).toBe(y) -> "eu ESPERO que x seja igual a y"
//
//  Se a realidade for diferente do esperado, o teste FALHA e o
//  Jest mostra exatamente o que deu errado.
// =============================================================

// Importamos as funcoes que queremos testar.
const { validarEmail, validarSenha, login } = require('../src/login');

// -------------------------------------------------------------
//  Testes do E-MAIL
// -------------------------------------------------------------
describe('validarEmail', () => {
  test('aceita um e-mail valido', () => {
    expect(validarEmail('usuario@email.com')).toBe(true);
  });

  test('rejeita um e-mail invalido (sem @)', () => {
    expect(validarEmail('usuarioemail.com')).toBe(false);
  });

  test('rejeita campo de e-mail vazio', () => {
    expect(validarEmail('')).toBe(false);
  });
});

// -------------------------------------------------------------
//  Testes da SENHA
// -------------------------------------------------------------
describe('validarSenha', () => {
  test('rejeita senha curta (menos de 6 caracteres)', () => {
    expect(validarSenha('a1')).toBe(false);
  });

  test('rejeita senha sem numero', () => {
    expect(validarSenha('senhasegura')).toBe(false);
  });

  test('aceita senha valida (6+ caracteres com numero)', () => {
    expect(validarSenha('senha123')).toBe(true); // 8 caracteres, tem numero
  });

  // ===========================================================
  //  >>> TESTE COMENTADO - DEMONSTRACAO DO BUG AO VIVO <<<
  // ===========================================================
  //  Descomente o teste abaixo durante a apresentacao.
  //
  //  Ele testa o VALOR LIMITE: uma senha com EXATAMENTE 6
  //  caracteres e um numero ("abc123"). Pela regra ("minimo 6")
  //  ela DEVERIA ser valida. Mas o codigo tem um bug: usa
  //  "> 6" em vez de ">= 6", entao rejeita senhas de 6 caracteres.
  //
  //  Roteiro da demonstracao:
  //   1) Descomente o teste -> rode "npm test" -> ele FALHA (bug pego!)
  //   2) Em src/login.js, troque  senha.length > 6
  //      por                      senha.length >= 6
  //   3) Rode "npm test" de novo -> o teste PASSA. 🎉
  //
  //  Moral para a turma: esse e um "teste de valor limite", uma
  //  tecnica classica de teste que pega erros de fronteira (>, >=).
  // ===========================================================
  // test('aceita senha com EXATAMENTE 6 caracteres (valor limite)', () => {
  //   expect(validarSenha('abc123')).toBe(true);
  // });
});

// -------------------------------------------------------------
//  Testes do LOGIN (juntando tudo)
// -------------------------------------------------------------
describe('login', () => {
  test('falha quando os campos estao vazios', () => {
    const resultado = login('', '');
    expect(resultado.sucesso).toBe(false);
    expect(resultado.mensagem).toBe('Preencha e-mail e senha.');
  });

  test('falha com e-mail invalido', () => {
    const resultado = login('email-invalido', 'senha123');
    expect(resultado.sucesso).toBe(false);
  });

  test('falha com senha invalida', () => {
    const resultado = login('usuario@email.com', '123'); // senha curta
    expect(resultado.sucesso).toBe(false);
  });

  test('faz login com credenciais corretas', () => {
    const resultado = login('usuario@email.com', 'senha123');
    expect(resultado.sucesso).toBe(true);
    expect(resultado.mensagem).toBe('Login realizado com sucesso!');
  });
});
