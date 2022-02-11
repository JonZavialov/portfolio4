import os

def getDirsList(path):
    dirs = []
    for subdirectories in os.walk(path):
        for subdirectory in subdirectories:
            if isinstance(subdirectory, str):
                dirs.append(subdirectory)
    return dirs
        
def concatFiles(dirsList, path):
    os.system(f'del .\{path[1:]}\styles.min.css')
    for dir in dirsList:
        localPath = dir[1:].replace('/', '\\')
        os.system(f'type {os.getcwd() + localPath}\*.css >> .\{path}\styles.min.css')

dirsList = getDirsList('./project/styles')
concatFiles(dirsList, "/project")


# url = 'https://www.toptal.com/developers/cssminifier/raw'
# data = {'input': open('./styles/boot.css', 'rb').read()}
# response = requests.post(url, data=data)


# print(response.text)