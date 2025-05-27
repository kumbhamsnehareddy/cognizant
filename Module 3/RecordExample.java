public record Person(String name, int age) {}
public class RecordExample {
    public static void main(String[] args) {
        Person p = new Person("Alice", 25);
        System.out.println(p.name() + " is " + p.age());
    }
}
