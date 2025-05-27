public class PatternMatching {
    public static void test(Object obj) {
        if (obj instanceof String s) {
            System.out.println(s.toLowerCase());
        }
    }
    public static void main(String[] args) {
        test("HELLO");
    }
}
