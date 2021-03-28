import time
import board
import usb_hid
import digitalio
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keycode import Keycode
from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS

led = digitalio.DigitalInOut(board.LED)
led.direction = digitalio.Direction.OUTPUT
led.value = True

keypress_pins = [board.GP17, board.GP10,board.GP21,board.GP11,board.GP20,board.GP12,board.GP19,board.GP13,board.GP18,board.GP14,board.GP16,board.GP15,board.GP9, board.GP22, board.GP6, board.GP27, board.GP7]

key_pin_array = []

keys_pressed = [Keycode.ZERO, Keycode.ONE, Keycode.TWO, Keycode.THREE, Keycode.FOUR, Keycode.FIVE, Keycode.SIX, Keycode.SEVEN, Keycode.EIGHT, Keycode.NINE, Keycode.PERIOD, Keycode.C, Keycode.UP_ARROW, Keycode.DOWN_ARROW, Keycode.I, Keycode.O, Keycode.P]

time.sleep(5)  # Sleep for a bit to avoid a race condition on some systems
keyboard = Keyboard(usb_hid.devices)
keyboard_layout = KeyboardLayoutUS(keyboard)  # We're in the US :)
led.value = False
for pin in keypress_pins:
    key_pin = digitalio.DigitalInOut(pin)
    key_pin.direction = digitalio.Direction.INPUT
    key_pin.pull = digitalio.Pull.UP
    key_pin_array.append(key_pin)
    
print("Waiting for key pin...")

while True:
    # Check each pin
    for key_pin in key_pin_array:
        if not key_pin.value:  # Is it grounded?
            i = key_pin_array.index(key_pin)
            print("Pin #%d is grounded." % i)

            # Turn on the red LED
            led.value = True

            while not key_pin.value:
                pass  # Wait for it to be ungrounded!
            # "Type" the Keycode or string
            key = keys_pressed[i]  # Get the corresponding Keycode or string
            if isinstance(key, str):  # If it's a string...
                keyboard_layout.write(key)  # ...Print the string
            else:  # If it's not a string...
                keyboard.press(key)  # "Press"...
                keyboard.release_all()  # ..."Release"!

            # Turn off the red LED
            led.value = False

    time.sleep(0.01)



#led.value = False
