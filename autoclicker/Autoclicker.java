package autoclicker;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import java.awt.AWTException;
import java.awt.BorderLayout;
import java.awt.GridLayout;
import java.awt.Robot;
import java.awt.event.*;
import java.util.concurrent.TimeUnit;
import java.awt.MouseInfo;
import java.awt.Point;

public class Autoclicker implements ActionListener {

    int cps = 20;

    public Autoclicker() {
        // Initialize GUI Frameworks
        JFrame frame = new JFrame();
        JPanel panel = new JPanel();

        // GUI Components
        JButton startClick = new JButton("Start Clicking");
        JLabel cpsLabel = new JLabel("Clicks Per Second: ");

        // Compnents functions
        startClick.addActionListener(this);

        // Set Border of GUI
        panel.setBorder(BorderFactory.createEmptyBorder(50, 50, 50, 50));
        panel.setLayout(new GridLayout(0, 1));

        // Add componenets to GUI
        panel.add(cpsLabel);
        panel.add(startClick);

        // Initialize GUI
        frame.add(panel, BorderLayout.CENTER);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setTitle("Oleh Fetsyak - Java autoclicker");
        frame.pack();
        frame.setVisible(true);
    }

    public static void main(String[] args) {
        new Autoclicker();
    }

    public void actionPerformed(ActionEvent e) {
        try {
            Robot bot = new Robot(); // Initialize Robot object inside try-catch block
            int mask = InputEvent.BUTTON1_DOWN_MASK;

            try {
                TimeUnit.SECONDS.sleep(5);
            } catch (InterruptedException timeExc) {
                System.out.println(timeExc);
            }

            for (int i = 0; i < 100; i++) {
                try {
                    Point mouseLocation = MouseInfo.getPointerInfo().getLocation();

                    int x = (int) mouseLocation.getX();
                    int y = (int) mouseLocation.getY();

                    bot.mouseMove(x, y);
                    bot.mousePress(mask);
                    bot.mouseRelease(mask);
                    TimeUnit.SECONDS.sleep(cps);
                } catch (InterruptedException timeExc) {
                    System.out.println(timeExc);
                }
            }

        } catch (AWTException awtEx) {
            System.out.println("An error occured while creating robot framework: " + awtEx);
        }
    }
}
