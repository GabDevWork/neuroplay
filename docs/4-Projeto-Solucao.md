## 4. Projeto da Solução

<span style="color:red">Pré-requisitos: <a href="3-Especificação.md"> Especificação do Projeto (Requisitos do Software) </a></span>

## 4.1. Arquitetura da solução

A arquitetura da aplicação Neuroplay pode ser iniciada com o usuário acessando a aplicação via navegador web. Na página de acesso, o usuário digita login e senha. Em seguida, a aplicação acessa o servidor enviando requisições, que faz a conexão com a API validando usuario, senha, perguntas e atividades no banco de dados no MySQL Workbench.

 
 **Diagrama de Arquitetura**:
 
 ![Exemplo de Arquitetura](./images/DR_Arquitetura-solucao.png)
 
 >FONTE: https://www.researchgate.net/figure/Figura-2-Diagrama-de-arquitectura-del-sistema_fig1_361400461 
 

### 4.2. Wireframes/Mockups de telas

Link Prototipo: https://www.figma.com/design/6XlrwMVRBARnI8rGhep71O/NeuroPlay?node-id=1-2&p=f



### 4.3. Modelo de dados


Deseja-se criar um banco de dados para a aplicação interativa, para armazenar as informações dos usuários assim como seu progresso, as atividdaes para que possam ser apresentadas na tela assim como os selos vinculados a cada usuário. Utilizando um Modelo Mysql com um modelo Relacional.

#### 4.3.1 Modelo ER

![Modelo DER](./images/MER_Final.drawio1.png)


#### 4.3.2 Esquema Relacional


![Exemplo de um modelo relacional](./images/EsqRel_NeuroPlay.drawio.png)
---


#### 4.3.3 Modelo Físico

<code>

 -- Criação do banco de Dados
create database neuro_play;

-- Utilizando o Banco para as querys seguintes
use neuro_play;

-- Criação da tabela Profissional
CREATE TABLE Profissional(
pro_id INT PRIMARY KEY NOT NULL auto_increment,
pro_nome VARCHAR(100),
pro_usuário VARCHAR(30) UNIQUE NOT NULL,
pro_senha VARCHAR(30) NOT NULL,
pro_email VARCHAR(30) UNIQUE,
pro_tipo VARCHAR(30) CHECK ( pro_tipo in ('Terapeuta', 'Professor'))
);


-- Criação da tabela Criança
CREATE TABLE Crianca (
cri_id INT PRIMARY KEY NOT NULL auto_increment,
cri_nome VARCHAR(100),
cri_senha VARCHAR(30) NOT NULL,
cri_usuário VARCHAR(30) UNIQUE NOT NULL,
cri_idade INT,
cri_pro_id INT,
cri_necessidade VARCHAR(30) CHECK(cri_necessidade in('Dislexia', 'TDAH', 'TEA', 'Outro')),
foreign key (cri_pro_id) REFERENCES Profissional (pro_id)
);


-- Criação da tabela Animal
CREATE TABLE Animal (
an_id INT PRIMARY KEY NOT NULL auto_increment,
an_descricao VARCHAR(255),
an_nome VARCHAR(100),
an_foto VARCHAR(255)
);


-- Criação da tabela Selo
CREATE TABLE Selo (
se_id INT PRIMARY KEY NOT NULL auto_increment,
se_nome VARCHAR(100),
se_foto VARCHAR(255)
);

-- Criação da tabela Nivel
CREATE TABLE Nivel (
ni_id INT PRIMARY KEY NOT NULL auto_increment,
ni_nome VARCHAR(30),
ni_descricao VARCHAR(30),
ni_dificuldade INT,
ni_id_an INT,
ni_id_se INT,
foreign key (ni_id_an) REFERENCES Animal (an_id),
foreign key (ni_id_se) REFERENCES Selo (se_id)
);

