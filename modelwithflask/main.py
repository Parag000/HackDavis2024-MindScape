from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import pandas as pd
import numpy as np
import os
import time
import sys
from tensorflow import keras
#from keras.models import model_from_json
#from tensorflow.python.keras import optimizers

import os
import random

import librosa

emotions = {0: 'female_angry', 1 : 'female_calm', 2 : 'female_fearful',  3 : 'female_happy', 4 : 'female_sad', 5 : 'male_angry', 6: 'male_calm',  7 : 'male_fearful', 8 : 'male_happy', 9 : 'male_sad'}

#model = tf.keras.models.load_model('model.keras')
def make_predictions(inputfile):
  cnn_model = keras.models.load_model("cnn_model2.h5")
  prediction_data, prediction_sr = librosa.load(
          inputfile,
          res_type="kaiser_fast",
          duration=3,
          sr=22050,
          offset=0.5,
      )
  mfccs = np.mean(librosa.feature.mfcc(y=prediction_data, sr=prediction_sr, n_mfcc=40).T, axis=0)
  x = np.expand_dims(mfccs, axis=1)
  x = np.expand_dims(x, axis=0)
  predictions = cnn_model.predict(x)

  emotions_dict = {
          "0": "neutral",
          "1": "calm",
          "2": "happy",
          "3": "sad",
          "4": "angry",
          "5": "fearful",
          "6": "disgusted",
          "7": "surprised",
  }
  return emotions_dict[str(predictions[0].argmax())]
# json_file = open('model.json', 'r')
# loaded_model_json = json_file.read()
# json_file.close()
# loaded_model = model_from_json(loaded_model_json)
# # load weights into new model
# loaded_model.load_weights("Emotion_Voice_Detection_Model.h5")
# print("Loaded model from disk")
# #opt = optimizers.adam(lr=0.00001)
# # evaluate loaded model on test data
# loaded_model.compile(loss='categorical_crossentropy', metrics=['accuracy'])

# def data_preprocessing(filename):
#   X, sample_rate = librosa.load(filename,duration=2.5,sr=22050*2,offset=0.5)
#   sample_rate = np.array(sample_rate)
#   mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=13),axis=0)
#   featurelive = mfccs
#   livedf2 = featurelive
#   livedf2= pd.DataFrame(data=livedf2)
#   livedf2 = livedf2.stack().to_frame().T
#   twodim= np.expand_dims(livedf2, axis=2)
#   return twodim

# def make_prediction(df):
#   pred = loaded_model.predict(df,
#                          batch_size=32,
#                          verbose=1)
#   preds1=pred.argmax(axis=1)
#   abc = preds1.astype(int).flatten()
#   return emotions[abc[0]]


app = Flask(__name__)



@app.route('/')
def index():
    return jsonify({'message': 'Welcome To Speech to Emotion'})

@app.route('/api/media-file', methods=['POST'])
def predict_emotion():
    audiofile = request.files['audiofile']
    filename = secure_filename(audiofile.filename)
    temp_path = filename
    audiofile.save(temp_path)

    
    #twodim = data_preprocessing(temp_path)
    

    res = jsonify({'result': make_predictions(temp_path)})
    os.remove(temp_path)
    return res

if __name__ == '__main__':
    app.run(debug=True)