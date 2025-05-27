@FunctionalInterface
interface Greeting {
    void sayHello();
}
public class FunctionalInterfaceExample {
    public static void main(String[] args) {
        Greeting g = () -> System.out.println("Hello!");
        g.sayHello();
    }
}
