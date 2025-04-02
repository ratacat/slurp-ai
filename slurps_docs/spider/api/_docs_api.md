---
url: https://spider.cloud/docs/api
scrapeDate: 2025-04-01T06:41:06.573Z
library: api

exactVersionMatch: false
---

```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/json',
}
json_data = {"limit":5,"return_format":"markdown","url":"https://spider.cloud"}
response = requests.post('https://api.spider.cloud/crawl', 
  headers=headers, json=json_data)
print(response.json())
```
```
```
[
  {
    "content": "<resource>...",
    "error": null,
    "status": 200,
    "costs": {
      "ai_cost": 0,
      "compute_cost": 0.0001,
      "file_cost": 0.0002,
      "bytes_transferred_cost": 0.0002,
      "total_cost": 0.0004,
      "transform_cost": 0.0001
    },
    "url": "https://spider.cloud"
  },
  // more content...
]
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/json',
}
json_data = {"search":"sports news today","search_limit":3,"limit":5,"return_format":"markdown"}
response = requests.post('https://api.spider.cloud/search', 
  headers=headers, json=json_data)
print(response.json())
```
```
```
{
  "content": [
      {
          "description": "Visit ESPN for live scores, highlights and sports news. Stream exclusive games on ESPN+ and play fantasy sports.",
          "title": "ESPN - Serving Sports Fans. Anytime. Anywhere.",
          "url": "https://www.espn.com/"
      },
      {
          "description": "Sports Illustrated, SI.com provides sports news, expert analysis, highlights, stats and scores for the NFL, NBA, MLB, NHL, college football, soccer,&nbsp;...",
          "title": "Sports Illustrated",
          "url": "https://www.si.com/"
      },
      {
          "description": "CBS Sports features live scoring, news, stats, and player info for NFL football, MLB baseball, NBA basketball, NHL hockey, college basketball and football.",
          "title": "CBS Sports - News, Live Scores, Schedules, Fantasy ...",
          "url": "https://www.cbssports.com/"
      },
      {
          "description": "Sport is a form of physical activity or game. Often competitive and organized, sports use, maintain, or improve physical ability and skills.",
          "title": "Sport",
          "url": "https://en.wikipedia.org/wiki/Sport"
      },
      {
          "description": "Watch FOX Sports and view live scores, odds, team news, player news, streams, videos, stats, standings &amp; schedules covering NFL, MLB, NASCAR, WWE, NBA, NHL,&nbsp;...",
          "title": "FOX Sports News, Scores, Schedules, Odds, Shows, Streams ...",
          "url": "https://www.foxsports.com/"
      },
      {
          "description": "Founded in 1974 by tennis legend, Billie Jean King, the Women's Sports Foundation is dedicated to creating leaders by providing girls access to sports.",
          "title": "Women's Sports Foundation: Home",
          "url": "https://www.womenssportsfoundation.org/"
      },
      {
          "description": "List of sports · Running. Marathon · Sprint · Mascot race · Airsoft · Laser tag · Paintball · Bobsleigh · Jack jumping · Luge · Shovel racing · Card stacking&nbsp;...",
          "title": "List of sports",
          "url": "https://en.wikipedia.org/wiki/List_of_sports"
      },
      {
          "description": "Stay up-to-date with the latest sports news and scores from NBC Sports.",
          "title": "NBC Sports - news, scores, stats, rumors, videos, and more",
          "url": "https://www.nbcsports.com/"
      },
      {
          "description": "r/sports: Sports News and Highlights from the NFL, NBA, NHL, MLB, MLS, and leagues around the world.",
          "title": "r/sports",
          "url": "https://www.reddit.com/r/sports/"
      },
      {
          "description": "The A-Z of sports covered by the BBC Sport team. Find all the latest live sports coverage, breaking news, results, scores, fixtures, tables,&nbsp;...",
          "title": "AZ Sport",
          "url": "https://www.bbc.com/sport/all-sports"
      }
  ]
}
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/json',
}
json_data = {"limit":5,"return_format":"markdown","url":"https://spider.cloud"}
response = requests.post('https://api.spider.cloud/links', 
  headers=headers, json=json_data)
print(response.json())
```
```
```
[
  {
    "url": "https://spider.cloud",
    "status": 200,
    "error": null
  },
  // more content...
]
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/json',
}
json_data = {"limit":5,"url":"https://spider.cloud"}
response = requests.post('https://api.spider.cloud/screenshot', 
  headers=headers, json=json_data)
