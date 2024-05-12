import numpy as np
from PIL import Image
import image_processing
import os
from flask import Flask, jsonify, render_template, request, make_response, url_for
from datetime import datetime
from functools import wraps, update_wrapper
from shutil import copyfile
import cv2
from flask_cors import CORS
import shutil
import image_filtering
import pattern_recognition
import morphological_operations

app = Flask(__name__)
CORS(app)

APP_ROOT = os.path.dirname(os.path.abspath(__file__))


def nocache(view):
    @wraps(view)
    def no_cache(*args, **kwargs):
        response = make_response(view(*args, **kwargs))
        response.headers['Last-Modified'] = datetime.now()
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '-1'
        return response
    return update_wrapper(no_cache, view)


def delete_folder(path):
    if os.path.exists(path):
        shutil.rmtree(path)


@app.route("/index")
@app.route("/")
@nocache
def index():
    return render_template("home.html", file_path="img/image_here.jpg")


@app.route("/about")
@nocache
def about():
    return render_template('about.html')


@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r


@app.route("/upload", methods=["POST"])
@nocache
def upload():
    delete_folder('./static/img')
    target = os.path.join(APP_ROOT, "static/img")
    if not os.path.isdir(target):
        if os.name == 'nt':
            os.makedirs(target)
        else:
            os.mkdir(target)
    for file in request.files.getlist("file"):
        file.save("static/img/img_after.jpg")
    copyfile("static/img/img_after.jpg", "static/img/img_normal.jpg")
    print(file)
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/normal", methods=["POST"])
@nocache
def normal():
    copyfile("static/img/img_normal.jpg", "static/img/img_after.jpg")
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/grayscale", methods=["POST"])
@nocache
def grayscale():
    image_processing.grayscale()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/zoomin", methods=["POST"])
@nocache
def zoomin():
    image_processing.zoomin()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/zoomout", methods=["POST"])
@nocache
def zoomout():
    image_processing.zoomout()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/move_left", methods=["POST"])
@nocache
def move_left():
    image_processing.move_left()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/move_right", methods=["POST"])
@nocache
def move_right():
    image_processing.move_right()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/move_up", methods=["POST"])
@nocache
def move_up():
    image_processing.move_up()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/move_down", methods=["POST"])
@nocache
def move_down():
    image_processing.move_down()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/brightness_addition", methods=["POST"])
@nocache
def brightness_addition():
    image_processing.brightness_addition()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/brightness_substraction", methods=["POST"])
@nocache
def brightness_substraction():
    image_processing.brightness_substraction()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/brightness_multiplication", methods=["POST"])
@nocache
def brightness_multiplication():
    image_processing.brightness_multiplication()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/brightness_division", methods=["POST"])
@nocache
def brightness_division():
    image_processing.brightness_division()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/brightness_multiplication_division", methods=["POST"])
@nocache
def brightness_multiplication_division():
    data = request.get_json()
    brightnessValue = data['value']
    image_processing.brightness_multiplication_division(brightnessValue)
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_brightnessMod.jpg'})


@app.route("/brightness_addition_substraction", methods=["POST"])
@nocache
def brightness_addition_substraction():
    data = request.get_json()
    brightnessValue = data['value']
    image_processing.brightness_addition_substraction(brightnessValue)
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_brightnessMod.jpg'})


@app.route("/confirm_brightness_mod", methods=["POST"])
@nocache
def confirmBrightnessMod():
    copyfile("static/img/img_brightnessMod.jpg", "static/img/img_after.jpg")
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/histogram_equalizer", methods=["POST"])
@nocache
def histogram_equalizer():
    image_processing.histogram_equalizer()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/edge_detection", methods=["POST"])
@nocache
def edge_detection():
    image_processing.edge_detection()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/blur", methods=["POST"])
@nocache
def blur():
    image_processing.blur()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/sharpening", methods=["POST"])
@nocache
def sharpening():
    image_processing.sharpening()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/histogram_rgb", methods=["POST"])
@nocache
def histogram_rgb():
    image_processing.histogram_rgb()
    if image_processing.is_grey_scale("static/img/img_after.jpg"):
        # return render_template("histogram.html", file_paths=["img/grey_histogram.jpg"])
        return jsonify({'message': 'File successfully uploaded', 'filePaths': ['../static/img/grey_histogram.jpg']})
    else:
        # return render_template("histogram.html", file_paths=["img/red_histogram.jpg", "img/green_histogram.jpg", "img/blue_histogram.jpg"])
        return jsonify({'message': 'File successfully uploaded', 'filePaths': ['../static/img/red_histogram.jpg', '../static/img/green_histogram.jpg', '../static/img/blue_histogram.jpg']})


@app.route("/thresholding", methods=["POST"])
@nocache
def thresholding():
    data = request.get_json()
    lower_thres = int(data['lowerThres'])
    upper_thres = int(data['upperThres'])
    image_processing.threshold(lower_thres, upper_thres)
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/crop", methods=["POST"])
@nocache
def crop():
    delete_folder('./static/img/crop')
    target = os.path.join(APP_ROOT, "static/img/crop")
    if not os.path.isdir(target):
        if os.name == 'nt':
            os.makedirs(target)
        else:
            os.mkdir(target)
    data = request.get_json()
    lebar = int(data['lebar'])
    tinggi = int(data['tinggi'])
    image_processing.cropImage(lebar, tinggi)
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/crop_0_0.jpg'})


