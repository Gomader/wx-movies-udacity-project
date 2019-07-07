# -*- coding='utf-8' -*-
from selenium import webdriver
import time 
from openpyxl import Workbook
from lxml import etree
import requests
import bs4
import urllib
import csv
import re
import pandas as pd


header = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'}
response = requests.get('https://movie.douban.com/subject/6850547/',headers = header)
html = response.text
moviepage = bs4.BeautifulSoup(html, "lxml")
cover = moviepage.find("img",{"title":"点击看更多海报"})
print(cover)