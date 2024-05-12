import cv2
from PIL import Image
import numpy as np
from IPython.display import display

def freeman_chain_code(contour):
    FREEMAN = [(0, 1), (-1, 1), (-1, 0), (-1, -1), (0, -1), (1, -1), (1, 0), (1, 1), (0, 0)]

    chain_code = []
    for i in range(len(contour) - 1):
        # Compute the direction from the current point to the next point
        dy = contour[i + 1][0][0] - contour[i][0][0]
        dx = contour[i + 1][0][1] - contour[i][0][1]

        # Find the corresponding Freeman direction
        direction = FREEMAN.index((dx, dy))

        # Append the direction to the Freeman chain code
        chain_code.append(direction)
    return chain_code

def getContours(imageArray, thinning=False):
    height, width, channels = imageArray.shape
    split = width // 75
    imgSplit = np.array_split(imageArray, split, axis=1)

    contours = []
    for img in imgSplit:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        ret, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
        if thinning:
            print("THINNING")
            # bitwise not the image
            thresh = cv2.bitwise_not(thresh)

            # Create a Structuring Element
            kernel = cv2.getStructuringElement(cv2.MORPH_CROSS, (3, 3))
            # Perform the thinning process
            thresh= cv2.ximgproc.thinning(thresh, thinningType=cv2.ximgproc.THINNING_ZHANGSUEN)

        contour, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)

        contours.append(contour[1]) if not thinning else contours.append(contour[0])
    return contours

def detectNumber(image, knowledgeBase):
    with open(knowledgeBase, 'r') as f:
        data = f.read()
        split = data.split('\n')
        for i in range(len(split)):
            split[i] = split[i].split('=')
    
    if knowledgeBase == 'knowledge_base_thinning.env':
        contours = getContours(image, thinning=True)
    else:
        contours = getContours(image)
    number = ""
    freemanKnowledge = []

    for i in range(len(split) - 1):
        freemanKnowledge.append(np.array(eval(split[i][1])))

    for contour in contours:
        chainCode = freeman_chain_code(contour)
        print(chainCode)
        for i in range(len(freemanKnowledge)):
            if np.array_equal(freemanKnowledge[i], chainCode):
                number += split[i][0]

    return number

def thinningImage(image):
    img = cv2.imread(image)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    # bitwise not the image
    thresh = cv2.bitwise_not(thresh)

    # Create a Structuring Element
    kernel = cv2.getStructuringElement(cv2.MORPH_CROSS, (3, 3))

    # Perform the thinning process
    thinning = cv2.ximgproc.thinning(thresh, thinningType=cv2.ximgproc.THINNING_ZHANGSUEN)
    return thinning

