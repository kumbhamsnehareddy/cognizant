import java.util.Optional;

public class OptionalExample {
    public static void main(String[] args) {
        Optional<String> name = Optional.ofNullable("John");
        name.ifPresent(System.out::println);
    }
}
