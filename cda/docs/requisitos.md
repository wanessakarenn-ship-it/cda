# DOCUMENTAÇÃO DE REQUISITOS DE SOFTWARE (SRS)

**Projeto:** Ciclo de Desempenho Automatizado (CDA 2026)  
**Versão:** 05  
**Data:** Janeiro de 2026  
**Status:** Atualizado (Stack Node 22 / Rsbuild / PostgreSQL)

---

## 1. INTRODUÇÃO

### 1.1 Objetivo do Sistema
O CDA 2026 visa automatizar o fluxo de gestão de desempenho humano, eliminando processos manuais e planilhas. A plataforma integra avaliações, cálculos de mérito e posicionamento na matriz Nine Box em um único ecossistema digital.

### 1.2 Metas de Sucesso (KPIs)
* **Integridade:** 100% das tabelas validadas via script de diagnóstico.
* **Performance:** Carregamento de componentes React em menos de 3 segundos (RNF 1.1).
* **Automação:** Liberação de trilhas de carreira baseada no score de mérito (RF 2.3).

---

## 2. REQUISITOS FUNCIONAIS (RF)

### 2.1 Gestão de Ciclo e Onboarding
* **RF 1.1 - Manutenção de Ciclo:** Permitir criar e gerenciar períodos de avaliação, validando datas e evitando duplicidade.
* **RF 1.2 - Cadastro de Colaboradores:** Gerenciar dados vinculando o acesso do usuário à sua identidade funcional.
* **RF 1.3 - Validação de Preenchimento:** Bloquear o envio de avaliações com itens de competência ou metas obrigatórios vazios.

### 2.2 Cálculo e Resultados
* **RF 2.1 - Cálculo de Mérito:** Processamento automático do score final cruzando notas de competências e metas.
* **RF 2.2 - Matriz Nine Box Dinâmica:** Posicionamento automático nos eixos de Potencial (X) e Desempenho (Y) após a finalização do ciclo.
* **RF 2.3 - Elegibilidade de Carreira:** Identificação automática de colaboradores aptos a novos planos de carreira através do campo `elegivel_carreira`.

---

## 3. REQUISITOS NÃO FUNCIONAIS (RNF)

### 3.1 Performance e Desenvolvimento (Stack)
* **RNF 1.1 - Build System:** Uso do **Rsbuild** para garantir compilação de alta performance e suporte a HMR (Hot Module Replacement).
* **RNF 1.2 - Tipagem:** Implementação em TypeScript com modo `strict: true` para garantir integridade de dados.
* **RNF 1.3 - Consistência:** Configuração de compilador para forçar nomes de arquivos consistentes (Windows/Linux).

### 3.2 Segurança e Dados
* **RNF 2.1 - Autenticação:** Uso do campo `senha` na tabela `usuario` para armazenamento de credenciais.
* **RNF 2.2 - Criptografia:** Dados sensíveis devem ser protegidos em trânsito e em repouso.
* **RNF 2.3 - Conformidade:** Tratamento de dados de desempenho em total conformidade com a LGPD.

---

## 4. ESTRUTURA DE DADOS (RESUMO)

### 4.1 Entidades Principais
* **USUARIO:** Armazena email e `senha`.
* **COLABORADOR:** Vincula o usuário ao seu cargo e gestor.
* **PONTUACAO:** Tabela unificada para notas de Competências (Gerais/Específicas) ou Metas.
* **NINE_BOX:** Resultado consolidado do ciclo e elegibilidade.



---

## 5. HISTÓRICO DE VERSÕES

| Versão | Alterações |
| :--- | :--- |
| 04 | Simplificação para MVP. |
| 05 | Atualização para Stack Rsbuild, unificação de `pontuacao` e alteração de `senha_hash` para `senha`. |

