# 3. Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="2-Planejamento-Projeto.md"> Planejamento do Projeto do Software (Cronograma) </a></span>


## 3.1 Histórias de Usuários

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Lucas, 10 anos  | Identificar sentimentos          | Entender e aceitar melhor meus sentimentos               |
|Jessica, 32 anos       | Auxiliar minha filha na educação escolar                | Reforçar a introdução ao aprendizado da educação básica |
|  Mateus, 26 anos             | Ajudar meus pacientes a identificar sentimentos           | Auxiliar no entendimento de sentimentos               |
|  Sofia, 7 anos              | Manter o foco nas atividades e aprender brincando                 | Melhorar a concentração |
|  Rafael, 9 anos            | Aprender com jogos interativos e coloridos                 | Aprender ler e escrever |
|  Ana Clara, 27 anos             | Aprender brincando com jogos interativos                | tornar o aprendizado mais dinâmico |
|  Marcos, 7 anos           | Encontrar atividades tranquilas e divertidas                | Ajudar no foco e aprendizado |
|  Mariana, 24 anos             | Auxiliar com jogos de maneira lúdica e envolvente                | Estimular o desenvolvimento da fala  |
| Pedro, 11 anos             | Praticar e melhorar minha comunicação                | Interagir socialmente e entender emoções  |
|  Fernanda, 36 anos              | Explorar com minha filha novas habilidades                 | Desenvolver sua autonomia de maneira divertida |




## 3.2 Classificação dos Requisitos Funcionais x Requisitos não Funcionais 

### Requisitos Funcionais

|ID    | Descrição do Requisito                  | Prioridade |
|------|-----------------------------------------|------------|
|RF-001| Realizar cadastro |    ALTA    | 
|RF-002| Disponibilizar jogos simples, intuitivos e objetivos  |    ALTA   |
|RF-003| Utilizar cores mais leves  |    MÉDIA   |
|RF-004| Salvar a progressão do aluno  |    ALTA   |
|RF-005| Atualizar as recompensas na medida que sobe de nível  |    ALTA   |
|RF-006| Apresentar mensagens de erro ou sucesso, com mensagens encorajadoras   |    MÉDIA   |
|RF-007| Apresentar atividades que ajudem na alfabetização   |    ALTA   |
|RF-008| Permitir que o usuário recupere a senha  |    MÉDIA   |
|RF-009| Adicionar novos alunos no perfil do profissional |    ALTA   |
|RF-010| Disponibilizar relatórios dos alunos no perfil do profissional |    ALTA   |
|RF-011| Poder atualizar foto e outras informações do perfil |    MÉDIA   |


### Requisitos não Funcionais

|ID     | Descrição do Requisito                                            |Prioridade |
|-------|-------------------------------------------------------------------|-----------|
|RNF-001| O sistema deve ser responsivo para rodar em dispositivos moveis e desktops. |    ALTA  | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s.            |    ALTA  | 
|RNF-003| O sistema deve seguir a LGPD para proteção dos Dados.            |    ALTA  | 
|RNF-004| O sistema deve ser bem documentado para facilitar manutenções.             |    MÉDIA  | 
|RNF-005| Deve ser devensolvido em código limpo e com boas práticas de desenvolvimento.          |    MÉDIA  | 
|RNF-006| O sistema deve oferecer uma interface amigável e intuitiva para os usuários.            |    ALTA  | 
|RNF-007| O sistema deve ser compatível com diferentes navegadores e sistemas operacionais.           |    BAIXA  | 
|RNF-008| O sistema deve ser inclusivo, disponibilizando audio nas atividades e descrições           |    ALTA  | 



## Restrições

|ID| Restrição                                               |
|--|---------------------------------------------------------|
|01| O software deve ser compatível com Windows e Linux.     |
|02| O sistema deve ser desenvolvido utilizando React e MySQL.|
|03| Implementação de sistema de pontos, recompensas e ranking.|
|04| O conteúdo deve ser desenvolvido por especialistas para garantir precisão gramatical e contextual.|
|05| Evitar vieses culturais e oferecer exemplos que representem diferentes realidades.|
|06| Não utilizar materiais protegidos sem  permissão.|
|07| Simplicidade para que usuários possam utilizar sem dificuldade.|
|08| Evitar que os usuários desistam ao longo do aprendizado.|
|09| Proteção contra fraudes e vazamentos de dados.|
|10| Custos com hospedagem e manutenção da plataforma.|


