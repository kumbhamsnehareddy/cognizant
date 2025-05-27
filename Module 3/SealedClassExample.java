sealed class Shape permits Circle, Square {}
final class Circle extends Shape {}
final class Square extends Shape {}
public class SealedClassExample {
    public static void main(String[] args) {
        Shape s1 = new Circle();
        Shape s2 = new Square();
        System.out.println(s1.getClass());
        System.out.println(s2.getClass());
    }
}
