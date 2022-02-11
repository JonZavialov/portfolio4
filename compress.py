import os
import requests

def getDirsList(path):
    dirs = []
    for subdirectories in os.walk(path):
        for subdirectory in subdirectories:
            if isinstance(subdirectory, str):
                dirs.append(subdirectory)
    return dirs
        
def concatFiles(dirsList, path):
    os.system('del .\\' + path[1:] + '\styles.min.css')
    for dir in dirsList:
        localPath = dir[1:].replace('/', '\\')
        os.system(f'type {os.getcwd() + localPath}\*.css >> .\\'+ path + '\styles.min.css')
        os.system('cls')

def minifyCSS(path):
    url = 'https://www.toptal.com/developers/cssminifier/raw'
    data = {'input': open(f'.{path}/styles.min.css', 'rb').read()}
    response = requests.post(url, data=data)
    return response.text

def writeToFile(path, string):
    text_file = open(f".{path}/styles.min.css", "w")
    n = text_file.write(string)
    text_file.close()

def compress(path):
    dirsList = getDirsList(f'.{path}/styles')
    concatFiles(dirsList, path)
    minified = minifyCSS(path)
    writeToFile(path, minified)

compress('/project')