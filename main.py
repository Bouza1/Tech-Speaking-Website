from flask import Flask, render_template, request, redirect, url_for, session
from flask_bcrypt import Bcrypt
from utils.booking import send_email
from utils.article_viewer import update_votes_in_article, append_new_to_live_articles
from utils.db import get_user, save_user, init_db
from utils.log import create_log_object, write_log_2_json
import json
import os

app = Flask(__name__)
bcrypt = Bcrypt(app)
app.secret_key = os.environ['APP_KEY']
app.config['UPLOAD_FOLDER'] = os.environ['UPLOAD_FOLDER']

@app.route('/')
def home_page():
    return render_template("home.html")

@app.route('/repair')
def repair_page():
    return render_template("booking.html")

@app.route('/api/submit_details', methods=['PUT', 'GET'])
def upload_team():
    if request.is_json:
      req = request.get_json()
      if req['Job'] == "Mailing List":
        send_email(req, True)
        message = {"message":"Thank You For Joining Our Newsletter!"}
      elif req['Job'] == "Repair Booking":
        send_email(req, False)
        message = {"message":"Thank You! A Technician Will Respond In Due Course.", "valid":"success"}
      return message
    else:
      message = {"message":"Error Submitting Details! Please Try Again", "valid":"danger"}
      return message

@app.route('/news')
def news_page():
  return render_template('news.html')

@app.route("/api/get_articles", methods=['POST', 'GET'])
def pull_articles():
  if request.method == "GET":
    site_root = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(site_root, "data", "live_articles.json")
    full_json_object = []
    with open(json_url) as openfile:
        full_json_object = json.load(openfile)
    news_articles = full_json_object['news']
    return news_articles[::-1]

@app.route("/news/article/<int:id>", methods=['GET', 'POST'])
def return_article(id):
  if request.method == "GET":
    article = return_object_using_id(id)
    return render_template("article.html", article=article)
    
def return_object_using_id(id):
  site_root = os.path.realpath(os.path.dirname(__file__))
  json_url = os.path.join(site_root, "data", "live_articles.json")
  article = False
  with open(json_url) as openfile:
    full_json_object = json.load(openfile)
    news_articles = full_json_object['news']
    for i in range(len(news_articles)):
      if news_articles[i]['id'] == id:
        article =  news_articles[i]
  return article

@app.route("/api/vote_on_article", methods=['PUT', 'GET'])
def update_article_votes():
  message = {"message":"Failed"}
  if request.method == 'PUT':
    req = request.get_json()
    site_root = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(site_root, "data", "live_articles.json")
    update_votes_in_article(req, json_url)
    message = {"message":"Success"}
  return message

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
      if request.headers['X-Forwarded-For'] == str(os.environ['ADMIN_IP']):
          username = request.form.get('username')
          password = request.form.get('password')
          user = get_user(username)
          if user and bcrypt.check_password_hash(user[2], password):
              session['logged_in'] = True
              session['username'] = username
              return redirect(url_for('profile'))
          else:
              return render_template('login.html', error='Invalid credentials.')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

@app.route('/admin')
def profile():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template('admin.html', username=session['username'])

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if get_user(username):
            return render_template('register.html', error='Username already taken.')
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        save_user(username, hashed_password)
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/upload', methods=['GET', 'POST'])
def upload():
  if request.method == 'POST':
    if request.headers['X-Forwarded-For'] == str(os.environ['ADMIN_IP']):
      if 'file' not in request.files:
        print(request.files)
        return redirect(url_for('upload'))
      file = request.files['file']
      if file.filename == '':
        return redirect(url_for('upload'))
      if file:
        filename = file.filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        site_root = os.path.realpath(os.path.dirname(__file__))
        append_new_to_live_articles(site_root, filename)
        json_url = os.path.join(site_root, "data", "changes_log.json")
        list_obj = create_log_object("New Articles Added", request.headers['X-Forwarded-For'], session['username'])
        write_log_2_json(list_obj, json_url)
        return {'message':'File uploaded successfully.'}
      return {'message':'File Oploaded Failed.'}
    else:
      return {'message':'It appears you are not connecting from a valid location'}
  return {'message':'It appears you are not connecting from a valid location'}
  
def log_ip(ip_address):
  site_root = os.path.realpath(os.path.dirname(__file__))
  txt_url = os.path.join(site_root, "data", "ip_log.txt")
  with open(txt_url, 'a') as file:
      file.write(ip_address + '\n')


if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=81)
  

