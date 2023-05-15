import os
from pydub import AudioSegment
AudioSegment.ffmpeg = "c:/users/ilars/anaconda3/lib/site-packages/ffmpeg"

def change_format(dir, filename):
    filepath = os.path.join(dir, filename)
    sound = AudioSegment.from_mp3(filepath)
    sound.export(dir + filename[:-3] + "wav", format="wav", parameters=["-ac", "2", "-ar", "8000"])
    os.remove(filepath)
    return filepath[:-3] + "wav"