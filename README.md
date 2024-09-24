# EasyGrid _FrontEnd
Front end do Projeto EasyGrid, para disciplina DCC802-PROJETO E IMPLEMENTAÇÃO DE SISTEMAS, Orientada pelo Professor Dr. MARCELO HENRIQUE OLIVEIRA HENKLAIN

[X] Mostra Aba de Professores
[X] Mostra Aba de Horários
[] Rotas conectadas e funcionais com o backend
[] autenticação de login reativada

## Tipos de usuários

- Professor: Privilégios de visualização do schedule e sugestões de horários disponíveis(WIP).
- Coordenador: Privilégios totais de administração da plataforma, criação de usuários, criação de semestres, disciplinas e horários.

## Feito a partir do design desenvolvido pelo Professor Acauan Ribeiro  junto ao Departamento de Ciência da Computação da UFRR,para a tentativa de padronizar o layout de aplicações para o DCC.

E-mail: [email](mailto:acauan.ribeiro@ufrr.br)
Linkedin: [@acauanribeiro](https://www.linkedin.com/in/acauanribeiro)

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Node][Node.js]][Node-url]

## Instalação e configuração

### for development

1. Download the latest main branch files of the project.
2. Instal nodeJS and Docker in your machine.
3. Copy the file .env.example and rename it to ```.env``` then change its code to attend your database instance.
4. run the command ```docker compose up```.
5. in other terminal window, run ```npm run dev```.
