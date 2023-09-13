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
fl=open('日本核污染水排海弹幕.txt',"r", encoding='utf-8-sig')
text=fl.read()
text_string=text.split()
count=Counter(text_string)
sum=count.most_common(20)
print("综合排序前300的视频出现最多次数的弹幕前20是:")
print(sum)
#进行分词
jieba.setLogLevel(jieba.logging.INFO)
short=jieba.lcut(text)
cut_string=' '.join(short)
background=np.array(Image.open("003.png"))
#设置词云图参数
pct=wordcloud.WordCloud(
    width=1200,
    height=1000,
    scale=16,
    background_color='white',
    font_path = "msyh.ttc",
    stopwords={'的','你','我们'},
    mask=background

)

pct.generate(cut_string)
pct.to_file('弹幕词云.png')
