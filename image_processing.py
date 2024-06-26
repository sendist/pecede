import matplotlib
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
import math
from collections import Counter
from pylab import savefig
import cv2
from shutil import copyfile


def grayscale():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    img = Image.open("static/img/img_after.jpg").convert("RGB")
    img_arr = np.asarray(img)
    r = img_arr[:, :, 0]
    g = img_arr[:, :, 1]
    b = img_arr[:, :, 2]
    new_arr = r.astype(int) + g.astype(int) + b.astype(int)
    new_arr = (new_arr/3).astype('uint8')
    new_img = Image.fromarray(new_arr)
    new_img.save("static/img/img_after.jpg")


def is_grey_scale(img_path):
    im = Image.open(img_path).convert('RGB')
    w, h = im.size
    for i in range(w):
        for j in range(h):
            r, g, b = im.getpixel((i, j))
            if r != g != b:
                return False
    return True


def zoomin():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    img = Image.open("static/img/img_after.jpg").convert("RGB")
    img = img.convert("RGB")
    img_arr = np.asarray(img)
    new_size = ((img_arr.shape[0] * 2),
                (img_arr.shape[1] * 2), img_arr.shape[2])
    new_arr = np.full(new_size, 255)
    new_arr.setflags(write=1)

    r = img_arr[:, :, 0]
    g = img_arr[:, :, 1]
    b = img_arr[:, :, 2]

    new_r = []
    new_g = []
    new_b = []

    for row in range(len(r)):
        temp_r = []
        temp_g = []
        temp_b = []
        for i in r[row]:
            temp_r.extend([i, i])
        for j in g[row]:
            temp_g.extend([j, j])
        for k in b[row]:
            temp_b.extend([k, k])
        for _ in (0, 1):
            new_r.append(temp_r)
            new_g.append(temp_g)
            new_b.append(temp_b)

    for i in range(len(new_arr)):
        for j in range(len(new_arr[i])):
            new_arr[i, j, 0] = new_r[i][j]
            new_arr[i, j, 1] = new_g[i][j]
            new_arr[i, j, 2] = new_b[i][j]

    new_arr = new_arr.astype('uint8')
    new_img = Image.fromarray(new_arr)
    new_img.save("static/img/img_after.jpg")


def zoomout():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    img = Image.open("static/img/img_after.jpg").convert("RGB")
    img = img.convert("RGB")
    x, y = img.size
    new_arr = Image.new("RGB", (int(x / 2), int(y / 2)))
    r = [0, 0, 0, 0]
    g = [0, 0, 0, 0]
    b = [0, 0, 0, 0]

    for i in range(0, int(x/2)):
        for j in range(0, int(y/2)):
            r[0], g[0], b[0] = img.getpixel((2 * i, 2 * j))
            r[1], g[1], b[1] = img.getpixel((2 * i + 1, 2 * j))
            r[2], g[2], b[2] = img.getpixel((2 * i, 2 * j + 1))
            r[3], g[3], b[3] = img.getpixel((2 * i + 1, 2 * j + 1))
            new_arr.putpixel((int(i), int(j)), (int((r[0] + r[1] + r[2] + r[3]) / 4), int(
                (g[0] + g[1] + g[2] + g[3]) / 4), int((b[0] + b[1] + b[2] + b[3]) / 4)))
    new_arr = np.uint8(new_arr)
    new_img = Image.fromarray(new_arr)
    new_img.save("static/img/img_after.jpg")


def move_left():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    img = Image.open("static/img/img_after.jpg").convert("RGB")
    img_arr = np.asarray(img)
    r, g, b = img_arr[:, :, 0], img_arr[:, :, 1], img_arr[:, :, 2]
    r = np.pad(r, ((0, 0), (0, 50)), 'constant')[:, 50:]
    g = np.pad(g, ((0, 0), (0, 50)), 'constant')[:, 50:]
    b = np.pad(b, ((0, 0), (0, 50)), 'constant')[:, 50:]
    new_arr = np.dstack((r, g, b))
    new_img = Image.fromarray(new_arr)
    new_img.save("static/img/img_after.jpg")


def move_right():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    img = Image.open("static/img/img_after.jpg").convert("RGB")
    img_arr = np.asarray(img)
    r, g, b = img_arr[:, :, 0], img_arr[:, :, 1], img_arr[:, :, 2]
    r = np.pad(r, ((0, 0), (50, 0)), 'constant')[:, :-50]
    g = np.pad(g, ((0, 0), (50, 0)), 'constant')[:, :-50]
    b = np.pad(b, ((0, 0), (50, 0)), 'constant')[:, :-50]
    new_arr = np.dstack((r, g, b))
    new_img = Image.fromarray(new_arr)
    new_img.save("static/img/img_after.jpg")


