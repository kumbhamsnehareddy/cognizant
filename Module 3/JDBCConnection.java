import java.sql.Connection;
import java.sql.DriverManager;

public class JDBCConnection {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://localhost:3306/test";
        String user = "root";
        String pass = "password";
        Connection conn = DriverManager.getConnection(url, user, pass);
        if (conn != null)
            System.out.println("Connected");
        conn.close();
    }
}
