using System;
using System.Globalization;
using System.Linq;

// Define a cultura para garantir que a entrada e saída de decimais use ponto.
CultureInfo.CurrentCulture = CultureInfo.InvariantCulture;

// --- Execução Principal ---
try
{
    double[] precos = ObterPrecosDeFechamento();
    double volatilidade = CalcularVolatilidade(precos);
    ExibirResultado(volatilidade);
}
catch (Exception ex)
{
    Console.WriteLine($"\nOcorreu um erro inesperado: {ex.Message}");
}


// --- Funções de Lógica e Interação ---

/// <summary>
/// Coleta os dados de entrada do usuário.
/// </summary>
double[] ObterPrecosDeFechamento()
{
    Console.WriteLine("--- Calculadora de Volatilidade Histórica (Desvio Padrão) ---");
    Console.WriteLine("Esta ferramenta calcula o risco de um ativo com base em seus preços de fechamento diários.\n");

    double[] precos = LerArrayDeDouble("Digite os preços de fechamento do ativo, separados por vírgula (ex: 150.50,152.00,155.00):");
    return precos;
}

/// <summary>
/// Executa o cálculo do desvio padrão (volatilidade).
/// </summary>
double CalcularVolatilidade(double[] precos)
{
    // Passo 1: Calcular a Média dos preços
    double media = precos.Average();

    // Passo 2: Calcular a soma das diferenças quadráticas
    double somaDiferencasQuadraticas = precos.Select(preco => Math.Pow(preco - media, 2)).Sum();

    // Passo 3: Calcular a Variância (média das diferenças quadráticas)
    double variancia = somaDiferencasQuadraticas / precos.Length;

    // Passo 4: Calcular o Desvio Padrão (raiz quadrada da variância)
    double desvioPadrao = Math.Sqrt(variancia);

    return desvioPadrao;
}

/// <summary>
/// Exibe o resultado final de forma organizada.
/// </summary>
void ExibirResultado(double volatilidade)
{
    Console.WriteLine("\n--- Relatório de Risco ---");
    Console.WriteLine($"A volatilidade histórica (desvio padrão) do ativo é: {volatilidade:F2}");
}

/// <summary>
/// Lê uma lista de números reais do console de forma segura.
/// </summary>
double[] LerArrayDeDouble(string prompt)
{
    double[] valores;
    Console.WriteLine(prompt);
    while (true)
    {
        try
        {
            // Lê a linha, remove espaços em branco e divide pela vírgula
            string[] inputStr = Console.ReadLine()?.Trim().Split(',') ?? Array.Empty<string>();
            if (inputStr.Length == 0 || string.IsNullOrWhiteSpace(inputStr[0]))
            {
                Console.WriteLine("Entrada inválida. Você precisa fornecer pelo menos um número. Tente novamente.");
                continue;
            }

            valores = Array.ConvertAll(inputStr, double.Parse);
            return valores;
        }
        catch (FormatException)
        {
            Console.WriteLine("Entrada inválida. Certifique-se de que todos os valores são números e estão separados por vírgula. Tente novamente.");
        }
    }
}