def move_up():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    img = Image.open("static/img/img_after.jpg").convert("RGB")
    img_arr = np.asarray(img)
    r, g, b = img_arr[:, :, 0], img_arr[:, :, 1], img_arr[:, :, 2]
    r = np.pad(r, ((0, 50), (0, 0)), 'constant')[50:, :]
    g = np.pad(g, ((0, 50), (0, 0)), 'constant')[50:, :]
    b = np.pad(b, ((0, 50), (0, 0)), 'constant')[50:, :]
    new_arr = np.dstack((r, g, b))
    new_img = Image.fromarray(new_arr)
    new_img.save("static/img/img_after.jpg")


def move_down():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    img = Image.open("static/img/img_after.jpg").convert("RGB")
    img_arr = np.asarray(img)
    r, g, b = img_arr[:, :, 0], img_arr[:, :, 1], img_arr[:, :, 2]
    r = np.pad(r, ((50, 0), (0, 0)), 'constant')[0:-50, :]
    g = np.pad(g, ((50, 0), (0, 0)), 'constant')[0:-50, :]
    b = np.pad(b, ((50, 0), (0, 0)), 'constant')[0:-50, :]
    new_arr = np.dstack((r, g, b))
    new_img = Image.fromarray(new_arr)
    new_img.save("static/img/img_after.jpg")


def brightness_addition():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    img = Image.open("static/img/img_after.jpg").convert("RGB")
    img_arr = np.asarray(img).astype(np.uint16)
    img_arr = img_arr+200
    img_arr = np.clip(img_arr, 0, 255)
    new_arr = img_arr.astype('uint8')
    new_img = Image.fromarray(new_arr)
    new_img.save("static/img/img_after.jpg")


def brightness_substraction():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    img = Image.open("static/img/img_after.jpg").convert("RGB")
    img_arr = np.asarray(img).astype(np.int16)
    img_arr = img_arr-200
    img_arr = np.clip(img_arr, 0, 255)
    new_arr = img_arr.astype('uint8')
    new_img = Image.fromarray(new_arr)
    new_img.save("static/img/img_after.jpg")

def brightness_addition_substraction(brightnessValue):
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    copyfile("static/img/img_after.jpg", "static/img/img_brightnessMod.jpg")
    img = Image.open("static/img/img_brightnessMod.jpg").convert("RGB")
    img_arr = np.asarray(img).astype(np.int16)
    img_arr = img_arr+(brightnessValue*10)
    img_arr = np.clip(img_arr, 0, 255)
    new_arr = img_arr.astype('uint8')
    new_img = Image.fromarray(new_arr)
    new_img.save("static/img/img_brightnessMod.jpg")

def brightness_multiplication():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    img = Image.open("static/img/img_after.jpg").convert("RGB")
    img_arr = np.asarray(img)
    img_arr = img_arr*1.25
    img_arr = np.clip(img_arr, 0, 255)
    new_arr = img_arr.astype('uint8')
    new_img = Image.fromarray(new_arr)
    new_img.save("static/img/img_after.jpg")


def brightness_division():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    img = Image.open("static/img/img_after.jpg").convert("RGB")
    img_arr = np.asarray(img)
    img_arr = img_arr/1.25
    img_arr = np.clip(img_arr, 0, 255)
    new_arr = img_arr.astype('uint8')
    new_img = Image.fromarray(new_arr)
    new_img.save("static/img/img_after.jpg")

def brightness_multiplication_division(brightnessValue):
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    copyfile("static/img/img_after.jpg", "static/img/img_brightnessMod.jpg")
    img = Image.open("static/img/img_brightnessMod.jpg").convert("RGB")
    img_arr = np.asarray(img)
    brightnessValue = brightnessValue/2
    if brightnessValue > 0 :
        brightnessValue += 1
        img_arr = img_arr*brightnessValue
    elif brightnessValue < 0 :
        brightnessValue -= 1
        img_arr = img_arr/(-1*brightnessValue)
    img_arr = np.clip(img_arr, 0, 255)
    new_arr = img_arr.astype('uint8')
    new_img = Image.fromarray(new_arr)
    new_img.save("static/img/img_brightnessMod.jpg")


def convolution(img, kernel):
    h_img, w_img, _ = img.shape
    out = np.zeros((h_img-2, w_img-2), dtype=float)
    new_img = np.zeros((h_img-2, w_img-2, 3))
    if np.array_equal((img[:, :, 1], img[:, :, 0]), img[:, :, 2]) == True:
        array = img[:, :, 0]
        for h in range(h_img-2):
            for w in range(w_img-2):
                S = np.multiply(array[h:h+3, w:w+3], kernel)
                out[h, w] = np.sum(S)
        out_ = np.clip(out, 0, 255)
        for channel in range(3):
            new_img[:, :, channel] = out_
    else:
        for channel in range(3):
            array = img[:, :, channel]
            for h in range(h_img-2):
                for w in range(w_img-2):
                    S = np.multiply(array[h:h+3, w:w+3], kernel)
                    out[h, w] = np.sum(S)
            out_ = np.clip(out, 0, 255)
            new_img[:, :, channel] = out_
    new_img = np.uint8(new_img)
    return new_img


