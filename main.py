import eel, os, random
import hachoir
from hachoir.parser import createParser
from hachoir.metadata import extractMetadata
from tkinter import filedialog
from tkinter import *

eel.init('web')
@eel.expose
def get_path():
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost',1)
    
    root.filename = filedialog.askopenfilename()
    root.update()
    print("heyyyy")
    print(root.filename)
    extract_metadata(root.filename)

def extract_metadata(file_path):
    # Open the file
    parser = createParser(file_path)
    if not parser:
        print("Unable to parse file")
    with parser:
        metadata = extractMetadata(parser)
        if not metadata:
            print("Unable to extract metadata")
        else:
            print(metadata.get('creation_date'))
        
@eel.expose
def pick_file(folder):
    if os.path.isdir(folder):
        return random.choice(os.listdir(folder))
    else:
        return 'Not valid folder'


eel.start('index.html', size=(400, 400))