@app.route("/showRGB", methods=["POST"])
@nocache
def showRGB():
    r, g, b = image_processing.showRGB()
    r_list = r.tolist()
    g_list = g.tolist()
    b_list = b.tolist()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg', 'r': r_list, 'g': g_list, 'b': b_list})


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")


@app.route("/getRGB", methods=["GET"])
def get_rgb_values():
    image_path = "static/img/img_after.jpg"  # Ganti dengan path ke citra Anda
    rgb_values = image_processing.calculate_rgb(image_path)
    return jsonify(rgb_values=rgb_values)


@app.route("/filterIdentity", methods=["POST"])
@nocache
def identity():
    image_filtering.identity()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/filterBlur", methods=["POST"])
@nocache
def filterBlur():
    image_filtering.blur()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/cv-blur", methods=["POST"])
@nocache
def cvBlur():
    data = request.get_json()
    kernelWidth = int(data['input1'])
    kernelHeight = int(data['input2'])
    image_filtering.cvBlur(kernelWidth, kernelHeight)
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/gaussian-blur", methods=["POST"])
@nocache
def gaussianBlur():
    data = request.get_json()
    kernelWidth = int(data['input1'])
    kernelHeight = int(data['input2'])
    image_filtering.gaussianBlur(kernelWidth, kernelHeight)
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/median-blur", methods=["POST"])
@nocache
def medianBlur():
    data = request.get_json()
    kernelSize = int(data['input1'])
    image_filtering.medianBlur(kernelSize)
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/sharpen", methods=["POST"])
@nocache
def sharpen():
    image_filtering.sharpening()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/bilateral", methods=["POST"])
@nocache
def bilateral():
    image_filtering.bilateral()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/zero-padding", methods=["POST"])
@nocache
def zeroPadding():
    image_filtering.zeroPadding()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/custom-filter", methods=["POST"])
@nocache
def customFilter():
    data = request.get_json()
    kernel = data['kernel']
    print(kernel)
    image_filtering.customFilter(kernel)
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})


@app.route("/start-matching-citra", methods=["POST"])
@nocache
def startMatchingCitra():
    delete_folder('./static/img/matching')
    target = os.path.join(APP_ROOT, "static/img/matching")
    if not os.path.isdir(target):
        if os.name == 'nt':
            os.makedirs(target)
        else:
            os.mkdir(target)

    count = 1
    filterWithoutParam = [image_filtering.identity, image_processing.grayscale, image_processing.move_left, image_processing.move_right, image_processing.move_up, image_processing.move_down,
                          image_processing.brightness_addition, image_processing.brightness_substraction, image_processing.histogram_equalizer, image_processing.edge_detection, image_filtering.bilateral]

    for filterFunction in filterWithoutParam:
        copyfile("static/img/img_normal.jpg", "static/img/img_after.jpg")
        filterFunction()
        os.rename("static/img/img_after.jpg",
                  f"static/img/matching/img_matching_{count}.jpg")
        count += 1

    lowerThres = [1, 100]
    higherThres = [50, 150]
    for i in range(2):
        copyfile("static/img/img_normal.jpg", "static/img/img_after.jpg")
        image_processing.threshold(lowerThres[i], higherThres[i])
        os.rename("static/img/img_after.jpg",
                  f"static/img/matching/img_matching_{count}.jpg")
        count += 1

    copyfile("static/img/img_normal.jpg", "static/img/img_after.jpg")
    image_filtering.medianBlur(99)
    os.rename("static/img/img_after.jpg",
              f"static/img/matching/img_matching_{count}.jpg")

    copyfile("static/img/img_normal.jpg", "static/img/img_after.jpg")

    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})

@app.route("/detect-number", methods=["POST"])
@nocache
def detectNumber():
    img = cv2.imread("static/img/img_after.jpg")
    hasilDeteksi = pattern_recognition.detectNumber(img, 'knowledge_base_normal.env')
    return jsonify({'message': 'File successfully uploaded', 'hasilDeteksi': hasilDeteksi})

@app.route("/detect-number-thinning", methods=["POST"])
@nocache
def detectNumberThinning():
    img = cv2.imread("static/img/img_after.jpg")
    hasilDeteksi = pattern_recognition.detectNumber(img, 'knowledge_base_thinning.env')
    return jsonify({'message': 'File successfully uploaded', 'hasilDeteksi': hasilDeteksi})

@app.route("/convert-to-binary", methods=["POST"])
@nocache
def convertToBinary():
    morphological_operations.convertToBinary()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})

@app.route("/boundary-extraction", methods=["POST"])
@nocache
def boundaryExtraction():
    morphological_operations.boundaryExtraction()
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})

@app.route("/morphology", methods=["POST"])
@nocache
def morphology():
    data = request.get_json()
    kernel = data['kernel']
    operation = data['operation']
    print(kernel)
    print(operation)
    morphological_operations.morph(kernel, operation)
    return jsonify({'message': 'File successfully uploaded', 'filePath': '../static/img/img_after.jpg'})