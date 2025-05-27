import java.io.FileWriter;
import java.util.Scanner;

public class FileWrite {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        FileWriter writer = new FileWriter("output.txt");
        writer.write(input);
        writer.close();
        System.out.println("Data written");
    }
}
