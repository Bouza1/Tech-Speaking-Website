from cryptography.fernet import Fernet
import json
import os
from datetime import datetime

def get_today_date():
    current_date = datetime.now().date()
    formatted_date = current_date.strftime("%d/%m/%Y")
    return formatted_date

def create_log_object(change, ip, user):
  
  obj = {
    "date":get_today_date(),
    "change":change,
    "location":encrypt_data(ip),
    "user":encrypt_data(user)
  }
  return obj

def encrypt_data(data):
    cipher_suite = Fernet(str.encode(os.environ['EN_KEY']))
    encrypted_data = cipher_suite.encrypt(data)
    string_result = encrypted_data.decode('utf-8')
    return string_result

def write_log_2_json(log_obj, json_url):
  with open(json_url) as openfile:
    full_json_object = json.load(openfile)
    changes = full_json_object['changes']
    changes.append(log_obj)
  with open(json_url, 'w') as json_file:
    json.dump(full_json_object, json_file, indent=4,  separators=(',',': '))
    
