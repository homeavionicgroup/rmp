# Radio Management Panel for your HomeCockpit
Radio Management Panel for HomeCockpit Use

This Repository shows the requred sources to build a A350ish Radio Management Panel for the use with your Home Flightsimulator. Currently it only works with X-Plane (FF320, ToLiss321, FF350) but MSFS compatibility is generally possible. 

For Flight Simulation use only. No warranties, use at your own risk.

You need the following: 
1. 3D Model
2. Electronic
3. Some Code

The requirements are described in more detail in the following chapters

## 3D Model
The components for the 3D Modell are available as STL to be printed by the 3DPrinter of your choice. The Frontplate is hosted externally but the other (fitting) elements are in the corresponding folder in this repository. 

### Front Plate
As Front Plate I found following freely available Model on thingyverse: https://www.thingiverse.com/thing:2892991 and adapted it to fit it better with the buttons and the backplate. 

### Back Plate
To fit the electronics (Buttons, Display etc.)I created a Backplate with holds that stuff and is mouted directly beneath the FrontPlate

### Buttons
You need Buttons in following numbers:
- 21 x Radiopanel-Button-big
- 3 x Radiopanel-Button-round (Big Dot)
- 3 x Radiopanel-Button-small (BAR)
- 2 x Radiopanel-Button-small (up)
- 1 each of (Radiopanel-Button-round (0-9),Radiopanel-Button-round (CLR), Radiopanel-Button-round (Dot), Radiopanel-Button-small (MSGCLR), Radiopanel-Button-small (RST)9

### Screenshots
![ScreenShot Complete](https://github.com/homeavionicgroup/rmp/blob/main/documentation/images/Radiopanel%20-%20%20Complete.png)

## Electronics

### Elements
You need following eletronics:
- 1 x Raspberry Pi 3 A+ 
- 1 x Waveshare 4.3 inch Touch Display with DSI Interface
- 1 x Raspberry Pico
- 43 x Omron B3F-4030
- 2 x KY-040 Rotary Encoders
- Lots of kables & Soldering equipment

## Other
To hold everything together I use M4 screws with minimum of 30mm length incl. lots of washers and nuts. As to keep the elecontrics (especially the buttons and rotaries) in place, I use double-sided adhesive pads. For a less chaos I additionally use cable labeles, which makes the wiring a lot easier. 



# LICENSE
This project and all it's elements are shared under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License:
https://creativecommons.org/licenses/by-nc-sa/4.0/


# DISCLAIMER
For Flight Simulation use only. No warranties, use at your own risk.
