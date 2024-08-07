document.addEventListener('DOMContentLoaded', () => {
    const lamp1 = document.getElementById('lamp1');
    const lamp2 = document.getElementById('lamp2');
    const lamp3 = document.getElementById('lamp3');
    const ac = document.getElementById('ac');

    document.getElementById('submit-scenario').addEventListener('click', async () => {
        const scenarioInput = document.getElementById('scenario-input').value;
        if (scenarioInput.trim() !== '') {
            await submitScenario(scenarioInput);
            document.getElementById('scenario-input').value = ''; // Limpar o campo de input
        }
    });

    async function submitScenario(description) {
        try {
            const response = await fetch('/setHouseSetup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description }),
            });
            const data = await response.json();
            updateHouse(data);
        } catch (error) {
            console.error('Erro ao enviar cenário:', error);
        }
    }

    async function fetchConfig() {
        try {
            const response = await fetch('/config.json');
            if (response.ok) {
                const data = await response.json();
                updateHouse(data);
            } else {
                console.error('Erro ao buscar configurações:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao buscar configurações:', error);
        }
    }

    function updateHouse(config) {
        const lampConfigs = {
            "luz principal": lamp1,
            "luz esquerda": lamp2,
            "luz direita": lamp3
        };

        config.forEach(item => {
            const key = Object.keys(item)[0];
            const settings = item[key];
            if (lampConfigs[key] && settings["código rgb"] && settings["intensidade"] !== undefined) {
                setLampStyle(lampConfigs[key], settings["código rgb"], settings["intensidade"]);
            } else if (key === "ar condicionado") {
                const acState = settings["estado"];
                const acTemp = settings["temperatura"];
                ac.style.backgroundColor = acState === "ligado" ? '#00f' : '#ccc';
                ac.textContent = `${acTemp}°C`;
            }
        });
    }

    function setLampStyle(lamp, color, intensity) {
        const size = 50 + intensity * 4; // Base size + intensity-based increment
        lamp.style.width = `${size}px`;
        lamp.style.height = `${size}px`;
        lamp.style.background = `radial-gradient(circle, ${hexToRgbA(color, intensity / 100)} 0%, rgba(0, 0, 0, 0) 70%)`;
    }

    function hexToRgbA(hex, alpha) {
        let c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c = hex.substring(1).split('');
            if (c.length === 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${alpha})`;
        }
        throw new Error('Bad Hex');
    }

    setInterval(fetchConfig, 3000); // Atualiza a cada 3 segundos
});
