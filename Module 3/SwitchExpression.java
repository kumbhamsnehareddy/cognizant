public class SwitchExpression {
    public static void main(String[] args) {
        String day = "MONDAY";
        int num = switch (day) {
            case "MONDAY", "FRIDAY" -> 6;
            case "TUESDAY" -> 7;
            default -> 0;
        };
        System.out.println(num);
    }
}
