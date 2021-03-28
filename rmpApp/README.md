# Client App

This directory contains the main application and configurations, which runs on the Radio Management Panel. The application is a basic html-app, which can be hosted directly on the PI itself or on an external Webbrowser. 

The client app is configured through the config.js file, which can be found in the /rmpApp/common/js/config.js file. There you store the servers IP-Address + Port and your SimBrief Username, if you want to use the Simbrief feature. The application starts with a simple menu (index_radio.html), which allows you to start the radio configurations for specific planes. Currently only the FF320 is supported with others to come.

# rpi config
The buttons (see wiring) of the Raspberry are directly used as keyboard keys through the dtoverlay option on the raspberry. Put the lines in that configurationsfile in config.txt within the boot directory to load it on boot. 

# Pico Config
As dresribed earlier the raspberry pico is used as GPIO extension and acts as a keyboard connected through USB to the raspberry pi. For this to work load the current circuitpython firmware on your pico and put the code from the Radio-pico.py to the code.py on the pico.

# Key Assignments
Following Key assigments do currently work with the pico:

- LSKL1	    a
- LSKL2	    s
- LSKL3	    d
- LSKL4	    f
- LSKR1	    g
- LSKR2	    h
- LSKR3	    j
- LSKR4	    k
- Menu 1	q
- Menu 2	w
- Menu 3	e
- Menu 4	r
- Menu 5	t
- Menu 6	z
- Menu 7	u
- COM1	    i
- COM2	    o
- COM3	    p
- UP  BTN	UP
- Down BTN	DOWN
- 1 BTN	    1
- 2 BTN	    2
- 3 BTN	    3
- 4 BTN	    4
- 5 BTN	    5
- 6 BTN	    6
- 7 BTN	    7
- 8 BTN	    8
- 9 BTN	    9
- 0 BTN	    0
- . BTN	    .
- CLR BTN	c