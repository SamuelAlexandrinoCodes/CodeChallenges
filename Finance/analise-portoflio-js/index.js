const readlineSync = require('readline-sync');

/**
 * Função principal que orquestra a execução do programa.
 */
function main() {
    console.clear();
    console.log("--- Analisador de Diversificação de Portfólio ---");
    console.log("Esta ferramenta calcula a participação percentual de cada ativo no total.\n");

    try {
        const investimentos = lerArrayDeNumeros("Digite os valores dos seus investimentos, separados por vírgula (ex: 1000, 2000, 3000):");
        const porcentagens = calcularPorcentagens(investimentos);
        exibirResultado(investimentos, porcentagens);
    } catch (error) {
        console.error(`\nOcorreu um erro inesperado: ${error.message}`);
    }
}

/**
 * Executa o cálculo principal das porcentagens.
 */
function calcularPorcentagens(valores) {
    const valorTotal = valores.reduce((acc, val) => acc + val, 0);

    if (valorTotal === 0) {
        // Retorna um array de zeros se o total for zero
        return valores.map(() => 0);
    }

    const porcentagens = valores.map(valor => (valor / valorTotal) * 100);
    return porcentagens;
}

/**
 * Exibe os resultados finais de forma organizada.
 */
function exibirResultado(investimentos, porcentagens) {
    const valorTotal = investimentos.reduce((a, b) => a + b, 0);
    console.log("\n--- Relatório de Diversificação ---");
    console.log("Ativo\t | Valor\t\t | Participação");
    console.log("-------------------------------------------------");
    
    for (let i = 0; i < investimentos.length; i++) {
        console.log(`Invest. ${i + 1}\t | R$ ${investimentos[i].toFixed(2).padEnd(12, ' ')} | ${porcentagens[i].toFixed(2)}%`);
    }

    console.log("-------------------------------------------------");
    console.log(`Total\t | R$ ${valorTotal.toFixed(2).padEnd(12, ' ')} | 100.00%`);
}

/**
 * Função auxiliar robusta para ler uma lista de números do console.
 */
function lerArrayDeNumeros(prompt) {
    while (true) {
        const input = readlineSync.question(`${prompt}\n> `);
        const valoresStr = input.split(',');

        try {
            const valoresNum = valoresStr.map(val => {
                const num = parseFloat(val.trim());
                if (isNaN(num) || num < 0) {
                    throw new Error(`'${val.trim()}' não é um número válido ou é negativo.`);
                }
                return num;
            });

            if (valoresNum.length === 0 || (valoresNum.length === 1 && isNaN(valoresNum[0]))) {
                 console.log(`\nErro: Nenhuma entrada válida fornecida. Tente novamente.`);
                 continue;
            }

            return valoresNum;
        } catch (error) {
            console.log(`\nErro de formato: ${error.message} Certifique-se de usar números positivos e separá-los por vírgula. Tente novamente.`);
        }
    }
}

// Inicia a execução do programa
main();