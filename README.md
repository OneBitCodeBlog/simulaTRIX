### README

# SimulaTRIX

SimulaTRIX é um projeto educacional da [onebitcode.com](https://onebitcode.com) desenvolvido para demonstrar o uso de tecnologias web modernas, incluindo HTML5, CSS3, JavaScript e ExpressJS. O projeto cria uma simulação de uma sala com três lâmpadas RGB e um ar-condicionado, permitindo controlar esses elementos através de um endpoint API.

## Propósito

O objetivo deste projeto é criar um agente de IA capaz de controlar a simulação de uma casa. Através da integração com a API da OpenAI, o agente recebe descrições de cenários e ajusta as configurações das luzes e do ar-condicionado de acordo. Este projeto pode ser utilizado como base para estudos e experimentações no desenvolvimento de aplicações web interativas e no uso de IA para automação e controle de ambientes.

## Funcionalidades

- Simulação de uma sala com três lâmpadas RGB e um ar-condicionado.
- Controle das configurações das lâmpadas e do ar-condicionado através de um formulário.
- Atualização automática das configurações a cada 3 segundos com base em um arquivo de configuração (`config.json`).


## Estrutura do Projeto

```
/project-root
├── node_modules/
├── public/
│   ├── house.png
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── config.json
├── openai-api.js
├── server.js
└── package.json
```

### Arquivos Principais

- `index.html`: Página principal que carrega a interface do SimulaTRIX.
- `styles.css`: Arquivo de estilos para a página HTML.
- `script.js`: Arquivo JavaScript responsável por enviar o cenário para o servidor e atualizar a interface com as novas configurações.
- `openai-api.js`: Função para chamar a API da OpenAI e obter as configurações das luzes e do ar-condicionado.
- `server.js`: Servidor ExpressJS que serve a página HTML, processa o endpoint `/setHouseSetup` e salva as configurações em `config.json`.

## Instruções de Desenvolvimento

As instruções detalhadas para o desenvolvimento do projeto estão disponíveis no arquivo [instructions.md](./instructions.md).

## Como Usar

### Pré-requisitos

- Node.js instalado
- Uma conta na OpenAI e uma chave de API válida

### Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/simulatrix.git
   cd simulatrix
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Defina a variável de ambiente para sua chave da API da OpenAI:
   ```sh
   export OPENAI_API_KEY='YOUR_OPENAI_API_KEY'
   ```

4. Inicie o servidor:
   ```sh
   node server.js
   ```

5. Abra o navegador e acesse:
   ```sh
   http://localhost:3000
   ```

### Uso

1. Insira um cenário desejado no campo de texto e clique em "Enviar". Por exemplo: "uma cena de filme romântico com luz suave e ar condicionado agradável".
2. O servidor processará o cenário através da API da OpenAI e atualizará as configurações das luzes e do ar-condicionado.
3. As configurações serão atualizadas automaticamente a cada 3 segundos com base no arquivo `config.json`.

## Contribuição

Sinta-se à vontade para contribuir com melhorias para este projeto. Fork o repositório, faça suas alterações e envie um pull request.

## Licença

Este projeto é licenciado sob a MIT License. Consulte o arquivo `LICENSE` para obter mais informações.

---

Projeto desenvolvido por [OneBitCode](https://onebitcode.com) para fins educacionais.