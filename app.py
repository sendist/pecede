import numpy as np
from PIL import Image
import image_processing
import os
from flask import Flask, jsonify, render_template, request, make_response, url_for
from datetime import datetime
from functools import wraps, update_wrapper
from shutil import copyfile
from flask_cors import CORS
import shutil

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

def delete_folder(path) :
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
        file.save("static/img/img_now.jpg")
    copyfile("static/img/img_now.jpg", "static/img/img_normal.jpg")
    print(file)
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/normal", methods=["POST"])
@nocache
def normal():
    copyfile("static/img/img_normal.jpg", "static/img/img_now.jpg")
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/grayscale", methods=["POST"])
@nocache
def grayscale():
    print("masuk grayscale")
    image_processing.grayscale()
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/zoomin", methods=["POST"])
@nocache
def zoomin():
    image_processing.zoomin()
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/zoomout", methods=["POST"])
@nocache
def zoomout():
    image_processing.zoomout()
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/move_left", methods=["POST"])
@nocache
def move_left():
    image_processing.move_left()
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/move_right", methods=["POST"])
@nocache
def move_right():
    image_processing.move_right()
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/move_up", methods=["POST"])
@nocache
def move_up():
    image_processing.move_up()
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/move_down", methods=["POST"])
@nocache
def move_down():
    image_processing.move_down()
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/brightness_addition", methods=["POST"])
@nocache
def brightness_addition():
    image_processing.brightness_addition()
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/brightness_substraction", methods=["POST"])
@nocache
def brightness_substraction():
    image_processing.brightness_substraction()
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/brightness_multiplication", methods=["POST"])
@nocache
def brightness_multiplication():
    image_processing.brightness_multiplication()
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/brightness_division", methods=["POST"])
@nocache
def brightness_division():
    image_processing.brightness_division()
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/histogram_equalizer", methods=["POST"])
@nocache
def histogram_equalizer():
    image_processing.histogram_equalizer()
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/edge_detection", methods=["POST"])
@nocache
def edge_detection():
    image_processing.edge_detection()
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/blur", methods=["POST"])
@nocache
def blur():
    image_processing.blur()
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/sharpening", methods=["POST"])
@nocache
def sharpening():
    image_processing.sharpening()
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

@app.route("/histogram_rgb", methods=["POST"])
@nocache
def histogram_rgb():
    image_processing.histogram_rgb()
    if image_processing.is_grey_scale("static/img/img_now.jpg"):
        # return render_template("histogram.html", file_paths=["img/grey_histogram.jpg"])
        return jsonify({'message' : 'File successfully uploaded', 'filePaths' : ['../static/img/grey_histogram.jpg']})
    else:
        # return render_template("histogram.html", file_paths=["img/red_histogram.jpg", "img/green_histogram.jpg", "img/blue_histogram.jpg"])
        return jsonify({'message' : 'File successfully uploaded', 'filePaths' : ['../static/img/red_histogram.jpg', '../static/img/green_histogram.jpg', '../static/img/blue_histogram.jpg']})

@app.route("/thresholding", methods=["POST"])
@nocache
def thresholding():
    data = request.get_json()
    lower_thres = int(data['lowerThres'])
    upper_thres = int(data['upperThres'])
    image_processing.threshold(lower_thres, upper_thres)
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg'})

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
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/crop_0_0.jpg'})

@app.route("/showRGB", methods=["POST"])
@nocache
def showRGB():
    r, g, b = image_processing.showRGB()
    r_list = r.tolist()
    g_list = g.tolist()
    b_list = b.tolist()
    return jsonify({'message' : 'File successfully uploaded', 'filePath' : '../static/img/img_now.jpg', 'r': r_list, 'g': g_list, 'b': b_list})

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")

@app.route("/getRGB", methods=["GET"])
def get_rgb_values():
    image_path = "static/img/img_now.jpg"  # Ganti dengan path ke citra Anda
    rgb_values = image_processing.calculate_rgb(image_path)
    return jsonify(rgb_values=rgb_values)
