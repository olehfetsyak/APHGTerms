
//import java.util.Map;

public class RemoveDupe {
    public static int removeDuplicates(int[] nums) {
        int j = 0;

        for (int i = 1; i < nums.length; i++) {
            if (nums[j] != nums[i]) {
                nums[++j] = nums[i];
            }
        }

        return j + 1;
    }

    public static void main(String[] args) {
        int[] nums = { 0, 0, 1, 1, 1, 2, 2, 3, 3, 4 };
        // Output: 2, nums = [1,2,_]
        /*
         * Input: nums = [0,0,1,1,1,2,2,3,3,4]
         * Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
         */
        System.out.println(removeDuplicates(nums));
    }
}
