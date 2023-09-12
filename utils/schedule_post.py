import json

def append_2_temp_file(article, json_url):
  json_scheduled_post = {"Post":article}
  with open(json_url, 'w') as json_file:
    json.dump(json_scheduled_post, json_file, indent=4,  separators=(',',': '))

def update_live_articles(id, json_url):
  with open(json_url) as openfile:
    full_json_object = json.load(openfile)
    current_schedule = full_json_object['news']
    for article in current_schedule:
      if article['id'] == id:
        article['scheduled'] = 1;
        print(article)
  with open(json_url, 'w') as json_file:
    json.dump(full_json_object, json_file, indent=4,  separators=(',',': '))

