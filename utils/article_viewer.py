import json
import os 

def update_votes_in_article(vote_object, json_url):
  with open(json_url) as openfile:
    full_json_object = json.load(openfile)
    news_articles = full_json_object['news']
    for article in news_articles:
      if article['id'] == int(vote_object['id']):
        article[vote_object['vote']] += 1
  with open(json_url, 'w') as json_file:
    json.dump(full_json_object, json_file, indent=4,  separators=(',',': '))

def append_new_to_live_articles(site_root, filename):
  leng = return_len_live_articles(site_root)
  new_articles = return_only_new_articles_in_array(site_root, filename, leng)
  append_new_2_live(site_root, new_articles)

def return_len_live_articles(site_root):
  json_url = os.path.join(site_root, "data", "live_articles.json")
  with open(json_url) as openfile:
    full_json_object = json.load(openfile)
    news_articles = full_json_object['news']
  return len(news_articles)

def return_only_new_articles_in_array(site_root, filename, og_leng):
  json_url = os.path.join(site_root, "uploads", filename)
  return_array= []
  with open(json_url) as openfile:
    full_json_object = json.load(openfile)
    news_articles = full_json_object['news']
  for i in range(og_leng, len(news_articles)):
    return_array.append(news_articles[i])
  return return_array

def append_new_2_live(site_root, new_articles):
  json_url = os.path.join(site_root, "data", "live_articles.json")
  with open(json_url) as openfile:
    full_json_object = json.load(openfile)
    og_articles = full_json_object['news']
  for article in new_articles:
    og_articles.append(article)
  with open(json_url, 'w') as json_file:
    json.dump(full_json_object, json_file, indent=4,  separators=(',',': '))
    
  