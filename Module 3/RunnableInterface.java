class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Runnable running");
    }
    public static void main(String[] args) {
        Thread t = new Thread(new MyRunnable());
        t.start();
    }
}
