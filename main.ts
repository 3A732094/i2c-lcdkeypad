let wrong = 0
let mypass = ""
let item = ""
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
I2C_LCD1602.ShowString("Be careful!", 0, 0)
I2C_LCD1602.ShowString("My password=", 0, 1)
basic.forever(function () {
    item = keypad.getKeyString()
    if (item == "A" || (item == "B" || (item == "D" || item == "#"))) {
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString("Door closing!", 0, 0)
        basic.pause(5000)
        mypass = ""
        I2C_LCD1602.clear()
    } else if (item == "C") {
        I2C_LCD1602.clear()
        mypass = ""
        I2C_LCD1602.ShowString("Be careful!", 0, 0)
        I2C_LCD1602.ShowString("My password=", 0, 1)
    } else if (mypass == "***") {
        I2C_LCD1602.on()
        I2C_LCD1602.BacklightOn()
        I2C_LCD1602.clear()
        mypass = ""
    } else {
        I2C_LCD1602.ShowString("Be careful!", 0, 0)
        I2C_LCD1602.ShowString("My password=", 0, 1)
        if (item != "") {
            mypass = "" + mypass + item
            basic.showString(item)
            I2C_LCD1602.ShowString(mypass, 12, 1)
            if (mypass.length == 4) {
                if (mypass == password) {
                    pins.analogWritePin(AnalogPin.P13, 0)
                    I2C_LCD1602.clear()
                    I2C_LCD1602.ShowString("Door open", 0, 0)
                    pins.analogWritePin(AnalogPin.P12, 1023)
                } else {
                    wrong = wrong + 1
                    I2C_LCD1602.clear()
                    I2C_LCD1602.ShowString("wrong", 0, 0)
                    pins.analogWritePin(AnalogPin.P13, 1023)
                    basic.pause(2000)
                    I2C_LCD1602.clear()
                    pins.analogWritePin(AnalogPin.P13, 0)
                    mypass = ""
                    pins.analogWritePin(AnalogPin.P5, 1023)
                    music.setVolume(255)
                    music.startMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once)
                    music.playMelody("C - C - C - C - ", 120)
                    basic.pause(500)
                    music.stopAllSounds()
                }
                if (wrong == 1) {
                    I2C_LCD1602.ShowString("You are a thief", 0, 0)
                    basic.pause(5000)
                    I2C_LCD1602.clear()
                    I2C_LCD1602.BacklightOff()
                    I2C_LCD1602.off()
                }
                wrong = 0
            }
        }
    }
})
