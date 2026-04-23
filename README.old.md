# 🥗 Desafio React — Calculadora de Retorno do Almoço (Outback)

> **Nível:** Júnior (não praticante)  
> **Stack:** React + JavaScript  
> **Foco:** Lógica, estado e reatividade

Este desafio foi pensado para quem **ainda não trabalha na área**, mas já estudou React e quer **praticar os fundamentos mais importantes usados no mercado**.

---

## 🎯 Objetivo do Projeto

Desenvolver uma aplicação simples em **React** que ajude colaboradores do **Outback Steakhouse** a calcular **automaticamente** o horário de retorno ao trabalho após o almoço.

O foco **não é layout avançado**, nem arquitetura complexa. O foco é:

- Pensar como programador(a)
- Manipular estado corretamente
- Resolver uma regra de negócio real

---

## 🧠 Contexto de Negócio

No Outback, existem **três durações fixas de almoço**:

- 🕒 **35 minutos**
- 🕒 **1 hora e 5 minutos (01:05)**
- 🕒 **2 horas e 5 minutos (02:05)**

A pessoa informa o horário em que saiu para o almoço, escolhe uma dessas opções, e o sistema calcula o **horário de retorno**.

---

## 🛠️ O que deverá ser desenvolvido

Uma aplicação React que:

- Possua um campo para inserir o **horário de saída para o almoço**;
- Permita escolher **apenas um** tempo de almoço;
- Calcule o horário de retorno automaticamente;
- Atualize o resultado sempre que algum dado mudar.

---

## ⚙️ Restrições Técnicas (Importante)

✅ Utilize apenas:
- React
- JavaScript
- Hooks básicos (`useState` e, se quiser, `useEffect`)

❌ Não utilize:
- Context API
- Redux
- Bibliotecas de data (`moment`, `dayjs`, etc.)

> ⚠️ A lógica de cálculo **deve ser feita manualmente**, para fins de aprendizado.

---

## 🧩 Requisitos Funcionais

### 1️⃣ Entrada de horário

- Deve existir um `<input type="time" />`;
- O valor do input deve ser controlado via `useState`.

**O que será verificado**
- O input aparece na tela;
- O horário digitado é armazenado no estado.

---

### 2️⃣ Seleção do tempo de almoço

- Deve existir uma forma de selecionar **um** dos três tempos:
  - 35 minutos
  - 1h05
  - 2h05
- Pode ser feito com `radio buttons` ou `select`.

**O que será verificado**
- As três opções estão disponíveis;
- Apenas uma pode ser selecionada por vez;
- O valor selecionado é salvo no estado.

---

### 3️⃣ Cálculo do horário de retorno (Regra de Negócio)

O sistema deve:

1. Converter o horário inicial (`HH:mm`) para minutos;
2. Somar o tempo de almoço escolhido;
3. Converter o resultado final de volta para `HH:mm`.

**O que será verificado**
- O cálculo está correto;
- A lógica funciona ao virar a hora (ex: `11:30 → 12:35`).

---

### 4️⃣ Atualização automática

- O cálculo **não deve depender de botão**;
- Sempre que o horário ou o tempo de almoço mudar, o retorno deve ser recalculado.

**O que será verificado**
- O resultado muda automaticamente ao alterar qualquer dado.

---

## 🖥️ Exibição do Resultado

O horário final deve ser exibido no formato:

**🕓 Retorno previsto: 13:05**

Caso o horário ou o tempo não estejam preenchidos, o resultado pode não aparecer.

---

## 🧪 Bônus (Opcional — somente após funcionar)

- Validar se o horário está vazio;
- Mostrar mensagens amigáveis;
- Separar a aplicação em componentes:
  - `TimeInput`
  - `LunchOptions`
  - `Result`
- Criar a função de cálculo isolada do JSX.

---

## ✅ Critérios de Conclusão

- A aplicação funciona do início ao fim;
- O código é simples e legível;
- Você consegue explicar:
  - Como o estado funciona;
  - Como o horário é calculado;
  - Por que o retorno atualiza automaticamente.

---

## 🚀 O que você aprende com esse desafio

- ✅ Lógica de programação
- ✅ Manipulação de tempo e números
- ✅ Uso correto do `useState`
- ✅ Reatividade do React
- ✅ Criação de projeto real para portfólio

---

## 🧠 Dica Final

> Se você **entender e conseguir explicar esse projeto**, você está evoluindo de verdade como **júnior**, mesmo sem experiência profissional.

Boa prática e bom código! 🔥