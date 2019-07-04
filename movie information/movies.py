# -*- coding='utf-8' -*-
import requests
from selenium import webdriver
import time 
from openpyxl import Workbook
import bs4
import re
from lxml import etree


#url:https://movie.douban.com/tag/#/

def getHtml(url):
	loadmore = 10
	waittime = 10
	browser = webdriver.Chrome('chromedriver')
	browser.get(url)
	time.sleep(waittime)
	for i in range(0,loadmore):
		next_button = browser.find_element_by_class_name("more")
		next_button.click()
		time.sleep(waittime)
	html = browser.page_source
	browser.quit()
	return html

def getHtmlTxT(url):
	html = getHtml(url) 
	soup = bs4.BeautifulSoup(html, "html.parser")
	return soup

def getMovies(url):	
	html = getHtmlTxT(url)
	movie_category = []
	movie_name = []
	movie_rate = []
	movie_location = []
	movie_info_link = []
	movie_cover_link = []
	movie_info = []
	i = 0

	names = html.find_all("span",{"class":"title"})
	print(len(names))
	for name in names:
		movie_name.append(name.get_text())

	rates = html.find_all("span",{"class":"rate"})
	for rate in rates:
		movie_rate.append(str(rate.get_text()))

	info_links = html.find_all("a",{"class":"item"})
	for info_link in info_links:
		try:
			movie_info_link.append(info_link.get('href'))
			header = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'}
			response = requests.get(info_link.get('href'),headers = header)
			html = response.text
			moviepage = bs4.BeautifulSoup(html, "lxml")
			cover = moviepage.find("img",{"title":"点击看更多海报"})
			movie_cover_link.append(cover.get('src'))
			info = str(moviepage.find_all('span',{"property":"v:summary"})).replace('[<span class="" property="v:summary">','').replace('<br/>','').replace('</span>]','').replace(' ','')
			moviepage = str(moviepage)
			movie_location.append(re.search('<span class="pl">制片国家/地区:</span>( .*?)<br/>',moviepage).group(1))
			category = re.search('<span class="pl">类型:</span>( .*?)<br/>',moviepage).group(1).replace('<span property="v:genre">','').replace('</span>','').replace(' ','')
			movie_category.append(category)
			movie_info.append(info)
			i += 1
			print(info_link.get('href')+'爬取成功 第'+ str(i) +"个")
			time.sleep(10)
		except:
			i += 1
			print('第'+str(i)+'爬取失败')
			continue
	print('现在正在合并列表')
	List = list(zip(movie_name,movie_info,movie_location,movie_category,movie_info_link,movie_info_link,movie_rate))  
	print('列表合并完毕')
	return List

MovieList = getMovies('https://movie.douban.com/tag/#/')

wb = Workbook()
ws = wb.worksheets[0]

print('准备建立Excel表格')
for line in MovieList:
	ws.append(line)
wb.save('movie.xlsx')
print('Excel表格建立完成')