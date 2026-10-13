# 📚 Catálogo de Livros (React + TypeScript + Tailwind CSS)

Aplicação web responsiva desenvolvida em **React** com **TypeScript** e **Tailwind CSS**, consumindo uma API REST real fornecida pelo **CrudCrud**. O projeto simula um catálogo interativo para listagem, cadastro, atualização de status e remoção de livros.

---

## 🚀 Funcionalidades

- **Listagem de Livros (GET):** Obtém e exibe os livros armazenados na API em tempo real.
- **Cadastro de Livros (POST):** Formulário tipado para adicionar novos livros com Título, Autor e Status.
- **Remoção de Livros (DELETE):** Elimina o livro selecionado da base de dados.
- **Atualização de Status (PUT - Opcional):** Alterna o status do livro entre *"Lido"* e *"Não lido"*.
- **Design 100% Responsivo:** Interface otimizada para ecras de **Telemóvel (Mobile)**, **Tablet** e **Computador (Desktop)**.
- **Tratamento de Erros:** Gestão de estados de carregamento (*loading*), lista vazia e falhas de rede com `try/catch`.

---

## 🛠️ Tecnologias Utilizadas

- **[React](https://react.dev/)** (com Vite)
- **[TypeScript](https://www.typescriptlang.org/)** (Tipagem estrita de props, eventos e dados)
- **[Tailwind CSS](https://tailwindcss.com/)** (Estilização responsiva utility-first)
- **[Axios](https://axios-http.com/)** (Cliente HTTP para requisições à API REST)
- **[CrudCrud](https://crudcrud.com/)** (Serviço de API REST temporária)

---

## 📱 Layout Responsivo

O layout foi concebido utilizando estratégias *mobile-first* e *breakpoints* do Tailwind CSS:
- **Mobile (< 640px):** Disposição vertical empilhada com botões e seletores de largura total para facilidade de toque.
- **Tablet (≥ 640px):** Reorganização horizontal dos itens da lista e botões ajustados.
- **Desktop (≥ 1024px):** Layout em grelha (*Grid*) de 2 colunas com o formulário fixo (*sticky*) à esquerda e a lista à direita.

---

## 📦 Como Executar o Projeto Localmente

### Pré-requisitos
Certifica-te de ter o **Node.js** (versão 18 ou superior) e o **npm** instalados na tua máquina.

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/SEU_USUARIO/meu-projeto.git](https://github.com/SEU_USUARIO/meu-projeto.git)