def edge_detection():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    img = Image.open("static/img/img_after.jpg").convert("RGB")
    img_arr = np.asarray(img, dtype=int)
    kernel = np.array([[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]])
    new_arr = convolution(img_arr, kernel)
    new_img = Image.fromarray(new_arr)
    new_img.save("static/img/img_after.jpg")


def blur():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    img = Image.open("static/img/img_after.jpg").convert("RGB")
    img_arr = np.asarray(img, dtype=int)
    kernel = np.array(
        [[0.0625, 0.125, 0.0625], [0.125, 0.25, 0.125], [0.0625, 0.125, 0.0625]])
    new_arr = convolution(img_arr, kernel)
    new_img = Image.fromarray(new_arr)
    new_img.save("static/img/img_after.jpg")


def sharpening():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    img = Image.open("static/img/img_after.jpg").convert("RGB")
    img_arr = np.asarray(img, dtype=int)
    kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
    new_arr = convolution(img_arr, kernel)
    new_img = Image.fromarray(new_arr)
    new_img.save("static/img/img_after.jpg")

def histogram_rgb():
    img_path = "static/img/img_after.jpg"
    img = Image.open(img_path)
    img_arr = np.asarray(img)

    if len(img_arr.shape) == 2 or is_grey_scale(img_path):
        # Grayscale image
        data_g = Counter(img_arr.flatten())
        matplotlib.use('Agg')
        plt.bar(list(data_g.keys()), data_g.values(), color='black')
        plt.savefig(f'static/img/grey_histogram.jpg', dpi=300)
        plt.clf()
    elif len(img_arr.shape) == 3 and img_arr.shape[2] == 3:
        r = img_arr[:, :, 0].flatten()
        g = img_arr[:, :, 1].flatten()
        b = img_arr[:, :, 2].flatten()

        data_r = Counter(r)
        data_g = Counter(g)
        data_b = Counter(b)

        data_rgb = [data_r, data_g, data_b]
        warna = ['red', 'green', 'blue']
        data_hist = list(zip(warna, data_rgb))
        matplotlib.use('Agg')
        for data in data_hist:
            plt.bar(list(data[1].keys()), data[1].values(), color=f'{data[0]}')
            plt.savefig(f'static/img/{data[0]}_histogram.jpg', dpi=300)
            plt.clf()
    else:
        raise ValueError("Unsupported image format")

def df(img):  # to make a histogram (count distribution frequency)
    values = [0]*256
    for i in range(img.shape[0]):
        for j in range(img.shape[1]):
            values[img[i, j]] += 1
    return values


def cdf(hist):  # cumulative distribution frequency
    cdf = [0] * len(hist)  # len(hist) is 256
    cdf[0] = hist[0]
    for i in range(1, len(hist)):
        cdf[i] = cdf[i-1]+hist[i]
    # Now we normalize the histogram
    # What your function h was doing before
    cdf = [ele*255/cdf[-1] for ele in cdf]
    return cdf


def histogram_equalizer():
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    img = cv2.imread('static\img\img_after.jpg', 0)
    my_cdf = cdf(df(img))
    # use linear interpolation of cdf to find new pixel values. Scipy alternative exists
    image_equalized = np.interp(img, range(0, 256), my_cdf)
    cv2.imwrite('static/img/img_after.jpg', image_equalized)

def threshold(lower_thres, upper_thres):
    copyfile("static/img/img_after.jpg", "static/img/img_before.jpg")
    img = Image.open("static/img/img_after.jpg").convert("RGB")
    img_arr = np.array(img) 
    condition = np.logical_and(np.greater_equal(img_arr, lower_thres),
                               np.less_equal(img_arr, upper_thres))
    print(lower_thres, upper_thres)
    img_arr[condition] = 255
    new_img = Image.fromarray(img_arr)
    new_img.save("static/img/img_after.jpg")

def cropImage(width, height):
    # Open the image
    img = Image.open("static/img/img_after.jpg").convert("RGB")

    # Get the dimensions of the original image
    img_width, img_height = img.size

    # Calculate the size of each cropped image
    crop_width = img_width // width
    crop_height = img_height // height

    # Crop the image into a grid of width x height images
    for j in range(width):
        for i in range(height):
            # Calculate the coordinates for cropping
            left = j * crop_width
            upper = i * crop_height
            right = left + crop_width
            lower = upper + crop_height

            # Crop the image
            img_cropped = img.crop((left, upper, right, lower))

            # Save each cropped image with a unique name
            img_cropped.save(f"static/img/crop/crop_{i}_{j}.jpg")


def showRGB():
    img = Image.open("static/img/img_after.jpg").convert("RGB")
    img_arr = np.asarray(img)
    r = img_arr[:, :, 0]
    g = img_arr[:, :, 1]
    b = img_arr[:, :, 2]
    return r, g, b


def calculate_rgb(image_path):
    im = Image.open(image_path)
    width, height = im.size
    rgb_values = []

    for y in range(height):
        for x in range(width):
            pixel = im.getpixel((x, y))
            red, green, blue = pixel
            rgb_values.append({"x": x, "y": y, "red": red, "green": green, "blue": blue})

    return rgb_values