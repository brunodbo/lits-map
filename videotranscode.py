#!/usr/bin/env python

import os
import os.path
import sys
import subprocess

OUTPUT_DIR = '/home/bruno/workspace/lits/webm'

def main():
    path = os.getcwd()
    filenames = [
        filename
        for filename
        in os.listdir(path)
        if filename.endswith('.mp4')
        ]

    print path
    for filename in filenames:
        subprocess.call([
            "avconv", "-i",
            os.path.join(path, filename),
            # "-vcodec", "webm",
            os.path.join(OUTPUT_DIR, '%s.webm' % filename[:-4])
            ])
    return 0

if __name__ == '__main__':
    status = main()
    sys.exit(status)