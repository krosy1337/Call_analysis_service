from flask import Flask, request
import os
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_uploads import UploadSet, configure_uploads, AUDIO, patch_request_class
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import SubmitField
from audio_utils import change_format
from Recognizer import recognize
from PreProcessing import finalpreprocess
from BERT_model import BertClassifier
import torch
import json


BertClassifier = BertClassifier(model_path='cointegrated/rubert-tiny',tokenizer_path='cointegrated/rubert-tiny')
BertClassifier.model = torch.load('bert.pt')

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SECRET_KEY'] = 'I have a dream'
# нужно будет создать папку с именем 'uploads'
app.config['UPLOADED_AUDIOS_DEST'] = os.path.join(basedir, 'uploads')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///audio.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Workers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    work_id = db.Column(db.Integer, unique=True)
    FullName = db.Column(db.String(50), nullable=True)

    pr = db.relationship('Calls', backref='users', uselist=False)

    def __repr__(self):
        return f"<workers {self.id}>"


class Calls(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    work_id = db.Column(db.Integer, db.ForeignKey('workers.work_id'))
    call_result = db.Column(db.Integer)

    def __repr__(self):
        return f"<calls {self.id}>"

audios = UploadSet('audios', AUDIO)
configure_uploads(app, audios)

patch_request_class(app)

class UploadForm(FlaskForm):
    audio = FileField(validators=[FileAllowed(audios, 'Video only!'),
                      FileRequired('File was empty!')])
    submit = SubmitField('Upload')

@app.route('/get_workers', methods=['GET', 'POST'])
def table():
    info_for_table = []
    for worker in Workers.query.all():
        workers_calls = Calls.query.filter_by(work_id = worker.work_id).all()
        succ_calls = Calls.query.filter_by(work_id = worker.work_id).filter_by(call_result = 1).all()
        performance = round((len(succ_calls)/len(workers_calls)), 2)
        info_for_table.append({'ID':worker.work_id,'Fullname':worker.FullName,'Calls':len(workers_calls),'Performance':performance})
    return json.dumps(info_for_table)

@app.route('/upload/<worker_id>', methods=['GET', 'POST'])
def upload_file(worker_id):
    audio_data = request.files["file"]
    print("validate validate")
    print(audio_data)
    filename = audios.save(audio_data)
    new_file_dir = basedir + '/uploads/'
    if (filename[-3:] == 'wav'):
        call_text = recognize(new_file_dir+filename)
    else:
        new_wav_file_direction = change_format(new_file_dir,filename)
        call_text = recognize(new_wav_file_direction)
    clean_text = finalpreprocess(call_text)
    result_of_call = BertClassifier.predict(clean_text)

    new_call = Calls(work_id = worker_id, call_result = int(result_of_call))
    db.session.add(new_call)
    db.session.flush()
    db.session.commit()
    return json.dumps({"success": True}), 200, {"ContentType": "application/json"}


if __name__ == '__main__':
    app.run()