print(response.json())
```
```
```
[
  {
    "content": "<resource>...",
    "error": null,
    "status": 200,
    "costs": {
      "ai_cost": 0,
      "compute_cost": 0.0001,
      "file_cost": 0.0002,
      "bytes_transferred_cost": 0.0002,
      "total_cost": 0.0004,
      "transform_cost": 0.0001
    },
    "url": "https://spider.cloud"
  },
  // more content...
]
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/json',
}
json_data = {"return_format":"markdown","data":[{"html":"<html>\n<head>\n  <title>Example Transform</title>  \n</head>\n<body>\n<div>\n    <h1>Example Website</h1>\n    <p>This is some example markup to use to test the transform function.</p>\n    <p><a href=\"https://spider.cloud/guides\">Guides</a></p>\n</div>\n</body></html>","url":"https://example.com"}]}
response = requests.post('https://api.spider.cloud/transform', 
  headers=headers, json=json_data)
print(response.json())
```
```
```
{
    "content": [
      "Example Domain
Example Domain
==========
This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.
[More information...](https://www.iana.org/domains/example)"
    ],
    "cost": {
        "ai_cost": 0,
        "compute_cost": 0,
        "file_cost": 0,
        "bytes_transferred_cost": 0,
        "total_cost": 0,
        "transform_cost": 0.0001
    },
    "error": null,
    "status": 200
  }
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/json',
}
json_data = {"url":"https://spider.cloud"}
response = requests.post('https://api.spider.cloud/data/query', 
  headers=headers, json=json_data)
print(response.json())
```
```
```
{
  "content": "<html>
    <body>
      <div>
          <h1>Example Website</h1>
      </div>
    </body>
  </html>",
  "error": null,
  "status": 200
}
```
```
### Proxy-Mode

Alpha

Spider also offers a proxy front-end to the service. The Spider proxy will then handle requests just like any standard request, with the option to use high-performance residential proxies up to 1GB per/s.

`**HTTP address**: proxy.spider.cloud:8888``**HTTPS address**: proxy.spider.cloud:8889``**Username**: YOUR-API-KEY``**Password**: PARAMETERS`
```
import requests, os
# Proxy configuration
proxies = {
    'http': f"http://{os.getenv('SPIDER_API_KEY')}:request=Raw&premium_proxy=False@proxy.spider.cloud:8888",
    'https': f"https://{os.getenv('SPIDER_API_KEY')}:request=Raw&premium_proxy=False@proxy.spider.cloud:8889"
}
# Function to make a request through the proxy
def get_via_proxy(url):
    try:
        response = requests.get(url, proxies=proxies)
        response.raise_for_status()
        print('Response HTTP Status Code: ', response.status_code)
        print('Response HTTP Response Body: ', response.content)
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None
# Example usage
if __name__ == "__main__":
     get_via_proxy("https://www.example.com")
     get_via_proxy("https://www.example.com/community")
```
## Pipelines

Create powerful workflows with our pipeline API endpoints. Use AI to extract leads from any website or filter links with prompts with ease.
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
json_data = {"limit":5,"return_format":"markdown","url":"https://spider.cloud"}
response = requests.post('https://api.spider.cloud/pipeline/extract-contacts', 
  headers=headers, json=json_data)
print(response.json())
```
```
```
[
  {
    "content": "<resource>...",
    "error": null,
    "status": 200,
    "costs": {
      "ai_cost": 0,
      "compute_cost": 0.0001,
      "file_cost": 0.0002,
      "bytes_transferred_cost": 0.0002,
      "total_cost": 0.0004,
      "transform_cost": 0.0001
    },
    "url": "https://spider.cloud"
  },
  // more content...
]
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
json_data = {"limit":5,"return_format":"markdown","url":"https://spider.cloud"}
response = requests.post('https://api.spider.cloud/pipeline/label', 
  headers=headers, json=json_data)
