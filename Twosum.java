import java.util.HashMap;

public class Twosum {
    public static int[] twoSum(int[] nums, int target) {

        HashMap<Integer, Integer> result = new HashMap<>();
        int n = nums.length;
        // int complement = target - nums[i]

        for (int x = 0; x < n; x++) {

            int complement = target - nums[x];
            if (result.containsKey(complement)) {
                return new int[] { result.get(complement), x };
            }

            result.put(nums[x], x);

        }
        return new int[] { 9 };
    }

    public static void main(String[] args) {
        int nums[] = { 2, 7, 11, 15 };
        int target = 9;

        System.out.println(twoSum(nums, target));
        System.out.println("Hello World");
    }
}
