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

public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		List<Integer> testNumbers = List.of(3, 58, 99, 1000, 42);
		
		List<String> romanResults = Solution.romanizer(testNumbers);
		
		System.out.println("Original Numbers: " + testNumbers);
		System.out.println("Roman Numerals" + romanResults);
		
	}

}
