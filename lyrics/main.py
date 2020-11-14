from requests import get
from bs4 import BeautifulSoup
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json

class MyHTTPRequestHandler(BaseHTTPRequestHandler):

    def handle404(self):
        self.send_response(404)
        self.send_header('Content-Type', 'text/plain')
        self.end_headers()
        self.wfile.write(bytes('Not Found', 'utf-8'))

    def handleGetLyrics(self):
        length = self.headers['Content-Length']
        body = self.rfile.read(int(length)).decode('utf-8')
        print('request BODY:', body)
        parsed_body = parse_qs(body)
        print('request parsed body', parsed_body)
        try:
            artist = parsed_body['artist'][0]
            title = parsed_body['title'][0]
            lyrics = self.getLyrics(artist, title)
            self.send_response(201)
            self.send_header('Content-Type','application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(bytes(json.dumps(lyrics), 'utf-8'))
        except:
            print('data was not formatted properly')
            self.handle404()

    def getLyrics(self, artist, title):
        pageurl = "https://makeitpersonal.co/lyrics?artist=" + artist + "&title=" + title
        lyrics = get(pageurl).text.strip()
        if lyrics == "Sorry, We don't have lyrics for this song yet.":
            wiki_url = "https://lyrics.fandom.com/wiki/"
            title = title.replace(" ", "_")
            artist = artist.replace(" ", "_")
            url = wiki_url + f"{artist}:{title}"
            r = get(url)
            soup = BeautifulSoup(r.text, 'html.parser')
            lyric_box = str(soup.find("div", {"class": "lyricbox"}))
            lyrics = lyric_box.replace("<br/>", "\n")
            lyrics = lyrics.replace('<div class="lyricbox">', '')
            lyrics = lyrics.replace('<div class="lyricsbreak">', '')
            lyrics = lyrics.replace('</div>', '')
        return lyrics
    
    def do_POST(self):
        print('the path is', self.path)
        if "/lyrics" in self.path:
            self.handleGetLyrics()
        else:
            self.handle404()

    def do_GET(self):
        self.handle404()
        
def run():
    listen = ('127.0.0.1', 8080)
    server = HTTPServer(listen, MyHTTPRequestHandler)

    print('server is ready!')
    server.serve_forever()

run()