// Importa a ferramenta para leitura de entrada síncrona
const readlineSync = require('readline-sync');

/**
 * Função principal que orquestra a execução do programa em um loop contínuo.
 */
function main() {
    while (true) {
        try {
            console.clear();
            const { valorInicial, taxaJuros, numeroAnos } = obterEntradaDoUsuario();
            const valorFinal = calcularValorFinal(valorInicial, taxaJuros, numeroAnos);
            exibirResultado(valorInicial, taxaJuros, numeroAnos, valorFinal);
        } catch (error) {
            console.error(`\nOcorreu um erro inesperado: ${error.message}`);
        }

        const resposta = readlineSync.question("\nDeseja realizar um novo calculo? (s/n): ");
        if (resposta.trim().toLowerCase() !== 's') {
            break;
        }
    }
    console.log("\nOperacao concluida. Calculadora encerrada.");
}

/**
 * Coleta e valida todas as entradas do usuário.
 */
function obterEntradaDoUsuario() {
    console.log("--- Calculadora de Juros Compostos ---");
    console.log("Esta ferramenta projeta o valor final de um investimento com juros compostos anuais.\n");

    const valorInicial = lerDecimal("1. Digite o valor inicial do investimento (ex: 1000.00):");
    const taxaJuros = lerDecimal("2. Digite a taxa de juros anual em porcentagem (ex: 5.0):");
    const numeroAnos = lerInteiro("3. Digite o numero de anos do investimento:");

    return { valorInicial, taxaJuros, numeroAnos };
}

/**
 * Executa o cálculo principal dos juros compostos.
 */
function calcularValorFinal(principal, taxa, anos) {
    const taxaDecimal = taxa / 100;
    return principal * Math.pow(1 + taxaDecimal, anos);
}

/**
 * Exibe os resultados finais de forma organizada.
 */
function exibirResultado(principal, taxa, anos, valorFinal) {
    const jurosTotais = valorFinal - principal;
    console.log("\n--- Projecao do Investimento ---");
    console.log(`Valor Inicial: R$ ${principal.toFixed(2)}`);
    console.log(`Taxa de Juros Anual: ${taxa.toFixed(2)}%`);
    console.log(`Periodo: ${anos} anos`);
    console.log("---------------------------------");
    console.log(`Juros Totais Acumulados: R$ ${jurosTotais.toFixed(2)}`);
    console.log(`Valor Final do Investimento: R$ ${valorFinal.toFixed(2)}`);
}

// --- Funções Auxiliares de Leitura Segura ---

/**
 * Lê um número decimal do console de forma segura.
 */
function lerDecimal(prompt) {
    let valor;
    while (true) {
        const input = readlineSync.question(`${prompt}\n> `);
        valor = parseFloat(input);
        if (!isNaN(valor) && valor >= 0) {
            return valor;
        }
        console.log("Entrada invalida. Por favor, digite um numero positivo valido.");
    }
}

/**
 * Lê um número inteiro do console de forma segura.
 */
function lerInteiro(prompt) {
    let valor;
    while (true) {
        const input = readlineSync.question(`${prompt}\n> `);
        valor = parseInt(input, 10);
        // Verifica se é um número inteiro e não negativo.
        if (!isNaN(valor) && valor >= 0 && parseFloat(input) === valor) {
            return valor;
        }
        console.log("Entrada invalida. Por favor, digite um numero inteiro positivo.");
    }
}

// Inicia a execução do programa
main();