print(response.json())
```
```
```
[
  {
    "content": "<resource>...",
    "error": null,
    "status": 200,
    "costs": {
      "ai_cost": 0,
      "compute_cost": 0.0001,
      "file_cost": 0.0002,
      "bytes_transferred_cost": 0.0002,
      "total_cost": 0.0004,
      "transform_cost": 0.0001
    },
    "url": "https://spider.cloud"
  },
  // more content...
]
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
json_data = {"text":"Check this link: https://example.com and email to example@email.com","limit":5,"return_format":"markdown"}
response = requests.post('https://api.spider.cloud/pipeline/crawl-text', 
  headers=headers, json=json_data)
print(response.json())
```
```
```
[
  {
    "content": "<resource>...",
    "error": null,
    "status": 200,
    "costs": {
      "ai_cost": 0,
      "compute_cost": 0.0001,
      "file_cost": 0.0002,
      "bytes_transferred_cost": 0.0002,
      "total_cost": 0.0004,
      "transform_cost": 0.0001
    },
    "url": "https://spider.cloud"
  },
  // more content...
]
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
json_data = {"limit":5,"return_format":"markdown","url":"https://spider.cloud"}
response = requests.post('https://api.spider.cloud/pipeline/filter-links', 
  headers=headers, json=json_data)
print(response.json())
```
```
```
{
    "content": [
        {
            "relevant_urls": [
                "https://spider.cloud",
                "https://foodnetwork.com"
            ]
        }
    ],
    "cost": {
        "ai_cost": 0.0005,
        "compute_cost": 0,
        "file_cost": 0,
        "bytes_transferred_cost": 0,
        "total_cost": 0,
        "transform_cost": 0
    },
    "error": "",
    "status": 200
}
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
json_data = {"limit":5,"return_format":"markdown","url":"https://spider.cloud"}
response = requests.post('https://api.spider.cloud/pipeline/extract-qa', 
  headers=headers, json=json_data)
print(response.json())
```
```
```
{
  "content": [
    {
        "answer": "Spider is a data collecting solution designed for web crawling and scraping.",
        "question": "What is the primary function of Spider?"
    },
    {
        "answer": "You can kickstart your data collecting projects by signing up for a free trial or taking advantage of the promotional credits offered.",
        "question": "How can I get started with Spider?"
    },
    {
        "answer": "Spider offers unmatched speed, scalability, and comprehensive data curation, making it trusted by leading tech businesses.",
        "question": "What are the benefits of using Spider for data collection?"
    },
    {
        "answer": "Spider can easily crawl, search, and extract data from various sources, including social media platforms.",
        "question": "What kind of data can Spider extract?"
    },
    {
        "answer": "Spider is built fully in Rust for next-generation scalability.",
        "question": "What programming language is Spider built with?"
    }
  ],
    "cost": {
        "ai_cost": 0.0009,
        "compute_cost": 0.0001,
        "file_cost": 0,
        "bytes_transferred_cost": 0,
        "total_cost": 0,
        "transform_cost": 0
  },
  "error": null,
  "status": 200,
  "url": "https://spider.cloud"
}
```
```
## Queries

Query the data that you collect during crawling and scraping. Add dynamic filters for extracting exactly what is needed.
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
response = requests.get('https://api.spider.cloud/data/websites?limit=5&return_format=markdown&url=https%253A%252F%252Fspider.cloud', 
  headers=headers)
