interface MyInterface {
    void display(String s);
}
public class LambdaExample {
    public static void main(String[] args) {
        MyInterface obj = (s) -> System.out.println(s);
        obj.display("Hello from lambda");
    }
}
