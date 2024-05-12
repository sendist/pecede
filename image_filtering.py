import numpy as np
import pandas as pd
import cv2 as cv
from PIL import Image
import matplotlib.pylab as plt
from shutil import copyfile

def readImage():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    return cv.imread("static/img/img_after.jpg")

def zero_padding(image):
    return cv.copyMakeBorder(image, 1, 1, 1, 1, cv.BORDER_CONSTANT, value=0)

def zeroPadding() :
    image = readImage()
    zeroPad = zero_padding(image)
    cv.imwrite('static/img/img_after.jpg', zeroPad)

def identity() :
    image = readImage()
    kernel = np.array([[0, 0, 0],
                    [0, 1, 0],
                    [0, 0, 0]])

    identity = cv.filter2D(src=image, ddepth=-1, kernel=kernel)
    cv.imwrite('static/img/img_after.jpg', identity)

def blur():
    image = readImage()
    kernel = np.ones((3, 3), np.float32) / 9
    blur = cv.filter2D(src=image, ddepth=-1, kernel=kernel)
    cv.imwrite('static/img/img_after.jpg', blur)

def cvBlur(w, h):
    image = readImage()
    cv_blur = cv.blur(src=image, ksize=(w,h))
    cv.imwrite('static/img/img_after.jpg', cv_blur)

def gaussianBlur(w, h):
    image = readImage()
    cv_gaussianblur = cv.GaussianBlur(src=image,ksize=(w,h),sigmaX=0)
    cv.imwrite('static/img/img_after.jpg', cv_gaussianblur)

def medianBlur(size):
    image = readImage()
    cv_median = cv.medianBlur(src=image, ksize=size)
    cv.imwrite('static/img/img_after.jpg', cv_median)

def sharpening():
    image = readImage()
    kernel = np.array([[0, -1, 0],
                   [-1, 5, -1],
                   [0, -1, 0]])

    sharp = cv.filter2D(src=image, ddepth=-1, kernel=kernel)

    cv.imwrite('static/img/img_after.jpg', sharp)

def bilateral():
    image = readImage()
    # bilateral = cv.bilateralFilter(src=image,d=9,sigmaColor=75,sigmaSpace=75)
    bilateral = cv.bilateralFilter(src=image,d=75,sigmaColor=250,sigmaSpace=250)
    cv.imwrite('static/img/img_after.jpg', bilateral)

def parse_fraction(fraction_str):
    num, denom = fraction_str.split('/')
    return float(num) / float(denom)

def customFilter(filterKernel):
    kernel = np.array([[parse_fraction(s) if '/' in s else float(s) for s in row] for row in filterKernel])
    image = readImage()
    # apply the filter to the image
    filteredImage = cv.filter2D(image,-1, kernel)
    cv.imwrite('static/img/img_after.jpg', filteredImage)