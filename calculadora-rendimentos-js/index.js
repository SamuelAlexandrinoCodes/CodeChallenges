// Importa a ferramenta para leitura de entrada síncrona
const readlineSync = require('readline-sync');

/**
 * Função principal que orquestra a execução do programa.
 */
function main() {
    try {
        const { precosCompra, dividendosRecebidos } = obterEntradaDoUsuario();
        const rendimento = calcularRendimento(precosCompra, dividendosRecebidos);
        exibirResultado(rendimento, precosCompra, dividendosRecebidos);
    } catch (error) {
        console.error(`\nOcorreu um erro inesperado: ${error.message}`);
    }
}

/**
 * Coleta e valida todas as entradas do usuário.
 */
function obterEntradaDoUsuario() {
    console.log("--- Calculadora de Rendimento de Portfólio ---");
    console.log("Esta ferramenta calcula o rendimento total de seus ativos, incluindo dividendos.\n");

    const precosCompra = lerArrayDeNumeros("Digite os preços de compra dos ativos, separados por vírgula (ex: 100, 200, 150):");
    const dividendosRecebidos = lerArrayDeNumeros("Digite os dividendos recebidos para cada ativo correspondente, separados por vírgula:", precosCompra.length);

    return { precosCompra, dividendosRecebidos };
}

/**
 * Executa o cálculo principal do rendimento.
 * Usa .reduce() para uma abordagem funcional e concisa.
 */
function calcularRendimento(precos, dividendos) {
    const dividendosTotais = dividendos.reduce((acc, val) => acc + val, 0);
    const precoTotalCompra = precos.reduce((acc, val) => acc + val, 0);

    if (precoTotalCompra === 0) {
        return 0.0;
    }

    return (dividendosTotais / precoTotalCompra) * 100;
}

/**
 * Exibe os resultados finais de forma organizada.
 */
function exibirResultado(rendimento, precos, dividendos) {
    console.log("\n--- Relatório de Rendimento ---");
    console.log(`Preço Total de Compra: ${precos.reduce((a, b) => a + b, 0).toFixed(2)}`);
    console.log(`Dividendos Totais Recebidos: ${dividendos.reduce((a, b) => a + b, 0).toFixed(2)}`);
    console.log(`\nRendimento Total do Portfólio: ${rendimento.toFixed(2)}%`);
}

/**
 * Função auxiliar robusta para ler uma lista de números do console.
 */
function lerArrayDeNumeros(prompt, tamanhoEsperado = null) {
    while (true) {
        const input = readlineSync.question(`${prompt}\n> `);
        const valoresStr = input.split(',');

        try {
            const valoresNum = valoresStr.map(val => {
                const num = parseFloat(val.trim());
                if (isNaN(num)) {
                    throw new Error(`'${val.trim()}' não é um número válido.`);
                }
                return num;
            });

            if (tamanhoEsperado !== null && valoresNum.length !== tamanhoEsperado) {
                console.log(`\nErro: Esperados ${tamanhoEsperado} valores, mas ${valoresNum.length} foram fornecidos. Tente novamente.`);
                continue;
            }
            
            if(valoresNum.length === 0 || (valoresNum.length === 1 && isNaN(valoresNum[0]))){
                 console.log(`\nErro: Nenhuma entrada válida fornecida. Tente novamente.`);
                 continue;
            }

            return valoresNum;
        } catch (error) {
            console.log(`\nErro de formato: ${error.message} Certifique-se de usar números e separá-los por vírgula. Tente novamente.`);
        }
    }
}

// Inicia a execução do programa
main();