import requests
from bs4 import BeautifulSoup
import re
import jieba
import wordcloud
from collections import Counter
import imageio
from openpyxl import Workbook,load_workbook
from PIL import Image
import numpy as np
from pyinstrument import Profiler
t=Profiler()
t.start()
#定义请求头
headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
              "Referer":"https: // www.bilibili.com /",
                "Origin":"https://search.bilibili.com"
}
#定义页数page和o来翻页
page=0
o=0
#存放视频bv号
list_ = []
#翻页提取视频bv号
while page<10:
    url = 'https://search.bilibili.com/all?vt=94833807&keyword=%E6%97%A5%E6%9C%AC%E6%A0%B8%E6%B1%A1%E6%9F%93%E6%B0%B4%E6%8E%92%E6%B5%B7&from_source=webtop_search&spm_id_from=333.1007&search_source=3&page={0}&o={1}'.format(page,o)
    response=requests.get(url=url,headers=headers)
    text1=response.text
    html=re.findall(r'(BV.{10})',text1)
    list_.extend(html)
    page=page+1
    o=o+36
#排除重复的bv号
ll = []
for k in list_:
    if ll.count(k)==0:
        ll.append(k)
print('------------------------b站弹幕智能数据分析程序------------------------')
print('------------------------获取关键词：日本和污染水排放的弹幕数据------------')
print('------------------------正在获取中  Loading......--------------------')
print("-------------正在生成日本核污染水排海弹幕.txt文件---------------")

#获取前300个视频链接
all_danmu=[]
for j in ll[:300]:
    link = "https://www.bilibili.com/video/{}/".format(j)
    response = requests.get(url=link, headers=headers)
    response.encoding = 'utf-8'
    html1 = response.text
#获取cid以此获得弹幕地址
    cid = re.search(r'"cid":(\d*),', html1).group(1)
    link = "https://comment.bilibili.com/{}.xml".format(cid)
    res = requests.get(link)
    res.encoding = 'utf-8'
    soup2 = BeautifulSoup(res.text, 'xml')
    all_barrage = soup2.findAll("d")
    #print(all_danmu)
#将弹幕存入文件中
    for danmu in all_danmu:
        with open('日本核污染水排海弹幕.txt', 'a', newline='', encoding='utf-8-sig') as file:
            file.write(danmu.string)
            file.write("\n")
t.stop()
t.print()









