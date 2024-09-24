# EasyGrid _FrontEnd
Front end do Projeto EasyGrid, para disciplina DCC802-PROJETO E IMPLEMENTAÇÃO DE SISTEMAS, Orientada pelo Professor Dr. MARCELO HENRIQUE OLIVEIRA HENKLAIN

[x] Mostra Aba de Professores
[x] Mostra Aba de Horários
[x]Rotas conectadas e funcionais com o backend
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

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-url]: www.linkedin.com/in/acauanribeiro
[product-screenshot]: frontend/public/images/screen-shot-dcc.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/node.js-026e00?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/pt-br/

## Instalação e configuração

### for development

1. Download the latest main branch files of the project.
2. Instal nodeJS and Docker in your machine.
3. Copy the file .env.example and rename it to ```.env``` then change its code to attend your database instance.
4. run the command ```docker compose up```.
5. in other terminal window, run ```npm run dev```.
