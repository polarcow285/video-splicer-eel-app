import eel, os, random
import hachoir
import cv2
import io, base64
from hachoir.parser import createParser
from hachoir.metadata import extractMetadata
from tkinter import filedialog
from tkinter import *
from PIL import Image


eel.init('web')
clips = []
class Clip:
    def __init__(self, path, date, thumbnail):
        self.path = path
        self.date = date
        self.thumbnail = thumbnail
    def __lt__(self, other):
        return self.date < other 
    def __gt__(self, other):
        return self.date > other
    def __eq__(self, other):
        return self.date == other
@eel.expose
def get_path():
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost',1)
    
    root.filenames = filedialog.askopenfilenames()
    root.update()
    file_list = list(root.filenames)
    for file_path in file_list:
        date = extract_metadata(file_path)
        thumbnail = extract_thumbnail(file_path)
        clips.append(Clip(file_path, date, thumbnail))
        
        
        #TODO handle when metadata cannot be extracted
    #print(root.filename)
    #extract_metadata(root.filename)

def extract_metadata(file_path):
    # Open the file
    parser = createParser(file_path)
    if not parser:
        print("Unable to parse file")
    with parser:
        metadata = extractMetadata(parser)
        if not metadata:
            print("Unable to extract metadata")
            return None
        else:
            print(metadata.get('creation_date'))
            return metadata.get('creation_date')

def extract_thumbnail(file_path):
    cap = cv2.VideoCapture(file_path)
    ret, frame = cap.read()
    if ret:
        img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        buffer = io.BytesIO()
        img.save(buffer, format='JPEG')
        encoded_img = base64.b64encode(buffer.getvalue()).decode('utf-8')
        return f'data:image/jpeg;base64,{encoded_img}'
    return None

@eel.expose
def get_thumbnails():
    clips.sort()
    return [clip.thumbnail for clip in clips]

#maybe send over list of clip objects? for javascript to handle with 
#search up matieral ui but for javascript
#1. try to display thumbnail after uploading it 
#2. display ORDERED thumbnails
#3 do groups logic:
"""
- side bar with groups
    create group button
    groups have a text input for name
    list
-  at least one video must be selected in order to create a group
- different colors
- get added to video class?
- maybe later: be able to play the video, or maybe just get another frame???
"""

#create videos:



eel.start('index.html', size=(400, 400))