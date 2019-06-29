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
response = requests.get('https://movie.douban.com/subject/1291561/',headers = header)
html = response.text
moviepage = bs4.BeautifulSoup(html, "lxml")
category = str(moviepage.find_all('span',{"property":"v:summary"})).replace('[<span class="" property="v:summary">','').replace('<br/>','').replace('</span>]','').replace(' ','')
print(category)