print(response.json())
```
```
```
{
  "data": [
    {
      "id": "2a503c02-f161-444b-b1fa-03a3914667b6",
      "user_id": "6bd06efa-bb0b-4f1f-a23f-05db0c4b1bfd",
      "url": "6bd06efa-bb0b-4f1f-a29f-05db0c4b1bfd/example.com/11377799497277734985.html",
      "domain": "spider.cloud",
      "created_at": "2024-04-18T15:40:25.667063+00:00",
      "updated_at": "2024-04-18T15:40:25.667063+00:00",
      "pathname": "/",
      "fts": "",
      "scheme": "https:",
      "last_checked_at": "2024-05-10T13:39:32.293017+00:00",
      "screenshot": null
    }
  ],
  "count": 100
}
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
response = requests.get('https://api.spider.cloud/data/pages?limit=5&return_format=markdown&url=https%253A%252F%252Fspider.cloud', 
  headers=headers)
print(response.json())
```
```
```
{
  "data": [
    {
      "id": "733b0d0f-e406-4229-949d-8068ade54752",
      "url": "6bd06efa-bb0b-4f1f-a29f-05db0c4b1bfd/spider.cloud/11377799497277734985.html",
      "url": "https://spider.cloud",
      "domain": "spider.cloud",
      "created_at": "2024-04-17T01:28:15.016975+00:00",
      "updated_at": "2024-04-17T01:28:15.016975+00:00",
      "proxy": true,
      "headless": true,
      "crawl_budget": null,
      "scheme": "https:",
      "last_checked_at": "2024-04-17T01:28:15.016975+00:00",
      "full_resources": false,
      "metadata": true,
      "gpt_config": null,
      "smart_mode": false,
      "fts": "'spider.cloud':1"
    }
  ],
  "count": 100
}
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
response = requests.get('https://api.spider.cloud/data/pages_metadata?limit=5&return_format=markdown&url=https%253A%252F%252Fspider.cloud', 
  headers=headers)
print(response.json())
```
```
```
{
  "data": [
    {
      "id": "e27a1995-2abe-4319-acd1-3dd8258f0f49",
      "user_id": "253524cd-3f94-4ed1-83b3-f7fab134c3ff",
      "url": "253524cd-3f94-4ed1-83b3-f7fab134c3ff/www.google.com/11377799497277734985.html",
      "domain": "www.google.com",
      "resource_type": "html",
      "title": "spider.cloud - Google Search",
      "description": "",
      "file_size": 1253960,
      "embedding": null,
      "pathname": "/search",
      "created_at": "2024-05-18T17:40:16.4808+00:00",
      "updated_at": "2024-05-18T17:40:16.4808+00:00",
      "keywords": [
        "Fastest Web Crawler spider",
        "Web scraping"
      ],
      "labels": "Search Engine",
      "extracted_data": null,
      "fts": "'/search':1"
    }
  ],
  "count": 100
}
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
response = requests.get('https://api.spider.cloud/data/contacts?limit=5&return_format=markdown&url=https%253A%252F%252Fspider.cloud', 
  headers=headers)
print(response.json())
```
```
```
{
  "data": [
    {
      "full_name": "John Doe",
      "email": "johndoe@gmail.com",
      "phone": "555-555-555",
      "title": "Baker"
    }
  ],
  "count": 100
}
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
response = requests.get('https://api.spider.cloud/data/crawl_state?limit=5&return_format=markdown&url=https%253A%252F%252Fspider.cloud', 
  headers=headers)
print(response.json())
```
```
```
{
  "data": {
    "id": "195bf2f2-2821-421d-b89c-f27e57ca71fh",
    "user_id": "6bd06efa-bb0a-4f1f-a29f-05db0c4b1bfg",
    "domain": "spider.cloud",
    "url": "https://spider.cloud",
    "links": 1,
    "credits_used": 3,
    "mode": 2,
    "crawl_duration": 340,
    "message": null,
    "request_user_agent": "Spider",
    "level": "info",
    "status_code": 0,
    "created_at": "2024-04-21T01:21:32.886863+00:00",
    "updated_at": "2024-04-21T01:21:32.886863+00:00"
  },
  "error": null
}
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
response = requests.get('https://api.spider.cloud/data/crawl_logs?limit=5&return_format=markdown&url=https%253A%252F%252Fspider.cloud', 
  headers=headers)
print(response.json())
```
```
```
{
  "data": {
    "id": "195bf2f2-2821-421d-b89c-f27e57ca71fh",
    "user_id": "6bd06efa-bb0a-4f1f-a29f-05db0c4b1bfg",
    "domain": "spider.cloud",
    "url": "https://spider.cloud",
    "links": 1,
    "credits_used": 3,
    "mode": 2,
    "crawl_duration": 340,
    "message": null,
    "request_user_agent": "Spider",
    "level": "info",
    "status_code": 0,
    "created_at": "2024-04-21T01:21:32.886863+00:00",
    "updated_at": "2024-04-21T01:21:32.886863+00:00"
  },
  "error": null
}
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
response = requests.get('https://api.spider.cloud/data/credits?limit=5&return_format=markdown&url=https%253A%252F%252Fspider.cloud', 
  headers=headers)
