import numpy as np
import pandas as pd
import cv2 as cv
from PIL import Image
import matplotlib.pylab as plt
from shutil import copyfile

def readImage():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    return cv.imread("static/img/img_after.jpg")

def parse_fraction(fraction_str):
    num, denom = fraction_str.split('/')
    return float(num) / float(denom)

def convertToBinary():
    image = readImage()
    gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    ret, thresh = cv.threshold(gray, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU)
    cv.imwrite('static/img/img_after.jpg', thresh)

def boundaryExtraction(kernel):
    image = readImage()
    erosion = cv.morphologyEx(image, cv.MORPH_ERODE, kernel)
    boundary = image - erosion
    cv.imwrite('static/img/img_after.jpg', boundary)

def morph(filterKernel, operation):
    kernel = np.array([[parse_fraction(s) if '/' in s else float(s) for s in row] for row in filterKernel], np.uint8)
    image = readImage()
    # swithc case
    if operation == 'dilate':
        image = cv.morphologyEx(image, cv.MORPH_DILATE, kernel)
    elif operation == 'erode':
        image = cv.morphologyEx(image, cv.MORPH_ERODE, kernel)
    elif operation == 'open':
        image = cv.morphologyEx(image, cv.MORPH_OPEN, kernel)
    elif operation == 'close':
        image = cv.morphologyEx(image, cv.MORPH_CLOSE, kernel)
    cv.imwrite('static/img/img_after.jpg', image)