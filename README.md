##BrainBuster - Quiz App

BrainBuster é um aplicativo de quiz interativo desenvolvido em React Native. O objetivo do app é proporcionar uma experiência de aprendizado divertida e dinâmica, permitindo que os usuários respondam a perguntas de diversas categorias e recebam feedback instantâneo sobre seu desempenho.

##Features

#Cadastro de Temas e Perguntas:

Administra perguntas e respostas por temas específicos.
Interface para criar e editar temas de perguntas.
Interface para cadastrar perguntas com até 4 alternativas.

#Jogo de Quiz:

Modo de jogo com múltipla escolha.
Perguntas são apresentadas de acordo com o tema selecionado pelo usuário.
Sistema de pontuação baseado em respostas corretas e incorretas.
Exibição de resultados ao final do quiz com porcentagem de acertos.

#Banco de Dados Local (SQLite):

O app utiliza o SQLite para armazenar as perguntas e respostas de forma local.
Operações CRUD (Create, Read, Update, Delete) para gerenciar temas e perguntas.

#Navegação Simplificada:

Fluxo de telas intuitivo utilizando React Navigation.
Transição entre telas como cadastro de perguntas, tela de jogo, tela de resultado e mais.

##Tecnologias Utilizadas

React Native: Framework principal para desenvolvimento mobile.

SQLite: Banco de dados local utilizado para armazenar perguntas e temas.

Expo: Plataforma usada para facilitar o desenvolvimento do aplicativo, incluindo o uso de fontes customizadas e componentes de UI.

JavaScript: Linguagem principal de desenvolvimento.

Expo SQLite/Next: Para execução das operações de banco de dados de forma assíncrona.

##Estrutura do Projeto

#Telas

Tela de Lobby (App.js):

Tela inicial do aplicativo.

Botão para começar o quiz e acessar as opções de cadastro.

Tela de Cadastro de Temas (TelaCadTemas.js):

Permite ao usuário cadastrar novos temas de perguntas.
Possui validações para garantir que o nome do tema seja válido.
Funções para editar e excluir temas existentes.

Tela de Cadastro de Perguntas (TelaCadPerguntas.js):

Permite ao usuário cadastrar perguntas relacionadas a um tema.
O usuário pode definir as 4 alternativas e a resposta correta.

Tela de Jogo (TelaJogo.js):

Apresenta as perguntas e alternativas embaralhadas.
O jogador seleciona uma resposta e a pontuação é calculada com base nas respostas corretas.
Navega para a tela de resultados ao final do jogo.

Tela de Resultado (TelaResultado.js):

Exibe a pontuação final do jogador.
Mostra o desempenho em cada pergunta (correto/incorreto).
O jogador pode voltar para a tela inicial ou jogar novamente.

Banco de Dados

As operações de banco de dados são realizadas com Expo SQLite/Next. O banco de dados local armazena as perguntas e temas, e as funcionalidades de CRUD são aplicadas nas seguintes operações:

getTemas(): Obtém todos os temas cadastrados.
addTema(): Cadastra um novo tema.
addPergunta(): Cadastra uma nova pergunta.
getPerguntasByTema(): Recupera todas as perguntas associadas a um tema específico.

Fontes Customizadas
O aplicativo usa a fonte Jura, que é carregada utilizando o Expo Google Fonts para uma aparência mais estilizada.
