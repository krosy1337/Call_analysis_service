import speech_recognition as sr
import os

def recognize(filepath):
    r = sr.Recognizer()
    file = sr.AudioFile(filepath)
    with file as source:
        r.adjust_for_ambient_noise(source)
        audio = r.record(source)
        result = r.recognize_google(audio, language="ru")
    os.remove(filepath)
    return result