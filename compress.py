import os

def getDirsList(path):
    dirs = []
    for subdirectories in os.walk(path):
        for subdirectory in subdirectories:
            if isinstance(subdirectory, str):
                dirs.append(subdirectory)
    return dirs
        
def concatFiles(dirsList):
    os.system('del styles.min.css')
    for dir in dirsList:
        localPath = dir[1:].replace('/', '\\')
        os.system(f'type {os.getcwd() + localPath}\*.css >> styles.min.css')
        os.system('cls')

dirsList = getDirsList('./styles')
concatFiles(dirsList)


# url = 'https://www.toptal.com/developers/cssminifier/raw'
# data = {'input': open('./styles/boot.css', 'rb').read()}
# response = requests.post(url, data=data)

# print(response.text)