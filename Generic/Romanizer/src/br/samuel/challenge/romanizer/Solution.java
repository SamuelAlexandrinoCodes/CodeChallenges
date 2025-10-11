package br.samuel.challenge.romanizer;
import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.*;
import java.util.regex.*;
import java.util.stream.*;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

public class Solution {

    public static List<String> romanizer(List<Integer> numbers) {
    List<String> romanNumerals = new ArrayList <>();
   
    int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4,1};
    String[] symbols = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
    
    for (Integer n : numbers) {
        if (n < 1 || n > 1000) {
            romanNumerals.add("Invalid Number");
            continue;
        }
        StringBuilder roman = new StringBuilder();
        int currentNumber = n;
        
  
        for (int i = 0; i < values.length; i++){
            while (currentNumber >= values[i]){
             roman.append(symbols[i]);
             currentNumber -= values[i];
          }
        }     
        romanNumerals.add(roman.toString());
    }

    return romanNumerals;
}
}