-- Criação Tabela Atividade
CREATE TABLE Atividade (
at_id INT NOT NULL auto_increment,
at_ni_id INT,
at_pergunta VARCHAR(255),
at_opcaoa VARCHAR(255),
at_opcaob VARCHAR(255),
at_opcaoc VARCHAR(255),
at_opcaod VARCHAR(255),
at_resposta VARCHAR(255),
PRIMARY KEY (at_id, at_ni_id),
foreign key (at_ni_id) REFERENCES Nivel (ni_id)
);

-- Criação da Tabela Progresso
CREATE TABLE Progresso(
pro_id INT PRIMARY KEY NOT NULL auto_increment,
pro_cri_id INT,
pro_ni_id INT,
pro_data DATE,
foreign key (pro_cri_id) REFERENCES Crianca (cri_id),
foreign key (pro_ni_id) REFERENCES Nivel (ni_id),
);

-- Criação da Tabela Progresso dos selo
CREATE TABLE Progresso_selo(
prose_id INT PRIMARY KEY NOT NULL auto_increment,
prose_pro_id INT,
prose_se_id INT,
prose_data DATE,
foreign key (prose_pro_id) REFERENCES Progresso (pro_id),
foreign key (prose_se_id) REFERENCES Selo (se_id)
);

-- Criação da Tabela Progresso dos Animais
CREATE TABLE Progresso_animal(
proan_id INT PRIMARY KEY NOT NULL auto_increment,
proan_pro_id INT,
proan_an_id INT,
proan_data DATE,
foreign key (proan_pro_id) REFERENCES Progresso (pro_id),
foreign key (proan_an_id) REFERENCES Animal (an_id)
);

</code>

**Este script deverá ser incluído em um arquivo .sql na pasta src\bd.**




### 4.4. Tecnologias


As tecnologias selecionadas visam atender à necessidade de rápida implementação da solução, priorizando aquelas que garantem um trabalho eficaz e eficiente.

Sistema de Gerenciamento de Banco de Dados

MySQL Server: Um sistema de gerenciamento de banco de dados relacional de código aberto amplamente adotado. Sua confiabilidade e escalabilidade permitem acesso e gerenciamento rápido de dados, facilitando decisões baseadas em informações atualizadas.

Arquitetura de Banco de Dados

SQL: Uma linguagem padronizada que facilita a consulta e recuperação de dados. Permite a definição de restrições de integridade, garantindo a qualidade dos dados e reduzindo erros.

Front-end

HTML5: A versão mais recente da linguagem de marcação da web, que permite a criação ágil de conteúdos online.

CSS3: Proporciona novos recursos de design e layout, criando interfaces atraentes e responsivas sem comprometer a rapidez de desenvolvimento.

React: Um framework que simplifica o desenvolvimento de sites responsivos e visualmente atraentes, resultando em entregas de alta qualidade em menos tempo, essencial para adicionar interatividade às páginas web, permitindo que as aplicações respondam rapidamente às ações dos usuários.

Back-end

API e React: Utilizado no back-end, sua versatilidade permite que o aplicação NeuroPlay se conecte a serviços externos e troque dados oferecendo flexibilidade e agilidade, permitindo o desenvolvimento de aplicações de forma simples e adaptável às necessidades do projeto.

IDE Padrão

Visual Studio Code: Um editor de código leve e personalizável, amplamente utilizado. Sua integração com o GitHub facilita o gerenciamento eficiente de projetos, otimizando o tempo de desenvolvimento.

Versionamento

Git: Um sistema de controle de versão que rastreia alterações em arquivos de código-fonte, permitindo que a equipe trabalhe simultaneamente em diferentes partes do projeto sem conflitos.

GitHub: Plataforma de hospedagem de código-fonte que utiliza o Git, facilitando a colaboração e o gerenciamento de projetos, além de manter um histórico claro de alterações e acelerar o ciclo de desenvolvimento.

Ilustração

 ![Exemplo de ilustração](./images/ilustracao-fuxo.png)


| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| SGBD           | MySQL           |
| Front end      | React     |
| Back end       | API React |
| Deploy         | Github Pages    |

