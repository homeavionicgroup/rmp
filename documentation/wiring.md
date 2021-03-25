# Architecture & Wiring

The basic idea and setup is straight forward. The Raspberry Pi is the core of the system. It runs the client web aapplication in a chromium instance. The pico is connected through USB and acts as basic keyboard to provide additonal GPIO. Main reason for that is that the RMP requires more buttons than the RPI kann provide. As i did not had time to build a Button Matrix, I simply chose the Pico as GPIO extension, as it is cheap and available.

The display is connected through DPI, which allows the RPI to be mounted on the back of the display.

The rest of the buttons and other parts are connected to the RPI and Pico as described on the following table. 

Each Button has a keyboard key assigned to. On the RPI the key assignment is done by a dtoverlay configuration, which can be found in the repository. On the pico the keyboard is configured through a circuitpython script. 

![Wiring Table](/images/rmp_pin_wiring.png)
