using System;
using System.Globalization;
using System.Linq;

// Define a cultura para garantir que a entrada e saída de decimais use ponto.
CultureInfo.CurrentCulture = CultureInfo.InvariantCulture;

// --- Execução Principal ---
// O método Main agora é o Comandante: ele delega as ordens e não executa o trabalho pesado.
// --- Execução Principal com Loop de Engajamento ---
while (true)
{
    try
    {
        // Limpa a tela para cada nova simulação, mantendo o campo de batalha limpo.
        Console.Clear(); 
        
        var (n, valoresMercado, valorTotalInvestido, alocacoesMinimas, alocacoesMaximas) = ObterEntradaDoUsuario();
        double[] alocacoesFinais = CalcularAlocacoes(n, valoresMercado, valorTotalInvestido, alocacoesMinimas, alocacoesMaximas);
        ExibirResultados(alocacoesFinais);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"\nOcorreu um erro inesperado: {ex.Message}");
    }

    Console.WriteLine("\n-------------------------------------------");
    Console.Write("Deseja realizar um novo cálculo? (s/n): ");
    string resposta = Console.ReadLine()?.Trim().ToLower() ?? "";

    if (resposta != "s")
    {
        break; // Encerra o loop e o programa
    }
}

Console.WriteLine("\nOperação concluída. Otimizador de Alocação encerrado.");

// --- Funções de Lógica e Interação ---

/// <summary>
/// Responsável por toda a interação com o usuário para coletar os dados de entrada.
/// </summary>
(int, double[], double, double[], double[]) ObterEntradaDoUsuario()
{
    Console.WriteLine("--- Otimizador de Alocação de Ativos ---");
    Console.WriteLine("Por favor, forneça os dados conforme solicitado.\n");

    int n = LerInteiro("1. Digite o número de ativos:");

    double[] valoresMercado = LerArrayDeDouble($"2. Digite os {n} valores de mercado, separados por vírgula (ex: 10.00,30.00):", n);
    double valorTotalInvestido = LerDouble("3. Digite o valor total a ser investido:");
    double[] alocacoesMinimas = LerArrayDeDouble($"4. Digite as {n} alocações mínimas, separadas por vírgula:", n);
    double[] alocacoesMaximas = LerArrayDeDouble($"5. Digite as {n} alocações máximas, separadas por vírgula:", n);

    return (n, valoresMercado, valorTotalInvestido, alocacoesMinimas, alocacoesMaximas);
}

/// <summary>
/// Contém a lógica principal de cálculo do desafio.
/// </summary>
double[] CalcularAlocacoes(int n, double[] valoresMercado, double valorTotalInvestido, double[] alocacoesMinimas, double[] alocacoesMaximas)
{
    double totalMercado = valoresMercado.Sum();
    double[] alocacoes = new double[n];

    for (int i = 0; i < n; i++)
    {
        double proporcional = totalMercado > 0 ? (valoresMercado[i] / totalMercado) * valorTotalInvestido : 0;
        alocacoes[i] = Math.Max(alocacoesMinimas[i], Math.Min(alocacoesMaximas[i], proporcional));
    }

    double somaAtual = alocacoes.Sum();
    double delta = valorTotalInvestido - somaAtual;

    while (Math.Abs(delta) > 0.001)
    {
        double mercadoAjustavelTotal = 0;
        for (int i = 0; i < n; i++)
        {
            if ((delta > 0 && alocacoes[i] < alocacoesMaximas[i]) || (delta < 0 && alocacoes[i] > alocacoesMinimas[i]))
            {
                mercadoAjustavelTotal += valoresMercado[i];
            }
        }

        if (mercadoAjustavelTotal == 0) break;

        for (int i = 0; i < n; i++)
        {
            if ((delta > 0 && alocacoes[i] < alocacoesMaximas[i]) || (delta < 0 && alocacoes[i] > alocacoesMinimas[i]))
            {
                double ajuste = (valoresMercado[i] / mercadoAjustavelTotal) * delta;
                alocacoes[i] += ajuste;
                alocacoes[i] = Math.Max(alocacoesMinimas[i], Math.Min(alocacoesMaximas[i], alocacoes[i]));
            }
        }

        somaAtual = alocacoes.Sum();
        delta = valorTotalInvestido - somaAtual;
    }

    return alocacoes;
}

/// <summary>
/// Responsável por exibir os resultados finais de forma organizada.
/// </summary>
void ExibirResultados(double[] alocacoes)
{
    Console.WriteLine("\n--- Alocação Otimizada de Ativos ---");
    for (int i = 0; i < alocacoes.Length; i++)
    {
        Console.WriteLine($"Ativo {i + 1}: {alocacoes[i]:F2}");
    }
    Console.WriteLine($"\nSoma Total Alocada: {alocacoes.Sum():F2}");
}


// --- Funções Auxiliares de Leitura Segura ---

/// <summary>
/// Lê um número inteiro do console de forma segura, repetindo até a entrada ser válida.
/// </summary>
int LerInteiro(string prompt)
{
    int valor;
    Console.WriteLine(prompt);
    while (!int.TryParse(Console.ReadLine(), out valor) || valor <= 0)
    {
        Console.WriteLine("Entrada inválida. Por favor, digite um número inteiro positivo.");
    }
    return valor;
}

/// <summary>
/// Lê um número real do console de forma segura.
/// </summary>
double LerDouble(string prompt)
{
    double valor;
    Console.WriteLine(prompt);
    while (!double.TryParse(Console.ReadLine(), out valor) || valor < 0)
    {
        Console.WriteLine("Entrada inválida. Por favor, digite um número válido.");
    }
    return valor;
}

/// <summary>
/// Lê uma lista de números reais do console de forma segura.
/// </summary>
double[] LerArrayDeDouble(string prompt, int tamanhoEsperado)
{
    double[] valores;
    Console.WriteLine(prompt);
    while (true)
    {
        try
        {
            string[] inputStr = Console.ReadLine().Split(',');
            valores = Array.ConvertAll(inputStr, double.Parse);
            if (valores.Length == tamanhoEsperado)
            {
                return valores;
            }
            Console.WriteLine($"Entrada inválida. Esperados {tamanhoEsperado} valores, mas {valores.Length} foram fornecidos. Tente novamente.");
        }
        catch (FormatException)
        {
            Console.WriteLine("Entrada inválida. Certifique-se de que todos os valores são números e estão separados por vírgula. Tente novamente.");
        }
    }
}