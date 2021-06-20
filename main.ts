input.onButtonPressed(Button.A, function () {
    basic.showString(mypass)
    mypass = ""
})
let item = ""
let mypass = ""
let password = "1234"
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.BacklightOn()
keypad.setKeyPad4(
DigitalPin.P0,
DigitalPin.P1,
DigitalPin.P2,
DigitalPin.P6,
DigitalPin.P11,
DigitalPin.P8,
DigitalPin.P9,
DigitalPin.P10
)
pins.setAudioPin(AnalogPin.P5)
I2C_LCD1602.ShowString("Mypass=", 0, 0)
basic.forever(function () {
    item = keypad.getKeyString()
    if (item != "") {
        mypass = "" + mypass + item
        basic.showString(item)
        I2C_LCD1602.ShowString("Mypass=", 0, 0)
        I2C_LCD1602.ShowString(mypass, 7, 0)
        if (mypass.length == 4) {
            if (mypass == password) {
                I2C_LCD1602.clear()
                I2C_LCD1602.ShowString("corrrct", 0, 0)
                pins.analogWritePin(AnalogPin.P12, 1023)
            } else {
                I2C_LCD1602.clear()
                I2C_LCD1602.ShowString("wrong", 0, 0)
                pins.analogWritePin(AnalogPin.P13, 1023)
                basic.pause(2000)
                I2C_LCD1602.clear()
                I2C_LCD1602.BacklightOff()
                basic.pause(500)
                I2C_LCD1602.BacklightOn()
                mypass = ""
                pins.analogWritePin(AnalogPin.P5, 1023)
                music.setVolume(255)
                music.startMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once)
                basic.pause(5000)
                music.stopAllSounds()
            }
        } else {
            I2C_LCD1602.ShowString("length must be 4", 0, 1)
        }
    }
})
