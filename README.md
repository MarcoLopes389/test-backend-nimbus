# Inicialização do projeto

Antes de executar qualquer comando, copie o arquivo .env.sample e altere com os dados de acesso ao banco de dados local.
Caso prefira, pode executar o arquivo start-database{.sh,.bat} para criar uma máquina docker com postgres iniciado.

Para iniciar o banco de dados, deve-se rodar o comando:
```bash
npm run db:setup
```
Para iniciar a aplicação com instalação de dependências deve-se rodar:
```bash
npm run startup
```
Para fazer uma requisição ao endpoint criei dois arquivos de script, um para ambiente linux e outro para windows:
- request.sh
- request.bat

Ambos os arquivos executam um cURL para chamada do endpoint.

Para rodar os testes o comando é o seguinte:
```bash
npm run test
```

# Análise inicial arquitetural

Primeiramente identifiquei que o projeto utiliza a estrutura de use-cases, então resolvi alterar a estrutura de pastas para separar adequadamente as funções.
Estou acostumado a utilizar classes para implementar meus projetos, porém como a implementação base está utilizando funções, preferi manter.

Geralmente gosto de utilizar a seguinte arquitetura:

- entities: entidades do negócio
- dtos: modelos de transferência de dados
- repositories: acesso a dados do banco de dados
- controllers: onde ficam declarados os endpoints
- services/use-cases: onde ficam as regras de negócio

Por geralmente utilizar DDD, sempre separo os projetos por módulos, porém como é um projeto mais simples, preferi manter sem módulos

# Análise de stack

A stack padrão quando estou programando com javascript usando typescript costumo usar:

- TypeORM (acesso a banco de dados)
- Nestjs (requisições HTTP e injeção de dependência)
- class-validator (Validação de dados de entrada)

Para projetos com javascript puro, acredito que a seguinte stack seja mais interessante:

- Sequelize (acesso a banco de dados)
- Express

Como a primeira stack geralmente é a que eu mais uso, decidi fazer outra implementação do projeto na branch *my-stack* para demonstrar habilidades.

# Cenários de teste

Para os testes, mapeei os seguintes tratamentos que devem ser feitos na regra de negócio:

- Foi inserida um data de início maior que de fim
- Foi inserido apenas uma das datas ou nenhuma
- O range em questão não tem dados

# Possíveis bugs encontrados no use case:

- avg não estava sendo calculado, apenas era somado o total dos danos e não era feita nem a divisão nem o arredondamento
- troquei o delete pela função própria para isto, que é do objeto Reflect
- os objetos minDamageEvent e maxDamageEvent ficaram com as datas, mesmo não sendo necessário
- para dias que não possuem dados no mesmo range precisam ser adicionados