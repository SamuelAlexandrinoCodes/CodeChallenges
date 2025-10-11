const readlineSync = require('readline-sync');

function main() {
    console.clear();
    console.log("--- Simulador de Rendimento de Carteira (Juros Compostos) ---");
    console.log("Projeta o valor total de uma carteira com múltiplos ativos.\n");

    try {
        const { valoresIniciais, taxasRendimento, numeroAnos } = obterEntradaDoUsuario();
        const valorFinalTotal = calcularValorTotal(valoresIniciais, taxasRendimento, numeroAnos);
        exibirResultado(valoresIniciais, valorFinalTotal, numeroAnos);
    } catch (error) {
        console.error(`\nOcorreu um erro inesperado: ${error.message}`);
    }
}

function obterEntradaDoUsuario() {
    const valoresIniciais = lerArrayDeNumeros("Digite os valores iniciais de cada investimento, separados por vírgula (ex: 10000, 500):");
    const taxasRendimento = lerArrayDeNumeros("Digite as taxas de rendimento anuais (em decimal) para cada ativo, separados por vírgula (ex: 0.08, 0.12):", valoresIniciais.length);
    const numeroAnos = lerInteiro("Digite o número de anos do investimento:");

    return { valoresIniciais, taxasRendimento, numeroAnos };
}

/**
 * Executa o cálculo usando uma abordagem funcional com map e reduce.
 */
function calcularValorTotal(valores, taxas, anos) {
    const valorTotalFinal = valores.map((valorInicial, i) => {
        // Aplica a fórmula de juros compostos para cada ativo
        return valorInicial * Math.pow(1 + taxas[i], anos);
    }).reduce((acumulador, valorFinal) => acumulador + valorFinal, 0); // Soma o valor final de todos os ativos

    return valorTotalFinal;
}

function exibirResultado(valoresIniciais, valorFinalTotal, anos) {
    const valorInicialTotal = valoresIniciais.reduce((a, b) => a + b, 0);
    const jurosTotais = valorFinalTotal - valorInicialTotal;

    console.log("\n--- Projeção da Carteira de Investimentos ---");
    console.log(`Investimento Inicial Total: R$ ${valorInicialTotal.toFixed(2)}`);
    console.log(`Período: ${anos} anos`);
    console.log("-------------------------------------------");
    console.log(`Juros Totais Acumulados: R$ ${jurosTotais.toFixed(2)}`);
    console.log(`Valor Total Final da Carteira: R$ ${valorFinalTotal.toFixed(2)}`);
}

// --- Funções Auxiliares de Leitura Segura ---
function lerArrayDeNumeros(prompt, tamanhoEsperado = null) {
    while (true) {
        const input = readlineSync.question(`${prompt}\n> `);
        try {
            const valoresNum = input.split(',').map(val => {
                const num = parseFloat(val.trim());
                if (isNaN(num) || num < 0) throw new Error();
                return num;
            });

            if (tamanhoEsperado !== null && valoresNum.length !== tamanhoEsperado) {
                console.log(`\nErro: Esperados ${tamanhoEsperado} valores, mas ${valoresNum.length} foram fornecidos. Tente novamente.`);
                continue;
            }
            return valoresNum;
        } catch {
            console.log("\nEntrada inválida. Use números positivos separados por vírgula. Tente novamente.");
        }
    }
}

function lerInteiro(prompt) {
    let valor;
    while (true) {
        const input = readlineSync.question(`${prompt}\n> `);
        valor = parseInt(input, 10);
        if (!isNaN(valor) && valor >= 0 && parseFloat(input) === valor) {
            return valor;
        }
        console.log("\nEntrada inválida. Por favor, digite um número inteiro positivo.");
    }
}

main();