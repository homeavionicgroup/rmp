# Architecture & Wiring

# Wiring
The basic idea and setup is straight forward. The Raspberry Pi is the core of the system. It runs the client web aapplication in a chromium instance. The pico is connected through USB and acts as basic keyboard to provide additonal GPIO. Main reason for that is that the RMP requires more buttons than the RPI kann provide. As i did not had time to build a Button Matrix, I simply chose the Pico as GPIO extension, as it is cheap and available.

The display is connected through DPI, which allows the RPI to be mounted on the back of the display.

The rest of the buttons and other parts are connected to the RPI and Pico as described on the following table. 

Each Button has a keyboard key assigned to. On the RPI the key assignment is done by a dtoverlay configuration, which can be found in the repository. On the pico the keyboard is configured through a circuitpython script. 

![Wiring Table](https://github.com/homeavionicgroup/rmp/blob/main/documentation/images/rmp_pin_wiring.png)

# BuildUp

The buildup is quite simple as the wiring. You start with the backplate and place all the buttons on it and put the cables through the prepared holes. Be careful to use the right side of the backplate, otherwise it will not match the frontplate. I strongly recommend to label each cable, so that you can easiy find the right cable when putting everything on the Pico ans RPI. 

The M4 screws are put from the front, so that backplate and case can be put on the screws. The front plate is fixed by a washer and a nut. A second nut acts as spacer to save room between front-plate and back-plate. 

