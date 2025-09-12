package br.samuel.challenge.binarytransform;
import java.util.ArrayList;
import java.util.List;

public class Solution {

    /**
     * Finds the bits set to '1' in the binary representation of a number.
     *
     * The function is expected to return a List<Integer> with the following format:
     * - The element at index 0 is the total count of '1's.
     * - The subsequent elements are the 1-based positions of each '1' bit in ascending order.
     *
     * @param n The non-negative integer to analyze.
     * @return A List<Integer> formatted as described.
     */
    public static List<Integer> getOneBits(int n) {
        // Handle negative numbers as per the problem constraints.
        if (n < 0) {
            throw new IllegalArgumentException("N can not be negative");
        }
        
        // The final list we will return.
        List<Integer> resultList = new ArrayList<>();


        // Convert the number to its binary string representation.
        String stringBinary = Integer.toBinaryString(n);

        // A temporary list to store the 1-based positions of each '1'.
        List<Integer> onePositions = new ArrayList<>();
        
        // Iterate through the binary string to find the '1's.
        for (int i = 0; i < stringBinary.length(); i++) {
            if (stringBinary.charAt(i) == '1') {
                // IMPORTANT: Add the 1-based position (index + 1).
                onePositions.add(i + 1);
            }
        }
        
        // Now, assemble the final list in the required format.
        
        // 1. Add the total count of '1's as the first element.
        resultList.add(onePositions.size());
        
        // 2. Add all the collected positions after the count.
        resultList.addAll(onePositions);
        
        return resultList;
    }

    public static void main(String[] args) {
        // Test with a few examples to see the output.
        int number1 = 42; // Binary: 101010 -> Three '1's at positions 1, 3, 5
        int number2 = 13; // Binary: 1101   -> Three '1's at positions 1, 2, 4
        int number3 = 16; // Binary: 10000  -> One '1' at position 1
        int number4 = 0;  // Binary: 0      -> Zero '1's

        System.out.println("Result for " + number1 + ": " + getOneBits(number1));
        System.out.println("Result for " + number2 + ": " + getOneBits(number2));
        System.out.println("Result for " + number3 + ": " + getOneBits(number3));
        System.out.println("Result for " + number4 + ": " + getOneBits(number4));
    }
}