const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Certifique-se de definir a variável de ambiente OPENAI_API_KEY
});

async function getConfiguration(description) {
    const prompt = `Eu tenho 3 luzes na minha sala, elas são RGB e têm intensidade de 0 a 99, além de um ar-condicionado com controle de temperatura de 16°C a 30°C e função de ligar/desligar.

Qual deve ser a configuração deles para o que foi descrito aqui: ${description}

Você deve me responder no seguinte formato sempre (sem mais nada acrescentado a essa resposta):

[
  {"luz principal": {"intensidade": x, "código rgb": y}},
  {"luz esquerda": {"intensidade": x, "código rgb": y}},
  {"luz direita": {"intensidade": x, "código rgb": y}},
  {"ar condicionado": {"estado": "ligado/desligado", "temperatura": z}}
]`;

    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-4o-mini",
        });

        return chatCompletion.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error:', error);
        throw new Error(`API request failed: ${error.message}`);
    }
}

module.exports = { getConfiguration };
