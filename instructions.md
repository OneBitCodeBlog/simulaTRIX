### instructions.md

# Passo a Passo do Desenvolvimento do Projeto SimulaTRIX

## Casa Virtual
1. **Criação da Primeira Versão da Casa Virtual:**
    - Utilizei o seguinte prompt para o chatGPT gerar a primeira versão da casa virtual:

    ```dart
    Estou criando um "simulador" de casa, onde terei três lâmpadas RGB e um ar-condicionado. Por favor, me ajude a criar o código frontend deste simulador.

    Especificações da Casa:
    - Na parte superior da página, deve aparecer o título grande: Simulatrix
    - Abaixo dele, um quadrado que representa a casa (apenas uma sala)
    - Na sala, teremos uma imagem de fundo ocupando 100% chamada house.png
    - Na sala, haverá três lâmpadas: uma central e duas laterais
    - Na sala, haverá um ar-condicionado na parede inferior
    - Devo ser capaz de controlar via input dois parâmetros nessas lâmpadas (para cada uma): a cor RGB e a intensidade de 0 a 99
    - Também devo ser capaz de controlar se o ar está ligado e qual a temperatura dele (que deve ter os limites do padrão)
    - Quando eu mudar os parâmetros, a página deve exibir automaticamente a iluminação gerada pelas lâmpadas, com a nova cor e intensidade individual de cada uma
    - Essa iluminação deve ser sutil e com gradiente, não deve ir além da sala, mas preencher todo o espaço da sala
    - Quando eu mudar a configuração do ar-condicionado, ele deve mudar de cor e exibir a temperatura atual
    - Especificações Tecnológicas:
    - Use apenas HTML5, CSS3 e JavaScript

    Crie os códigos, por favor.
    ```

    - Com o código gerado, abri o VS Code, criei uma nova pasta e adicionei o arquivo gerado pelo chatGPT.
    - Testei a versão 1 no navegador.
    - Solicitei ajustes até ficar satisfeito com o resultado.

## Criação da Função de Integração com a API da OpenAI
2. **Definição do Prompt para a API:**
    - Criei um prompt específico para a API da OpenAI, para que, ao receber um cenário como "noite romântica", ela devolvesse em formato JSON as configurações das luzes e do ar-condicionado.

    ```dart
    Eu tenho 3 luzes na minha sala, elas são RGB e têm intensidade de 0 a 99, além de um ar-condicionado com controle de temperatura de 16°C a 30°C e função de ligar/desligar.

    Qual deve ser a configuração deles para o que foi descrito aqui: ${description}

    Você deve me responder no seguinte formato sempre:

    [
      {"luz principal": {"intensidade": x, "código rgb": y}},
      {"luz esquerda": {"intensidade": x, "código rgb": y}},
      {"luz direita": {"intensidade": x, "código rgb": y}},
      {"ar condicionado": {"estado": "ligado/desligado", "temperatura": z}}
    ]
    ```

3. **Criação da Função de Integração:**
    - Criei um prompt para o chatGPT explicando exatamente como deveria ser a função de integração com a API da OpenAI e passei o prompt anterior.

    ```dart
    Crie um arquivo javascript com uma função para chamar a API da OpenAI.

    Especificações:
    - Ele deve chamar a API passando um prompt com um parâmetro, e deve retornar a resposta da OpenAI
    - O modelo que ele deve chamar é o gpt-4o-mini
    - A função deve ser exportada ao final
    - O prompt a se passar é:
    {Prompt}
    ```

    - Adicionei o código gerado ao meu projeto.
    - Adicionei minha API key.
    - Testei a função.

## Criação da API
4. **Definição do Prompt para a Criação da API:**
    - Criei um prompt para o chatGPT explicando como deveria ser a minha API, qual função ele deveria chamar e passei as especificações, dependências, etc.

    ```dart
    Vamos criar um servidor com expressJS.

    Especificações:
    - Ele deve ter um endpoint chamado setHouseSetup
    - Esse endpoint deve chamar a função criada anteriormente passando o parâmetro que recebeu
    - Ele deve escrever as configurações recebidas em formato json em um arquivo chamado config.json
    - Ele deve devolver as configurações em json
    - Esse mesmo server, deve servir a página index.html

    Crie agora.
    ```

    - Adicionei o código gerado ao meu projeto.
    - Atualizei o código.
    - Testei o endpoint via Postman.

    ```dart
    Crie um json de importação para ser usado no postman, para que eu possa testar o endpoint criado.
    ```

## Integração da API com a Casa Virtual
5. **Adaptação do Código da Casa Virtual:**
    - Pedi ao chatGPT para adaptar o código da simulação da casa para chamar o endpoint criado a cada 3 segundos e para remover os controles manuais.

    ```dart
    Vamos atualizar o index.html, o objetivo é remover os controles manuais das lâmpadas e integrar ele com nossos endpoints.

    Especificações:
    - Remova os controles manuais das lâmpadas e do ar
    - Adicione um box com input e botão de submissão para enviar o cenário desejado ao endpoint setHouseSetup, ele vai devolver a configuração atual
    - Após a submissão o box deve ser limpo
    - A cada 3 segundos, baixe as configurações atuais da casa de /config.json e atualize as luzes e o ar baseado nas novas configurações
    ```

    - Testei tudo junto.

## Tornando a API Pública
6. **Instalação e Configuração do ngrok:**
    - Instalei o ngrok.
    - Executei o ngrok em um novo terminal.
    - Testei a URL online.

## Criação de um GPT Customizado
7. **Configuração do GPT Customizado:**
    - No chatGPT, criei um GPT customizado passando as configurações necessárias.

    ```dart
    Sua única função é chamar a API passando a descrição que eu enviar (formatada para o objetivo).
    A API muda as configurações de luzes RGB e ar condicionado da minha casa.
    Sempre que a API responder, diga que a configuração da casa foi atualizada com sucesso.
    ```

    - Configuração:

    ```json
    {
      "openapi": "3.1.0",
      "info": {
        "title": "Set new configuration",
        "description": "Set new configuration from SimulaTRIX",
        "version": "v1.0.0"
      },
      "servers": [
        {
          "url": "https://[seu-endereco-ngrok].ngrok-free.app"
        }
      ],
      "paths": {
        "/getConfiguration": {
          "post": {
            "description": "Set new configuration",
            "operationId": "SetNewConfiguration",
            "requestBody": {
              "description": "The new ambience configuration",
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "description": {
                        "type": "string"
                      }
                    },
                    "required": ["description"]
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Configuration set successfully"
              },
              "400": {
                "description": "Invalid request"
              }
            }
          }
        }
      },
      "components": {
        "schemas": {}
      }
    }
    ```

    - Testei a chamada da API diretamente do chatGPT enquanto monitorava as mudanças de configuração na casa virtual pelo navegador.

---

Projeto desenvolvido por [OneBitCode](https://onebitcode.com) para fins educacionais.