print(response.json())
```
```
```
{
  "data": {
    "id": "8d662167-5a5f-41aa-9cb8-0cbb7d536891",
    "user_id": "6bd06efa-bb0a-4f1f-a29f-05db0c4b1bfg",
    "credits": 53334,
    "created_at": "2024-04-21T01:21:32.886863+00:00",
    "updated_at": "2024-04-21T01:21:32.886863+00:00"
  }
}
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
response = requests.get('https://api.spider.cloud/data/crons?limit=5&return_format=markdown&url=https%253A%252F%252Fspider.cloud', 
  headers=headers)
print(response.json())
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
response = requests.get('https://api.spider.cloud/crawl?limit=5&return_format=markdown&url=https%253A%252F%252Fspider.cloud', 
  headers=headers)
print(response.json())
```
```
```
{
  "data": {
    "id": "6bd06efa-bb0b-4f1f-a29f-05db0c4b1bfd",
    "email": "user@gmail.com",
    "stripe_id": "cus_OYO2rAhSQaYqHT",
    "is_deleted": null,
    "proxy": null,
    "headless": false,
    "billing_limit": 50,
    "billing_limit_soft": 120,
    "approved_usage": 0,
    "crawl_budget": {
      "*": 200
    },
    "usage": null,
    "has_subscription": false,
    "depth": null,
    "full_resources": false,
    "meta_data": true,
    "billing_allowed": false,
    "initial_promo": false
  }
}
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
response = requests.get('https://api.spider.cloud/data/user_agents?limit=5&return_format=markdown&url=https%253A%252F%252Fspider.cloud', 
  headers=headers)
print(response.json())
```
```
```
{
  "data": {
    "agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    "platform": "Chrome",
    "platform_version": "123.0.0.0",
    "device": "Macintosh",
    "os": "Mac OS",
    "os_version": "10.15.7",
    "cpu_architecture": "",
    "mobile": false,
    "device_type": "desktop"
  }
}
```
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
response = requests.get('https://api.spider.cloud/data/download?url=https%253A%252F%252Fspider.cloud', 
  headers=headers)
print(response.json())
```
## Manage

Configure data to enhance crawl efficiency: create, update, and delete records.
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
json_data = {"limit":5,"return_format":"markdown","url":"https://spider.cloud"}
response = requests.post('https://api.spider.cloud/crawl', 
  headers=headers, json=json_data)
print(response.json())
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
json_data = {"limit":5,"return_format":"markdown","url":"https://spider.cloud"}
response = requests.post('https://api.spider.cloud/data/websites', 
  headers=headers, json=json_data)
print(response.json())
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
json_data = {"limit":5,"return_format":"markdown","url":"https://spider.cloud"}
response = requests.post('https://api.spider.cloud/data/pages', 
  headers=headers, json=json_data)
print(response.json())
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
json_data = {"limit":5,"return_format":"markdown","url":"https://spider.cloud"}
response = requests.post('https://api.spider.cloud/data/pages_metadata', 
  headers=headers, json=json_data)
print(response.json())
```
```
import requests, os
headers = {
    'Authorization': f'Bearer {os.getenv("SPIDER_API_KEY")}',
    'Content-Type': 'application/jsonl',
}
json_data = {"limit":5,"return_format":"markdown","url":"https://spider.cloud"}
response = requests.post('https://api.spider.cloud/data/contacts', 
  headers=headers, json=json_data)
print(response.json())
```